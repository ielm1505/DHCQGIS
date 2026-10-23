<?php

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cargar SHP / GPKG / CAD</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 40px;
            max-width: 600px;
            width: 100%;
        }
        
        h2 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
            text-align: center;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            text-align: center;
            font-size: 16px;
        }
        
        .upload-area {
            border: 3px dashed #cbd5e0;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            background: #f8fafc;
            transition: all 0.3s ease;
            cursor: pointer;
            margin-bottom: 25px;
        }
        
        .upload-area:hover {
            border-color: #667eea;
            background: #f0f4f8;
        }
        
        .upload-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 15px;
            color: #667eea;
        }
        
        .upload-area p {
            color: #666;
            font-size: 16px;
        }
        
        .upload-area small {
            color: #999;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            color: #4a5568;
            font-weight: 600;
            font-size: 14px;
        }
        
        input, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .row-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
        }
        
        button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            margin-top: 20px;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .file-info {
            background: #f0f4f8;
            border-radius: 8px;
            padding: 12px;
            margin-top: 15px;
            font-size: 14px;
            color: #4a5568;
            display: none;
        }
        
        .file-info.show {
            display: block;
        }
        
        .file-name {
            font-weight: 600;
            color: #2d3748;
        }
        
        .loader {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        
        .loader.show {
            display: block;
        }
        
        .loader svg {
            animation: rotate 2s linear infinite;
            width: 40px;
            height: 40px;
        }
        
        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }
        
        #respuesta {
            margin-top: 30px;
        }
        
        .error-message {
            color: #e53e3e;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .help-text {
            font-size: 12px;
            color: #718096;
            margin-top: 5px;
        }

          .menu-item.carga .menu-title {
            color: #5a67d8;
        }

        .menu-item.pruebas .menu-title {
            color: #2f855a;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>📂 Cargar Archivos Geoespaciales</h2>
        <p class="subtitle">Complete los datos y seleccione un archivo ZIP, GPKG o CAD</p>
        
        <div class="upload-area" id="uploadArea">
            <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>Arrastra tu archivo aquí o haz clic para seleccionar</p>
            <small>Soportados: ZIP (Shapefiles), GPKG, DWG, DXF, DGN (CAD)</small>
        </div>
        
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" name="archivo" id="archivo" accept=".zip,.gpkg,.dwg,.dxf,.dgn" style="display: none;" required>
            
            <div class="file-info" id="fileInfo">
                <strong>Archivo seleccionado:</strong> <span class="file-name" id="fileName"></span>
            </div>
            
            <div class="form-group">
                <label for="empresa">🏢 Empresa *</label>

<input type="text" id="empresa" readonly>



            </div>
            
            <div class="form-group">
                <label for="desarrollo">📍 Desarrollo / Urbanización *</label>


<select id="desarrollo" name="desarrollo" required>
    <option value="">Seleccione desarrollo</option>
</select>


            </div>
            
            <div class="row-3">
                <div class="form-group">
                    

<div class="row-3">
    <div class="form-group">
        <label>🏙️ Municipio</label>
        <input type="text" id="municipio" readonly>
    </div>

    <div class="form-group">
        <label>📍 Localidad</label>
        <input type="text" id="localidad" readonly>
    </div>

    <div class="form-group">
        <label>🏠 Viviendas</label>
        <input type="number" id="viviendas" readonly>
    </div>
</div>

            </div>
            
            <div class="loader" id="loader">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                        <animate attributeName="stroke-dashoffset" values="32;0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                </svg>
                <p style="margin-top: 10px; color: #667eea;">Procesando archivo...</p>
            </div>
            
            <button type="submit" id="submitBtn">🚀 Cargar Archivo</button>
        </form>
        
       
    </div>
     <div id="respuesta"></div>
 <button type="submit" id="submitBtn">
          <a onclick="cerrarSesion()">Cerrar Sesion</a>
      </button>
      <a href="index.php"><button>Volver</button></a><br>




    <script>

          function cerrarSesion() {
      window.location.href = "../logout.php"; // Redirige al logout.php
      }

        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('archivo');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const form = document.getElementById('uploadForm');
        const submitBtn = document.getElementById('submitBtn');
        const loader = document.getElementById('loader');
        const respuesta = document.getElementById('respuesta');
        
        // Drag & drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            uploadArea.classList.add('dragover');
        }
        
        function unhighlight() {
            uploadArea.classList.remove('dragover');
        }
        
        uploadArea.addEventListener('drop', handleDrop, false);
        uploadArea.addEventListener('click', () => fileInput.click());
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            fileInput.files = files;
            updateFileInfo();
        }
        
        fileInput.addEventListener('change', updateFileInfo);
        
        function updateFileInfo() {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const ext = file.name.split('.').pop().toLowerCase();
                const validExtensions = ['zip', 'gpkg', 'dwg', 'dxf', 'dgn'];
                
                if (validExtensions.includes(ext)) {
                    fileName.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                    fileInfo.classList.add('show');
                } else {
                    alert('Solo se permiten archivos ZIP, GPKG o CAD (DWG, DXF, DGN)');
                    fileInput.value = '';
                    fileInfo.classList.remove('show');
                }
            }
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validar campos
        const empresa = document.getElementById('empresa').value.trim();
