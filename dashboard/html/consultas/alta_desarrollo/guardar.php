    <?php 

    include '../../../authh.php';
    checkRole(['Admin','Editor']);

    require '../../../conexion.php';

    try {

        $pdo->beginTransaction();

        // =========================
        // 🧼 Sanitizar datos
        // =========================
        $correo = trim($_POST['correo'] ?? '');
        $correo_existente = trim($_POST['correo_existente'] ?? '');

        // =========================
        // 🔎 1. EMPRESA EXISTENTE O NUEVA
        // =========================
        if (!empty($correo_existente)) {

            $stmt = $pdo->prepare("
                SELECT id 
                FROM dexterno_ap.desarrolladores 
                WHERE correo_electronico = :c
            ");
            $stmt->execute([':c'=>$correo_existente]);
            $desarrollador_id = $stmt->fetchColumn();

            if (!$desarrollador_id) {
                throw new Exception("❌ Empresa no encontrada con ese correo");
            }

        } else {

            if (empty($correo)) {
                throw new Exception("❌ El correo es obligatorio");
            }

            if (empty($_POST['usuario']) || empty($_POST['contrasena'])) {
                throw new Exception("❌ Usuario y contraseña son obligatorios");
            }

            // 🔐 Validar usuario único
            $stmtCheck = $pdo->prepare("
                SELECT 1 FROM dexterno_ap.desarrolladores WHERE usuario = :u
            ");
            $stmtCheck->execute([':u' => $_POST['usuario']]);

            if ($stmtCheck->fetch()) {
                throw new Exception("❌ El usuario ya existe");
            }

            // 🔐 Encriptar contraseña
            $pass = password_hash($_POST['contrasena'], PASSWORD_BCRYPT);

            // 🌐 Ruta por defecto del sistema
            $html = '/APP/desarrollador/dashboard.php';

            // 🏢 Insertar desarrollador
            $stmt = $pdo->prepare("
                INSERT INTO dexterno_ap.desarrolladores
                (nombre_empresa,nombre_comercial,representante_legal,correo_electronico,usuario,contrasena,html)
                VALUES (:e,:c,:r,:co,:u,:p,:h)
                RETURNING id
            ");

            $stmt->execute([
                ':e'=>trim($_POST['nombre_empresa']),
                ':c'=>trim($_POST['nombre_comercial']),
                ':r'=>trim($_POST['representante_legal']),
                ':co'=>$correo,
                ':u'=>trim($_POST['usuario']),
                ':p'=>$pass,
                ':h'=>$html
            ]);

            $desarrollador_id = $stmt->fetchColumn();
        }

        // =========================
        // 📁 2. CREAR CARPETA BASE
        // =========================
        $base = __DIR__ . "/uploads/";
        $empresaPath = $base . $desarrollador_id;

        if (!file_exists($empresaPath)) {
            mkdir($empresaPath, 0777, true);
        }

        // =========================
        // 🏗️ 3. INSERTAR DESARROLLOS
        // =========================
        foreach ($_POST['desarrollo'] as $dev) {

            if (empty($dev['nombre'])) continue;

            $stmt = $pdo->prepare("
                INSERT INTO dexterno_ap.desarrollos
                (desarrollador_id,nombre_desarrollo,num_viviendas,municipio,localidad)
                VALUES (:id,:n,:v,:m,:l)
                RETURNING id
            ");

            $stmt->execute([
                ':id'=>$desarrollador_id,
                ':n'=>trim($dev['nombre']),
                ':v'=>$dev['viviendas'] ?: null,
                ':m'=>trim($dev['municipio']),
                ':l'=>trim($dev['localidad'])
            ]);

            $desarrollo_id = $stmt->fetchColumn();

            // =========================
            // 📂 4. CREAR CARPETA
            // =========================
            $rutaFisica = $empresaPath . "/" . $desarrollo_id;

            if (!file_exists($rutaFisica)) {
                mkdir($rutaFisica, 0777, true);
            }

            // =========================
            // 🌐 5. GUARDAR RUTA EN BD
            // =========================
            $rutaBD = "uploads/" . $desarrollador_id . "/" . $desarrollo_id;

            $stmtRuta = $pdo->prepare("
                UPDATE dexterno_ap.desarrollos 
                SET ruta_archivos = :r 
                WHERE id = :id
            ");

            $stmtRuta->execute([
                ':r'=>$rutaBD,
                ':id'=>$desarrollo_id
            ]);
        }

        $pdo->commit();

        echo "✅ Guardado correctamente";

    } catch (Exception $e) {

        $pdo->rollBack();
        echo "❌ Error: " . $e->getMessage();
    }