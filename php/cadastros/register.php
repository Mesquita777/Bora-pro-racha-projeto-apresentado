<?php
include('../conexao.php');

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];

    $sql_code = "INSERT INTO usuarios (nome, email, senha, telefone) VALUES ('$nome','$email', '$senha', '$telefone')";
    $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);
    if ($mysqli->insert_id) {
        echo json_encode(["msg"=>"Usuário cadastrado com sucesso"]);
      } else {
        echo json_encode(["error"=>"Erro ao cadastrar usuário."]);
      }
?>