const desarrollo = document.getElementById('desarrollo').value;

if (!empresa || !desarrollo) {
    alert('Seleccione un desarrollo');
    return;
}
       
            
            if (fileInput.files.length === 0) {
                alert('Por favor seleccione un archivo');
                return;
            }
            
            // Mostrar loader
            loader.classList.add('show');
            submitBtn.disabled = true;
            respuesta.innerHTML = '';
            
            // Preparar FormData
            let formData = new FormData();
            formData.append('archivo', fileInput.files[0]);
            formData.append('empresa', empresa);
            formData.append('desarrollo', desarrollo);
            formData.append('viviendas', viviendas);
          
            
            try {
                let res = await fetch('upload.php', {
                    method: 'POST',
                    body: formData
                });
                
                let text = await res.text();
                respuesta.innerHTML = text;
                
                // Limpiar formulario si la carga fue exitosa
                if (text.includes('✅') || text.includes('completada') || text.includes('Resumen')) {
                    form.reset();
                    fileInput.value = '';
                    fileInfo.classList.remove('show');
                }
                
            } catch (error) {
                respuesta.innerHTML = `<div style="color: #e53e3e; padding: 15px; background: #fed7d7; border-radius: 8px;">❌ Error de conexión: ${error.message}</div>`;
            } finally {
                loader.classList.remove('show');
                submitBtn.disabled = false;
            }
        });





        //cargar datos----

// =============================
// 🚀 CARGAR EMPRESA + DESARROLLOS
// =============================
async function cargarDatos() {
    try {
        let res = await fetch('get_datos_usuario.php');

        if (!res.ok) {
            throw new Error('Error al obtener datos del usuario');
        }

        let data = await res.json();

        // Empresa
        document.getElementById('empresa').value = data.empresa || '';

        // Select desarrollos
        let select = document.getElementById('desarrollo');

        // Limpiar opciones
        select.innerHTML = '<option value="">-- Seleccione desarrollo --</option>';

        if (data.desarrollos && data.desarrollos.length > 0) {

            data.desarrollos.forEach(dev => {
                let option = document.createElement('option');
                option.value = dev.id;
                option.textContent = dev.nombre_desarrollo;
                select.appendChild(option);
            });

            select.selectedIndex = 1;

            // Disparar cambio
            select.dispatchEvent(new Event('change'));

        } else {
            console.warn('⚠️ No hay desarrollos disponibles');
        }

    } catch (error) {
        console.error('❌ Error:', error);
        document.getElementById('empresa').value = 'Error al cargar';
    }
}

// =============================
// CUANDO CAMBIA DESARROLLO
// =============================
document.getElementById('desarrollo').addEventListener('change', async function () {

    let id = this.value;
    if (!id) return;

    try {
        let res = await fetch('get_desarrollo.php?id=' + id);

        if (!res.ok) {
            throw new Error('Error al obtener desarrollo');
        }

        let data = await res.json();

        document.getElementById('municipio').value = data.municipio || '';
        document.getElementById('localidad').value = data.localidad || '';
        document.getElementById('viviendas').value = data.num_viviendas || '';

    } catch (error) {
        console.error('❌ Error cargando desarrollo:', error);
    }
});

// =============================
// 🟢 INICIALIZAR
// =============================
window.addEventListener('DOMContentLoaded', cargarDatos);






    </script>
</body>
</html>