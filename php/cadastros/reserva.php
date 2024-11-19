<?php
include('../conexao.php');

if($_POST){
  if(isset($_POST['user']) && isset($_POST['quadra']) && isset($_POST['date']) && isset($_POST['time'])) {

    $user = $mysqli->real_escape_string($_POST['user']);
    $quadra = $mysqli->real_escape_string($_POST['quadra']);
    $date = $mysqli->real_escape_string($_POST['date']);
    $time = $mysqli->real_escape_string($_POST['time']);
  
    $myreserv = "SELECT * FROM reservas WHERE quadra = '$quadra' and  data_reserva = '$date' and  hora_reserva = '$time'";
    $sql_query = $mysqli->query($myreserv) or die("Falha na execução do código SQL: " . $mysqli->error);
   // $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);
    $quantidade = $sql_query->num_rows;
    
    if($quantidade == 1) {
      echo json_encode(["error"=>"Horário já reservado"]);
    }else{
      $sql_code = "INSERT INTO reservas (quadra,data_reserva,hora_reserva,usuario) VALUES ('$quadra','$date','$time','$user')";
      $mysqli->query($sql_code);
      if ($mysqli->insert_id) {
        echo json_encode(["msg"=>"Horário Rservado com sucesso"]);
      } else {
        echo json_encode(["error"=>"Falha ao reservar horário."]);
      }
    }

      
  
  }  
}

if($_GET){
  if(isset($_GET['remover'])) {
    $id = $mysqli->real_escape_string($_GET['remover']);
    $sql = "DELETE FROM reservas WHERE id='$id'";

    if($mysqli->query($sql) === TRUE) {
      echo json_encode(["msg"=>"Reserva removida com sucesso !"]);
      
    }else{
      echo json_encode(["error"=>"Erro ao remover reserva"]);
    }
  }
  if(isset($_GET['user'])) {

    $user = $mysqli->real_escape_string($_GET['user']);
    $reservas = [];
    $reservas['myReservationsList'] = [];
    $reservas['quadra_reservations'] = [];
    $myreserv = "SELECT * FROM reservas WHERE usuario = '$user'";
    $my_reservation = $mysqli->query($myreserv) or die("Falha na execução do código SQL: " . $mysqli->error);

    $sql_code = "SELECT * FROM reservas";
    $AllReservas = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);

    while ($row = $my_reservation->fetch_assoc()) {
        array_push($reservas['myReservationsList'], $row);
    };
    while ($row = $AllReservas->fetch_assoc()) {
        array_push($reservas['quadra_reservations'], $row);
    };

    echo json_encode($reservas);
    
  }elseif(isset($_GET['quadra']) && isset($_GET['date']) && isset($_GET['time'])) {

    $quadra = $mysqli->real_escape_string($_GET['quadra']);
    $date = $mysqli->real_escape_string($_GET['date']);
    $time = $mysqli->real_escape_string($_GET['time']);

    $isreserved = [];
    $myreserv = "SELECT * FROM reservas WHERE quadra = '$quadra' and  data_reserva = '$date' and  hora_reserva = '$time'";
    $sql_query = $mysqli->query($myreserv) or die("Falha na execução do código SQL: " . $mysqli->error);
   // $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);
    $quantidade = $sql_query->num_rows;
    
    if($quantidade == 1) {
      echo json_encode(["error"=>"Horário já reservado"]);
    }else{
      echo json_encode(["msg"=>"Horário livre"]);
    }
      
  
  }
}
?>