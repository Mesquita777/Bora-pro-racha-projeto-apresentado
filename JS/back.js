$("#userName").text(localStorage.getItem("user_nome"))

$("#nome").val(localStorage.getItem("user_nome"))
$("#email").val(localStorage.getItem("user_email"))
$("#telefone").val(localStorage.getItem("user_telefone"))

$("#entrar").on( "click", function( event ) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('email', $("#email").val())
    formData.append('senha', $("#senha").val())

    url = 'http://localhost:8080/php/login/login.php'
    fetch(url,
        {
            method: "POST",
            body: formData
        })
    .then(response => {
        return response.json()
    })
    .then(dado => {
        if(dado.error){
            alert(dado.error)
        }else{
            localStorage.setItem("quadra_reservations",JSON.stringify(dado.reservas))
            localStorage.setItem("user_id",dado.user.id)
            localStorage.setItem("user_nome",dado.user.nome)
            localStorage.setItem("user_email",dado.user.email)
            localStorage.setItem("user_telefone",dado.user.telefone)
            localStorage.setItem("myReservationsList",JSON.stringify(dado.minhasreservas))
            window.location = "http://localhost:8080/HTML/nq.html";            
        }

    }).catch( err => {
        console.log(err)
    })    
});

$("#registrar").on( "click", function( event ) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('nome', $("#nome").val())
    formData.append('email', $("#email").val())
    formData.append('senha', $("#senha").val())
    formData.append('telefone', $("#telefone").val())

    url = 'http://localhost:8080/php/cadastros/register.php'
    fetch(url,
        {
            method: "POST",
            body: formData
        })
    .then(response => {
        return response.json()
    })
    .then(dado => {
        if(dado.msg){
            alert(dado.msg)
            window.location = "http://localhost:8080/HTML/nq.html";
        }else{
            alert(dado.error)
        }
    }).catch( err => {
        console.log(err)
    })
});

$("#atualiza").on( "click", function( event ) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('id', localStorage.getItem("user_id"))
    formData.append('nome', $("#nome").val())
    formData.append('email', $("#email").val())
    formData.append('telefone', $("#telefone").val())

    url = 'http://localhost:8080/php/cadastros/update.php'
    fetch(url,
        {
            method: "POST",
            body: formData
        })
    .then(response => {
        return response.json()
    })
    .then(dado => {
        if(dado.msg){
            alert(dado.msg)
        }else{
            alert(dado.error)
        }
    }).catch( err => {
        console.log(err)
    })
});

$("#sair").on( "click", function( event ) {
    event.preventDefault()
    localStorage.clear();
    window.location = "http://localhost:8080/php/logout.php";
});
// $('#sair').click(function() {
//     localStorage.clear();
//     window.location = "http://localhost:8080/php/logout.php";
// })
// async function addReserva(user,quadra,date,time){
//     const formData = new FormData()
//     formData.append('user', user)
//     formData.append('quadra', quadra)
//     formData.append('date', date)
//     formData.append('time', time)

//     url = 'http://localhost:8080/php/cadastros/reserva.php'
//     await fetch(url,
//         {
//             method: "POST",
//             body: formData
//         })
//     .then(response => {
//         return response.json()
//     })
//     .then(dado => {
//         //console.log(dado)
//         if(dado.error){
//             return false
            
//         }else{
//             return true
//         }
//     }).catch( err => {
//         console.log(err)
//     })   
// }

// function gellAllReservas(user){
//     url = 'http://localhost:8080/php/cadastros/reserva.php?user='+user
//     fetch(url,{method: "GET"})
//     .then(response => {
//         return response.json()
//     })
//     .then(dado => {
//         localStorage.setItem("quadra_reservations",JSON.stringify(dado.quadra_reservations))
//         localStorage.setItem("myReservationsList",JSON.stringify(dado.myReservationsList))
//         return
//     }).catch( err => {
//         console.log(err)
//     })   
// }

// function deleteReserva(id,user){
//     url = 'http://localhost:8080/php/cadastros/reserva.php?remover='+id
//     fetch(url,{method: "GET"})
//     .then(response => {
//         return response.json()
//     })
//     .then(dado => {
//         if(dado.error){
//             return false
//         }else{
//             return true 
//         }
//     }).catch( err => {
//         console.log(err)
//     })   
// }

