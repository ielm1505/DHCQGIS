<?php

require '../../../conexion.php';

$id = $_GET['id'];

try{

    $pdo->beginTransaction();

    /* eliminar desarrollos */

    $stmt = $pdo->prepare("
        DELETE FROM dexterno_ap.desarrollos
        WHERE desarrollador_id = :id
    ");

    $stmt->execute([':id'=>$id]);

    /* eliminar empresa */

    $stmt = $pdo->prepare("
        DELETE FROM dexterno_ap.desarrolladores
        WHERE id = :id
    ");

    $stmt->execute([':id'=>$id]);

    $pdo->commit();

}catch(Exception $e){

    $pdo->rollBack();

    echo $e->getMessage();
}
?>

<script>
location.href='index.php';
</script>