<?php

class PruebaModel {

    private $pdo;

    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    public function obtenerPruebas($empresa='',$desarrollo=''){

        $sql = "
        SELECT
            fp.id,
            fp.folio,
            fp.fecha,
            fp.fraccionamiento,
            fp.desarrollador,
            fp.contratista,
            fp.estado,
            fr.resultado AS resultado
        FROM dexterno_ap.fac_ficha_prueba fp
        LEFT JOIN dexterno_ap.fac_ficha_resultado fr
            ON fp.id = fr.ficha_id
        WHERE 1=1
        ";

        $params=[];

        if($empresa){
            $sql .= " AND fp.desarrollador=?";
            $params[] = $empresa;
        }

        if($desarrollo){
            $sql .= " AND fp.fraccionamiento=?";
            $params[] = $desarrollo;
        }

        $sql .= " ORDER BY fp.fecha DESC";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}