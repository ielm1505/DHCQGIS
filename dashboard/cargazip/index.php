<?php



?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Carga Geoespacial</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .menu-container {
            background: white;
            border-radius: 30px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            padding: 50px;
            max-width: 600px;
            width: 100%;
            text-align: center;
        }

        h1 {
            color: #2d3748;
            font-size: 32px;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .subtitle {
            color: #718096;
            font-size: 16px;
            margin-bottom: 40px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 20px;
        }

        .menu-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 30px;
        }

        .menu-item {
            background: #f7fafc;
            border-radius: 20px;
            padding: 30px 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            text-decoration: none;
            display: block;
            color: inherit;
        }

        .menu-item:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 20px 30px -10px rgba(102, 126, 234, 0.3);
        }

        .menu-item.carga:hover {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
        }

        .menu-item.pruebas:hover {
            background: linear-gradient(135deg, #48bb7815 0%, #38a16915 100%);
        }

        .menu-icon {
            width: 70px;
            height: 70px;
            margin-bottom: 20px;
        }

        .menu-item.carga .menu-icon {
            color: #667eea;
        }

        .menu-item.pruebas .menu-icon {
            color: #48bb78;
        }

        .menu-title {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .menu-item.carga .menu-title {
            color: #5a67d8;
        }

        .menu-item.pruebas .menu-title {
            color: #2f855a;
        }

        .menu-description {
            color: #718096;
            font-size: 14px;
            line-height: 1.5;
        }

        .info-box {
            background: #ebf8ff;
            border: 1px solid #90cdf4;
            border-radius: 12px;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
        }

        .info-box h3 {
            color: #2c5282;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .info-box ul {
            list-style: none;
            color: #2d3748;
            font-size: 14px;
        }

        .info-box li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
        }

        .info-box li:before {
            content: "•";
            color: #4299e1;
            font-weight: bold;
            position: absolute;
            left: 5px;
        }

        .footer {
            margin-top: 30px;
            color: #a0aec0;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .badge {
            background: #e2e8f0;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            color: #4a5568;
        }

        @media (max-width: 500px) {
            .menu-grid {
                grid-template-columns: 1fr;
            }
            
            .menu-container {
                padding: 30px;
            }
        }
    </style>
</head>
<body>
    <div class="menu-container">
        <h1>📊 Sistema de Gestión Geoespacial</h1>
        <div class="subtitle">Seleccione una opción del menú</div>
        
        <div class="menu-grid">
            <!-- Opción 1: Carga de Archivo -->
            <a href="czippgkg.php" class="menu-item carga">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                    <circle cx="12" cy="15" r="2"></circle>
                </svg>
                <div class="menu-title">📂 Carga de Archivo</div>
                <div class="menu-description">
                    Subir archivos SHP (ZIP), GPKG y CAD<br>
                    <small style="color: #a0aec0;">Shapefiles y GeoPackage</small>
                </div>
            </a>
            
            <!-- Opción 2: Registro de Pruebas -->
            <a href="sppgdes/pruebades.php" class="menu-item pruebas">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
                </svg>
                <div class="menu-title">📋 Registro de Pruebas</div>
                <div class="menu-description">
                    Ver registro de pruebas a desarrolldor<br>
                    <small style="color: #a0aec0;">Registros y validaciones</small>
                </div>
            </a>
        </div>

        <hr><br>
        <div class="menu-item">
          <a onclick="cerrarSesion()">Cerrar Sesion</a>
      </div>
        <div class="info-box">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="12" x2="12" y2="16"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Información del Sistema
            </h3>
            <ul>

                <li><strong>SRID por defecto:</strong> EPSG:32616</li>

                <li><strong>Formatos soportados:</strong> ZIP (Shapefile), GPKG y DWG</li>

            </ul>
        </div>
        
        <div class="footer">
            <span class="badge">📌 v2.0</span>
            <span>© 2024 - Sistema de Carga Geoespacial</span>
            <span class="badge">🔧 QGIS</span>
        </div>
    </div>

    <script>


  function cerrarSesion() {
      window.location.href = "../logout.php"; // Redirige al logout.php
      }


        // Opcional: agregar efecto de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === '1') {
                window.location.href = 'index.html';
            } else if (e.key === '2') {
                window.location.href = 'pruebas.html';
            }
        });
    </script>
</body>
</html>