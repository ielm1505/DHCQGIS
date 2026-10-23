<?php

class CargaModel {

    private $pdo;

    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    public function obtenerEmpresas(){

        $stmt = $this->pdo->query("
            SELECT DISTINCT empresa
            FROM dexterno_ap.control_cargas
            ORDER BY empresa
        ");

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function obtenerDesarrollos($empresa=''){

        $sql = "
        SELECT DISTINCT desarrollo
        FROM dexterno_ap.control_cargas
        WHERE 1=1
        ";

        $params=[];

        if($empresa){
            $sql .= " AND empresa=?";
            $params[] = $empresa;
        }

        $sql .= " ORDER BY desarrollo";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function obtenerCargas($empresa='',$desarrollo=''){

        $sql = "
        SELECT
            id,
            empresa,
            desarrollo,
            archivo,
            tipo_archivo,
            estado_aprobacion,
            TO_CHAR(fecha_carga,'DD/MM/YYYY HH24:MI')
            AS fecha_carga
        FROM dexterno_ap.control_cargas
        WHERE 1=1
        ";

        $params=[];

        if($empresa){
            $sql .= " AND empresa=?";
            $params[] = $empresa;
        }

        if($desarrollo){
            $sql .= " AND desarrollo=?";
            $params[] = $desarrollo;
        }

        $sql .= " ORDER BY fecha_carga DESC";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}