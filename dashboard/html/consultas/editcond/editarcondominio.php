



<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor de Condominios</title>
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.2.1/ol.css">
    
   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="edit_condominio.css">
 
</head>
<body>
    <div id="map">
        <!-- Toolbar -->
        <div id="edit-toolbar">
            <span class="toolbar-title">
                <i class="fas fa-edit"></i> Edición Condominios
                <span id="layerStatus" class="layer-status">Activa</span>
            </span>
            
            <div class="separator"></div>
            
            <button class="btn-create" id="btnCreate" title="Dibujar nuevo polígono">
                <i class="fas fa-plus"></i> Crear
            </button>
            
            <button class="btn-update" id="btnUpdate" title="Editar geometría y atributos">
                <i class="fas fa-pen"></i> Editar
            </button>
            
            <button class="btn-delete" id="btnDelete" title="Eliminar polígono seleccionado">
                <i class="fas fa-trash"></i> Eliminar
            </button>
            
            <button class="btn-move" id="btnMove" title="Mover polígono completo">
                <i class="fas fa-arrows-alt"></i> Reubicar
            </button>
            
            <div class="separator"></div>
            
            <button id="btnCancel" style="background:#6c757d;color:white;border-color:#6c757d;" title="Cancelar operación actual">
                <i class="fas fa-times"></i> Cancelar
            </button>
            
            <button id="btnRefresh" style="background:#6c757d;color:white;border-color:#6c757d;" title="Recargar datos">
                <i class="fas fa-sync"></i> Recargar
            </button>
        </div>
        
        <!-- Panel de información -->
        <div id="info-panel">
            <div class="info-title">
                <i class="fas fa-info-circle"></i> 
                <span id="infoTitle">Selecciona una operación</span>
            </div>
            <div class="info-content" id="infoContent">
                Usa los botones del toolbar para editar los condominios
            </div>
        </div>
    </div>

      <script src="https://cdn.jsdelivr.net/npm/ol@v10.2.1/dist/ol.min.js"></script>
    <script src="editor_condominios.js"></script>
  
</body>
</html>