<?php
include('../conexao.php');

if(isset($_POST['email']) || isset($_POST['senha'])) {

    if(strlen($_POST['email']) == 0) {
        echo "Preencha seu e-mail";
    } else if(strlen($_POST['senha']) == 0) {
        echo "Preencha sua senha";
    } else {

        $email = $mysqli->real_escape_string($_POST['email']);
        $senha = $mysqli->real_escape_string($_POST['senha']);

        $sql_code = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
        $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);

        $quantidade = $sql_query->num_rows;

        if($quantidade == 1) {
            
            $usuario = $sql_query->fetch_assoc();

            if(!isset($_SESSION)) {
                session_start();
            }
            $usuario_id = $usuario['id'];
            $_SESSION['id'] = $usuario_id;
            $_SESSION['nome'] = $usuario['nome'];

            $sql_code = "SELECT * FROM reservas";
            $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);

            $myreserv = "SELECT * FROM reservas WHERE usuario = '$usuario_id'";
            $my_reservation = $mysqli->query($myreserv) or die("Falha na execução do código SQL: " . $mysqli->error);

            $user = [];
            $user['user'] = $usuario;
            $user['minhasreservas'] = [];
            $user['reservas'] = [];
            while ($row = $sql_query->fetch_assoc()) {
                array_push($user['reservas'], $row);
            };

            while ($row = $my_reservation->fetch_assoc()) {
                array_push($user['minhasreservas'], $row);
            };

            echo json_encode($user);

            // header("Location: painel.php");

        } else {
            echo json_encode(["error"=>"Falha ao logar! E-mail ou senha incorretos"]);
        }

    }

}
?>