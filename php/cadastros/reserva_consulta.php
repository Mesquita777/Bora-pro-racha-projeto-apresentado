<?php
include('../conexao.php');

if(isset($_POST['user']) && isset($_POST['quadra']) && isset($_POST['date'])) {

        $user = $mysqli->real_escape_string($_POST['user']);
        $quadra = $mysqli->real_escape_string($_POST['quadra']);
        $date = $mysqli->real_escape_string($_POST['date']);
        $time = $mysqli->real_escape_string($_POST['time']);

        $sql_code = "INSERT INTO reservas (quadra,data_reserva,hora_reserva,usuario) VALUES ('$quadra','$date','$time','$user')";
       // $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);
        $mysqli->query($sql_code);
        if ($mysqli->insert_id) {
            echo json_encode(["msg"=>"Horário Rservado com sucesso"]);
          } else {
            echo json_encode(["error"=>"Falha ao reservar horário."]);
          }
          
          $mysqli->close();
    
}
?>