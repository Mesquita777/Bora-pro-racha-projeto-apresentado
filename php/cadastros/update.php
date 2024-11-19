<?php
include('../conexao.php');

    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];

    $sql_code = "UPDATE usuarios SET nome='$nome', email='$email', telefone='$telefone' WHERE id='$id' ";
    // $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);

    if ($mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error)) {
        echo json_encode(["msg"=>"Usuário Atualizado com sucesso"]);
      } else {
        echo json_encode(["error"=>"Erro ao Atualizar usuário."]);
      }
?>