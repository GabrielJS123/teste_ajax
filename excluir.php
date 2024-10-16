<?php
header('Content-Type: application/json');
$id = $_POST['id'];
try {
    $pdo = new PDO('mysql:host=localhost; dbname=projeto_ajax;', 'root', ''); // pdo concentar ao banco de dados 

    $stmt = $pdo->prepare('UPDATE comments SET name_c = :na, comment_c = :co WHERE id = :id;');
    $stmt->bindValue(':id', $id);
    $stmt->bindValue(':na', $name);
    $stmt->bindValue(':co', $comment);
    $stmt->execute();

    if ($stmt->rowCount() >= 1) {
        echo json_encode("salvo com sucesso");
    } else {
        echo json_encode("Falha ao salvar o comentario");
    }
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
