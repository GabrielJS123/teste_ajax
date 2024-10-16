<?php
header('Content-Type: application/json');
try {
    $pdo = new PDO('mysql:host=localhost; dbname=projeto_ajax;', 'root', ''); // pdo concentar ao banco de dados 

    $stmt = $pdo->prepare('SELECT * FROM comments');
 
    $stmt->execute();

    if ($stmt->rowCount() >= 1) {
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode("Falha ao selecionar os comentarios");
    }
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
