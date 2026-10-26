<?php

require '../../../conexion.php';

$id = $_GET['id'];

try{

    $stmt = $pdo->prepare("

        DELETE FROM dexterno_ap.desarrollos
        WHERE id = :id

    ");

    $stmt->execute([':id'=>$id]);

}catch(Exception $e){

    echo $e->getMessage();
}

?>

<script>
location.href='index.php';
</script>