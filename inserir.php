<?php
header('Content-Type: application/json');
$name = $_POST['name'];
$comment = $_POST['comment'];
try {
    $pdo = new PDO('mysql:host=localhost; dbname=projeto_ajax;', 'root', ''); // pdo concentar ao banco de dados 

    $stmt = $pdo->prepare('INSERT INTO comments(name_c,comment_c) VALUES (:na,:co)');
    $stmt->bindValue(':na',$name);
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
