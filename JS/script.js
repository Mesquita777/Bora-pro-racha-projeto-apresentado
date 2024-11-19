function gellAllReservas(user){
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'http://localhost:8080/php/cadastros/reserva.php?user='+user,
    cache: false,
    success: function(dado) {
      localStorage.setItem("quadra_reservations",JSON.stringify(dado.quadra_reservations))
      localStorage.setItem("myReservationsList",JSON.stringify(dado.myReservationsList))
    }
});  
}

function openAvailabilityModal(quadraName) {
  document.getElementById("quadraName").textContent = quadraName;
  document.getElementById("availabilityModal").style.display = "flex";
}

function closeAvailabilityModal() {
  document.getElementById("availabilityModal").style.display = "none";
  document.getElementById("availableTimes").innerHTML = ''
  document.getElementById("date").value = ''

}

function showAvailableTimes() {
  gellAllReservas(localStorage.getItem("user_id"))
  const date = document.getElementById("date").value;
  const availableTimesContainer = document.getElementById("availableTimes");

  if (!date) {
    availableTimesContainer.innerHTML = "<p>Por favor, selecione uma data.</p>";
    return;
  }

  const startHour = 6;
  const endHour = 22;
  let times = [];

  for (let hour = startHour; hour < endHour; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }

  const reservations = JSON.parse(localStorage.getItem("quadra_reservations")) || [];
  let qName = document.getElementById("quadraName").textContent;
  

  times = times.filter((time) => {
    return !reservations.some(
      reservation =>
        reservation.data_reserva === date &&
        reservation.hora_reserva === time &&
        reservation.quadra === qName
    );
  });

  if (times.length === 0) {
    availableTimesContainer.innerHTML =
      "<p>Não há horários disponíveis para esta data.</p>";
  } else {
    availableTimesContainer.innerHTML = times
      .map(
        (time) => `
            <button onclick="confirmReservation('${localStorage.getItem("user_id")}','${qName}', '${date}', '${time}')">${time}</button>
        `
      )
      .join("");
  }
}

function confirmReservation(user,quadra, date, time) {
    const formData = new FormData()
    formData.append('user', user)
    formData.append('quadra', quadra)
    formData.append('date', date)
    formData.append('time', time)

    url = 'http://localhost:8080/php/cadastros/reserva.php'
    fetch(url,
        {
            method: "POST",
            body: formData
        })
    .then(response => {
        return response.json()
    })
    .then(dado => {
        //console.log(dado)
        if(dado.error){
          alert(
            "Esse horário já está reservado para essa quadra. Por favor, escolha outro horário."
          );
          return;
            
        }else{
          closeAvailabilityModal();
          openConfirmationModal();
          gellAllReservas(user)
          return
        }
    }).catch( err => {
        console.log(err)
    })   


}

function openConfirmationModal() {
  document.getElementById("confirmationModal").style.display = "flex";
}

function closeConfirmationModal() {
  document.getElementById("confirmationModal").style.display = "none";
}

function openMyReservations() {
  const reservations = JSON.parse(localStorage.getItem("myReservationsList")) || [];
  const myReservationsList = document.getElementById("myReservationsList");

  if (reservations.length === 0) {
    myReservationsList.innerHTML = "<p>Você não possui reservas.</p>";
  } else {
    myReservationsList.innerHTML = reservations
      .map(
        (reservation, index) => `
            <p>
                ${reservation.quadra} - ${reservation.data_reserva} às ${reservation.hora_reserva}
                <button onclick="cancelReservation(${reservation.id})">Cancelar</button>
            </p>
        `
      )
      .join("");
  }

  document.getElementById("myReservationsModal").style.display = "flex";
}

function closeMyReservations() {
  document.getElementById("myReservationsModal").style.display = "none";
}

function cancelReservation(index) {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'http://localhost:8080/php/cadastros/reserva.php?remover='+index,
    cache: false,
    success: function(dado) {
      if(dado.error){
        alert(dado.error)
      }else{
        gellAllReservas(localStorage.getItem("user_id"))
        alert(dado.msg)
        closeMyReservations()
      }
    }
  });
  
}
