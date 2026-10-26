<?php

class FichaModel {

    private $pdo;

    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    public function buscarPorFolio($folio){

        $stmt = $this->pdo->prepare("
            SELECT
                fp.*,
                fr.resultado as estado_validacion
            FROM dexterno_ap.fac_ficha_prueba fp
            LEFT JOIN dexterno_ap.fac_ficha_resultado fr
                ON fp.id = fr.ficha_id
            WHERE fp.folio = ?
        ");

        $stmt->execute([$folio]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}