<?php
header('Content-Type: application/json');
$id = $_POST['id'];
try {
    $pdo = new PDO('mysql:host=localhost; dbname=projeto_ajax;', 'root', ''); // pdo concentar ao banco de dados 

    $stmt = $pdo->prepare('DELETE FROM comments WHERE id = :id;');
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() >= 1) {
        echo json_encode("Excluido com sucesso");
    } else {
        echo json_encode("Falha ao Excluir o comentario");
    }
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
