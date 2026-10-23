
        const map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([-86.95, 20.95]),
                zoom: 10.5,
                projection: 'EPSG:3857'
            })
        });

        const style_condominios = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#2c3e50',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(52, 152, 219, 0.2)'
            }),
            text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#000' }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                }),
                
                text: (feature) => {
                    const condominio = feature.get('condominio');
                    return condominio ? condominio.substring(0, 20) : '';
                },
                offsetY: -8
            })
        });

        const style_selected = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#e74c3c',
                width: 4
            }),
            fill: new ol.style.Fill({
                color: 'rgba(231, 76, 60, 0.15)'
            }),
            text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#c0392b' }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                }),
               /* text: (feature) => {
                    const condominio = feature.get('condominio');
                    return condominio ? '✏️ ' + condominio.substring(0, 20) : '✏️ Seleccionado';
                },*/
                offsetY: -8
            })
        });

        const style_moving = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ff6b6b',
                width: 4,
                lineDash: [8, 4]
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 107, 107, 0.15)'
            }),
            text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#e74c3c' }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                }),
                text: '🔄 Moviendo...',
                offsetY: -8
            })
        });


        function extractNumericId(fid) {
            if (!fid) return null;
            
            
            if (typeof fid === 'number') return fid;
            
           
            if (typeof fid === 'string') {
                
                const parts = fid.split('.');
                const lastPart = parts[parts.length - 1];
                if (!isNaN(lastPart) && lastPart !== '') {
                    return parseInt(lastPart);
                }
               
                if (!isNaN(fid)) {
                    return parseInt(fid);
                }
            }
            
            return null;
        }


        function getFeatureId(feature) {
         /*   if (!feature) {
                console.error('❌ Feature es null');
                return null;
            }*/
            
          
            let id = feature.get('id_1');
            if (id !== undefined && id !== null && id !== '') {
                // Si es un fid de GeoServer, extraer el número
                const numericId = extractNumericId(id);
                if (numericId !== null) {
                    //console.log('🔑 ID obtenido de id_1 (numérico):', numericId);
                    return numericId;
                }
               // console.log('🔑 ID obtenido de id_1:', id);
                return id;
            }
            
            
            const fid = feature.getId();
            if (fid !== undefined && fid !== null && fid !== '') {
               
                const numericId = extractNumericId(fid);
                if (numericId !== null) {
                    //console.log('🔑 ID obtenido del fid de GeoServer (numérico):', numericId);
                   
                    feature.set('id_1', numericId);
                    return numericId;
                }
               // console.log('🔑 ID obtenido del fid de GeoServer:', fid);
                feature.set('id_1', fid);
                return fid;
            }
            
           
            const props = feature.getProperties();
            if (props.id !== undefined && props.id !== null && props.id !== '') {
                //console.log('🔑 ID obtenido del campo id:', props.id);
                const numericId = extractNumericId(props.id);
                if (numericId !== null) {
                    feature.set('id_1', numericId);
                    return numericId;
                }
                feature.set('id_1', props.id);
                return props.id;
            }
            
            console.error('❌ No se pudo obtener ningún ID para la feature:', feature.getProperties());
            return null;
        }


        const jsonSource_condominios = new ol.source.Vector({
            attributions: ' '
        });

        function loadCondominios() {
            showNotification('Cargando condominios...', 'info');
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:condominios" +
                "&outputFormat=application/json&srsname=EPSG:3857")
                .then(response => {
                    if (!response.ok) throw new Error('Error en la respuesta del servidor');
                    return response.json();
                })
                .then(data => {
                    const format_condominios = new ol.format.GeoJSON();
                    const features_condominios = format_condominios.readFeatures(data, {
                        featureProjection: 'EPSG:3857'
                    });
                    
                    
                    features_condominios.forEach((feature, index) => {
                        const props = feature.getProperties();
                        const fid = feature.getId();
                        
                        //console.log(`🔑 Feature ${index} - fid:`, fid, 'props:', props);
                        
                        let numericId = null;
                        if (fid !== undefined && fid !== null) {
                            numericId = extractNumericId(fid);
                        }
                        
                        
                        if (numericId !== null) {
                            feature.set('id_1', numericId);
                            //console.log(`✅ Feature ${index} - id_1 asignado (numérico):`, numericId);
                        } else if (fid !== undefined && fid !== null) {
                            feature.set('id_1', fid);
                           // console.log(`✅ Feature ${index} - id_1 asignado (fid):`, fid);
                        } else {
                            //console.warn(`⚠️ Feature ${index} sin ID`);
                        }
                    });
                    
                    jsonSource_condominios.clear();
                    jsonSource_condominios.addFeatures(features_condominios);
                    
                    showNotification(`✅ ${features_condominios.length} condominios cargados`, 'success');
                    updateInfoPanel('Datos cargados', `${features_condominios.length} condominios disponibles`);
                })
                .catch(error => {
                    console.error("Error al cargar los datos:", error);
                    showNotification('❌ Error al cargar datos: ' + error.message, 'error');
                    updateInfoPanel('Error de carga', 'No se pudieron cargar los condominios');
                });
        }




        //capas--------
        const lyr_condominios = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_condominios,
            style: style_condominios,
            popuplayertitle: "SM",
            interactive: false,
            title: '🏢 Condominios'
        });

        map.addLayer(lyr_condominios);

// notificaciones lateral-------------------
        function showNotification(message, type = 'info', duration = 3000) {
            const existing = document.querySelector('.notification');
            if (existing) existing.remove();
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                notification.style.transition = 'all 0.3s';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }


        function updateInfoPanel(title, content) {
            document.getElementById('infoTitle').textContent = title;
            document.getElementById('infoContent').textContent = content;
            document.getElementById('info-panel').classList.add('show');
        }

        function hideInfoPanel() {
            document.getElementById('info-panel').classList.remove('show');
        }


        function createDraggableModal(title, bodyHTML) {
            return new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay active';
                overlay.id = 'propertyModal';
                
                const modal = document.createElement('div');
                modal.className = 'modal-content';
                
                modal.innerHTML = `
                    <div class="modal-header" id="modalDragHandle">
                        <div>
                            <span class="drag-icon"><i class="fas fa-grip-lines"></i></span>
                            <h3><i class="fas fa-building"></i> ${title}</h3>
                        </div>
                        <button class="close-btn" id="modalCloseBtn" title="Cerrar (ESC)">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${bodyHTML}
                    </div>
                `;
                
                overlay.appendChild(modal);
                document.body.appendChild(overlay);
                
               
                const handle = modal.querySelector('#modalDragHandle');
                let isDragging = false;
                let offsetX, offsetY;
                
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                
                const startDrag = (e) => {
                    if (e.target.closest('.close-btn')) return;
                    
                    isDragging = true;
                    const clientX = e.clientX || e.touches?.[0]?.clientX;
                    const clientY = e.clientY || e.touches?.[0]?.clientY;
                    
                    if (!clientX || !clientY) return;
                    
                    const rect = modal.getBoundingClientRect();
                    offsetX = clientX - rect.left;
                    offsetY = clientY - rect.top;
                    
                    modal.style.top = rect.top + 'px';
                    modal.style.left = rect.left + 'px';
                    modal.style.transform = 'none';
                    modal.classList.add('dragging');
                    e.preventDefault();
                };
                
                const onDrag = (e) => {
                    if (!isDragging) return;
                    
                    const clientX = e.clientX || e.touches?.[0]?.clientX;
                    const clientY = e.clientY || e.touches?.[0]?.clientY;
                    
                    if (!clientX || !clientY) return;
                    
                    let newX = clientX - offsetX;
                    let newY = clientY - offsetY;
                    
                    const maxX = window.innerWidth - modal.offsetWidth;
                    const maxY = window.innerHeight - modal.offsetHeight;
                    newX = Math.max(0, Math.min(newX, maxX));
                    newY = Math.max(0, Math.min(newY, maxY));
                    
                    modal.style.left = newX + 'px';
                    modal.style.top = newY + 'px';
                    e.preventDefault();
                };
                
                const endDrag = () => {
                    isDragging = false;
                    modal.classList.remove('dragging');
                };
                
                handle.addEventListener('mousedown', startDrag);
                document.addEventListener('mousemove', onDrag);
                document.addEventListener('mouseup', endDrag);
                handle.addEventListener('touchstart', startDrag, { passive: false });
                document.addEventListener('touchmove', onDrag, { passive: false });
                document.addEventListener('touchend', endDrag);
                handle.addEventListener('selectstart', (e) => e.preventDefault());
                
                const closeModal = () => {
                    overlay.remove();
                    resolve(null);
                };
                
                modal.querySelector('#modalCloseBtn').addEventListener('click', closeModal);
                
                const escHandler = (e) => {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', escHandler);
                    }
                };
                document.addEventListener('keydown', escHandler);
                
                resolve({
                    overlay,
                    modal,
                    close: closeModal,
                    getData: () => null
                });
            });
        }

// desplazar--------------
        function showConfirmMove(feature, originalGeometry) {
            return new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'confirm-overlay';
                overlay.id = 'confirmMove';
                
                overlay.innerHTML = `
                    <div class="confirm-box">
                        <div class="confirm-icon">
                            <i class="fas fa-map-pin"></i>
                        </div>
                        <h3>🔄 Confirmar Reubicación</h3>
                        <p>
                            <strong>${feature.get('condominio') || 'Sin nombre'}</strong><br>
                            ¿Deseas guardar la nueva ubicación del polígono?
                        </p>
                        <div class="confirm-actions">
                            <button class="btn-confirm" id="confirmYes">
                                <i class="fas fa-check"></i> Sí, guardar
                            </button>
                            <button class="btn-cancel-confirm" id="confirmNo">
                                <i class="fas fa-undo"></i> Cancelar
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                document.getElementById('confirmYes').onclick = () => {
                    overlay.remove();
                    resolve(true);
                };
                
                document.getElementById('confirmNo').onclick = () => {
                    feature.setGeometry(originalGeometry);
                    feature.setStyle(style_condominios);
                    overlay.remove();
                    resolve(false);
                };
                
                const escHandler = (e) => {
                    if (e.key === 'Escape') {
                        feature.setGeometry(originalGeometry);
                        feature.setStyle(style_condominios);
                        overlay.remove();
                        resolve(false);
                        document.removeEventListener('keydown', escHandler);
                    }
                };
                document.addEventListener('keydown', escHandler);
            });
        }

 // consultas------------
        async function callEditPHP(action, data, id = null) {
            //console.log('📤 Llamando a PHP:', { action, data, id });
            
            const formData = new FormData();
            formData.append('action', action);
            
            if (id !== null && id !== undefined && id !== '') {
                formData.append('id_1', id);
                //console.log('🔑 Enviando ID (id_1):', id);
            } else {
                //console.log('⚠️ No se envió ID');
            }
            
            if (data) {
                const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
                formData.append('data', dataString);
                //console.log('📦 Data enviada:', dataString.substring(0, 200) + '...');
            }
            
            try {
                const response = await fetch('edit_condominios.php', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
               // console.log('📥 Respuesta del servidor:', result);
                
                if (!result.success) {
                    throw new Error(result.error || 'Error desconocido en el servidor');
                }
                
                return result;
            } catch (error) {
                console.error('❌ Error en callEditPHP:', error);
                throw error;
            }
        }

        function getGeometryGeoJSON(feature) {
            if (!feature) {
                console.error('❌ Feature null o undefined');
                return null;
            }
            
            const geometry = feature.getGeometry();
            if (!geometry) {
                console.error('❌ Geometría null en la feature');
                return null;
            }
            
            try {
                const geojsonFormat = new ol.format.GeoJSON();
                const geojson = geojsonFormat.writeGeometry(geometry);
                return JSON.parse(geojson);
            } catch (error) {
                console.error('❌ Error obteniendo GeoJSON:', error);
                return null;
            }
        }

      
        class CondominiosEditor {
            constructor(map, layer) {
                this.map = map;
                this.layer = layer;
                this.selectedFeature = null;
                this.editMode = null;
                this.interactions = [];
                this.modalInstance = null;
                this.isMoving = false;
                this.moveStartGeometry = null;
                
                // Interacción de selección
                this.selectInteraction = new ol.interaction.Select({
                    condition: ol.events.condition.click,
                    style: style_selected
                });
                
                this.selectInteraction.on('select', (e) => {
                    if (this.isMoving) return;
                    
                    if (e.selected.length > 0) {
                        this.selectedFeature = e.selected[0];
                        const props = this.selectedFeature.getProperties();
                        const nombre = props.condominio || 'Sin nombre';
                        
                        
                        const id = getFeatureId(this.selectedFeature);
                        
                        console.log('📌 Feature seleccionado:', { id, nombre, props });
                        
                        updateInfoPanel(
                            '📌 Condominio seleccionado',
                            `ID: ${id || 'N/A'} | ${nombre}`
                        );
                        showNotification(`Seleccionado: ${nombre} (ID: ${id || 'N/A'})`, 'info', 2000);
                    } else {
                        this.selectedFeature = null;
                        hideInfoPanel();
                    }
                });
                
                this.map.addInteraction(this.selectInteraction);
                
              
                this.startDrawing = this.startDrawing.bind(this);
                this.startEditing = this.startEditing.bind(this);
                this.deleteFeature = this.deleteFeature.bind(this);
                this.startMoving = this.startMoving.bind(this);
                this.cancelOperation = this.cancelOperation.bind(this);
                
          // Eventos-------------
                document.getElementById('btnCreate').addEventListener('click', this.startDrawing);
                document.getElementById('btnUpdate').addEventListener('click', this.startEditing);
                document.getElementById('btnDelete').addEventListener('click', this.deleteFeature);
                document.getElementById('btnMove').addEventListener('click', this.startMoving);
                document.getElementById('btnCancel').addEventListener('click', this.cancelOperation);
                document.getElementById('btnRefresh').addEventListener('click', () => {
                    loadCondominios();
                    this.cancelOperation();
                });
            }
            
            //crrearr-----------
            startDrawing() {
                if (!this.layer.getVisible()) {
                    showNotification('❌ Activa la capa de Condominios primero', 'warning');
                    return;
                }
                
                this.cancelOperation();
                this.editMode = 'create';
                
                const draw = new ol.interaction.Draw({
                    source: this.layer.getSource(),
                    type: 'Polygon'
                });
                
                draw.on('drawstart', () => {
                    updateInfoPanel('✏️ Dibujando', 'Haz clic para crear el polígono');
                });
                
                draw.on('drawend', async (e) => {
                    this.map.removeInteraction(draw);
                    this.editMode = null;
                    hideInfoPanel();
                    await this.saveNewFeature(e.feature);
                });
                
                this.map.addInteraction(draw);
                this.interactions.push(draw);
                
                showNotification('🖊️ Dibuja un nuevo polígono en el mapa', 'info');
                updateInfoPanel('✏️ Modo Creación', 'Haz clic en el mapa para dibujar');
                document.getElementById('btnCreate').classList.add('active');
            }
            
            async saveNewFeature(feature) {
                try {
                    if (!feature) {
                        showNotification('❌ Error: Feature no creada', 'error');
                        return;
                    }
                    
                    const geometry = feature.getGeometry();
                    if (!geometry) {
                        showNotification('❌ Error: Geometría no creada', 'error');
                        this.layer.getSource().removeFeature(feature);
                        return;
                    }
                    
                    const properties = await this.showPropertyForm(null, 'Nuevo Condominio');
                    if (!properties) {
                        this.layer.getSource().removeFeature(feature);
                        showNotification('❌ Creación cancelada', 'warning');
                        return;
                    }
                    
                    const geometryGeoJSON = getGeometryGeoJSON(feature);
                    if (!geometryGeoJSON) {
                        throw new Error('No se pudo obtener la geometría');
                    }
                    
                    const data = {
                        geometry: geometryGeoJSON,
                        properties: properties
                    };
                    
                    console.log('📤 Creando:', data);
                    
                    const result = await callEditPHP('create', data);
                    
                    if (result.success) {
                        // Asignar el ID 
                        feature.set('id_1', result.id);
                        feature.setProperties(properties);
                        showNotification('✅ Condominio creado exitosamente', 'success');
                    } else {
                        throw new Error(result.error || 'Error al crear');
                    }
                    
                } catch (error) {
                    console.error('Error en create:', error);
                    showNotification('❌ Error al crear: ' + error.message, 'error');
                    if (this.layer.getSource().getFeatures().includes(feature)) {
                        this.layer.getSource().removeFeature(feature);
                    }
                }
                
                document.getElementById('btnCreate').classList.remove('active');
            }
            
            // Editar-----
            startEditing() {
                if (!this.selectedFeature) {
                    showNotification('⚠️ Selecciona un condominio para editar', 'warning');
                    return;
                }
                
                if (!this.layer.getVisible()) {
                    showNotification('❌ Activa la capa de Condominios', 'warning');
                    return;
                }
                
                this.cancelOperation();
                this.editMode = 'edit';
                
                const originalGeometry = this.selectedFeature.getGeometry().clone();
                
                const modify = new ol.interaction.Modify({
                    source: this.layer.getSource(),
                    features: new ol.Collection([this.selectedFeature])
                });
                
                let geometryModified = false;
                
                modify.on('modifyend', () => {
                    geometryModified = true;
                    showNotification('🔧 Geometría modificada, guarda los cambios', 'info', 2000);
                });
                
                this.map.addInteraction(modify);
                this.interactions.push(modify);
                
                updateInfoPanel('✏️ Editando', 'Modifica la geometría o haz clic en "Guardar" para editar atributos');
                showNotification('✏️ Edita la geometría arrastrando los vértices', 'info', 3000);
                
                const saveBtn = document.createElement('button');
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Guardar cambios';
                saveBtn.style.cssText = `
                    position: fixed;
                    bottom: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 12px 30px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    z-index: 9998;
                    box-shadow: 0 4px 16px rgba(40,167,69,0.4);
                    transition: all 0.2s;
                `;
                saveBtn.onmouseover = () => {
                    saveBtn.style.transform = 'translateX(-50%) scale(1.02)';
                    saveBtn.style.boxShadow = '0 6px 20px rgba(40,167,69,0.5)';
                };
                saveBtn.onmouseout = () => {
                    saveBtn.style.transform = 'translateX(-50%) scale(1)';
                    saveBtn.style.boxShadow = '0 4px 16px rgba(40,167,69,0.4)';
                };
                saveBtn.id = 'editSaveBtn';
                document.body.appendChild(saveBtn);
                
                const saveHandler = async () => {
                    document.getElementById('editSaveBtn')?.remove();
                    this.map.removeInteraction(modify);
                    
                    try {
                        const geometryGeoJSON = getGeometryGeoJSON(this.selectedFeature);
                        if (!geometryGeoJSON) {
                            throw new Error('No se pudo obtener la geometría');
                        }
                        
                        const currentProps = this.selectedFeature.getProperties();
                        const newProps = await this.showPropertyForm(currentProps, 'Editar Condominio');
                        
                        if (newProps) {
                            const data = {
                                geometry: geometryGeoJSON,
                                properties: newProps
                            };
                            
                            // Obtener el ID usando la función auxiliar
                            const currentId = getFeatureId(this.selectedFeature);
                            
                            //console.log('📤 Actualizando - ID:', currentId, 'Data:', data);
                            
                            if (!currentId) {
                                throw new Error('El polígono no tiene ID asignado');
                            }
                            
                            const result = await callEditPHP('update', data, currentId);
                            
                            if (result.success) {
                                this.selectedFeature.setProperties(newProps);
                                showNotification('✅ Condominio actualizado exitosamente', 'success');
                            } else {
                                throw new Error(result.error || 'Error al actualizar');
                            }
                        } else {
                            if (geometryModified) {
                                this.selectedFeature.setGeometry(originalGeometry);
                            }
                            showNotification('⏹️ Edición cancelada', 'warning');
                        }
                    } catch (error) {
                        console.error('Error en update:', error);
                        showNotification('❌ Error al actualizar: ' + error.message, 'error');
                        this.selectedFeature.setGeometry(originalGeometry);
                    }
                    
                    this.editMode = null;
                    document.getElementById('btnUpdate').classList.remove('active');
                    hideInfoPanel();
                };
                
                saveBtn.onclick = saveHandler;
                
                const escHandler = (e) => {
                    if (e.key === 'Escape') {
                        document.getElementById('editSaveBtn')?.remove();
                        this.map.removeInteraction(modify);
                        this.selectedFeature.setGeometry(originalGeometry);
                        this.editMode = null;
                        document.getElementById('btnUpdate').classList.remove('active');
                        hideInfoPanel();
                        showNotification('⏹️ Edición cancelada', 'warning');
                        document.removeEventListener('keydown', escHandler);
                    }
                };
                document.addEventListener('keydown', escHandler);
                
                document.getElementById('btnUpdate').classList.add('active');
                
                this._editCleanup = () => {
                    document.getElementById('editSaveBtn')?.remove();
                    this.map.removeInteraction(modify);
                };
            }
            
            // Eliminar ----------
            async deleteFeature() {
                if (!this.selectedFeature) {
                    showNotification('⚠️ Selecciona un condominio para eliminar', 'warning');
                    return;
                }
                
                if (!this.layer.getVisible()) {
                    showNotification('❌ Activa la capa de Condominios', 'warning');
                    return;
                }
                
                const nombre = this.selectedFeature.get('condominio') || 'Sin nombre';
                
                // Obtener el ID usando la función auxiliar
                const id = getFeatureId(this.selectedFeature);
                
                console.log('🔑 Eliminando - ID:', id, 'Nombre:', nombre);
                
                if (!id) {
                    showNotification('❌ Error: El polígono no tiene ID asignado', 'error');
                    console.error('❌ Feature sin ID:', this.selectedFeature.getProperties());
                    return;
                }
                
                if (!confirm(`¿Eliminar el condominio "${nombre}" (ID: ${id})?`)) {
                    return;
                }
                
                try {
                    const result = await callEditPHP('delete', null, id);
                    
                    if (result.success) {
                        this.layer.getSource().removeFeature(this.selectedFeature);
                        this.selectedFeature = null;
                        hideInfoPanel();
                        showNotification('✅ Condominio eliminado exitosamente', 'success');
                    } else {
                        throw new Error(result.error || 'Error al eliminar');
                    }
                } catch (error) {
                    console.error('Error en delete:', error);
                    showNotification('❌ Error al eliminar: ' + error.message, 'error');
                }
            }
            
            // ReUbicar------------------
            startMoving() {
                if (!this.selectedFeature) {
                    showNotification('⚠️ Selecciona un condominio para reubicar', 'warning');
                    return;
                }
                
                if (!this.layer.getVisible()) {
                    showNotification('❌ Activa la capa de Condominios', 'warning');
                    return;
                }
                
                // Obtener el ID usando la función auxiliar
                const featureId = getFeatureId(this.selectedFeature);
                
                console.log('🔑 Reubicando - ID:', featureId);
                
                if (!featureId) {
                    showNotification('❌ Error: El polígono no tiene ID asignado', 'error');
                    console.error('❌ Feature sin ID:', this.selectedFeature.getProperties());
                    return;
                }
                
                this.cancelOperation();
                this.editMode = 'move';
                this.isMoving = true;
                
                this.moveStartGeometry = this.selectedFeature.getGeometry().clone();
                this.selectedFeature.setStyle(style_moving);
                
                const translate = new ol.interaction.Translate({
                    features: new ol.Collection([this.selectedFeature])
                });
                
                let moved = false;
                
                translate.on('translatestart', () => {
                    moved = false;
                    updateInfoPanel('🔄 Moviendo', 'Arrastra el polígono a la nueva ubicación');
                    showNotification('🔄 Arrastra el polígono para reubicarlo', 'info', 2000);
                });
                
                translate.on('translating', () => {
                    moved = true;
                });
                
                translate.on('translateend', async () => {
                    if (moved) {
                        const confirm = await showConfirmMove(
                            this.selectedFeature,
                            this.moveStartGeometry
                        );
                        
                        if (confirm) {
                            try {
                                // Obtener el ID actual
                                const currentId = getFeatureId(this.selectedFeature);
                                
                                console.log('🔑 ID confirmado para reubicar:', currentId);
                                
                                if (!currentId) {
                                    throw new Error('El polígono no tiene ID asignado');
                                }
                                
                                const geometryGeoJSON = getGeometryGeoJSON(this.selectedFeature);
                                if (!geometryGeoJSON) {
                                    throw new Error('No se pudo obtener la geometría');
                                }
                                
                                const data = {
                                    geometry: geometryGeoJSON
                                };
                                
                                const result = await callEditPHP('move', data, currentId);
                                
                                if (result.success) {
                                    showNotification('✅ Condominio reubicado exitosamente', 'success');
                                    this.selectedFeature.setStyle(style_selected);
                                } else {
                                    throw new Error(result.error || 'Error al reubicar');
                                }
                            } catch (error) {
                                console.error('Error en move:', error);
                                showNotification('❌ Error al reubicar: ' + error.message, 'error');
                                this.selectedFeature.setGeometry(this.moveStartGeometry);
                                this.selectedFeature.setStyle(style_selected);
                            }
                        } else {
                            this.selectedFeature.setGeometry(this.moveStartGeometry);
                            this.selectedFeature.setStyle(style_selected);
                            showNotification('⏹️ Reubicación cancelada', 'warning');
                        }
                    } else {
                        this.selectedFeature.setStyle(style_selected);
                        showNotification('⏹️ Sin cambios', 'warning', 1500);
                    }
                    
                    this.map.removeInteraction(translate);
                    this.isMoving = false;
                    this.editMode = null;
                    document.getElementById('btnMove').classList.remove('active');
                    hideInfoPanel();
                });
                
                this.map.addInteraction(translate);
                this.interactions.push(translate);
                
                document.getElementById('btnMove').classList.add('active');
                updateInfoPanel('🔄 Modo Reubicación', 'Arrastra el polígono completo a la nueva ubicación');
            }
            
            // Cancdelar--------------
            cancelOperation() {
                if (this._editCleanup) {
                    this._editCleanup();
                    this._editCleanup = null;
                }
                
                this.interactions.forEach(inter => {
                    this.map.removeInteraction(inter);
                });
                this.interactions = [];
                
                if (this.modalInstance) {
                    this.modalInstance.close();
                    this.modalInstance = null;
                }
                
                if (this.isMoving && this.selectedFeature) {
                    this.selectedFeature.setStyle(style_selected);
                    if (this.moveStartGeometry) {
                        this.selectedFeature.setGeometry(this.moveStartGeometry);
                    }
                    this.isMoving = false;
                }
                
                this.editMode = null;
                hideInfoPanel();
                
                document.querySelectorAll('#edit-toolbar button.active').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                showNotification('⏹️ Operación cancelada', 'warning', 1500);
            }
            
            //Formulario ---------------------
            showPropertyForm(existingProps, title = 'Propiedades') {
                return new Promise(async (resolve) => {
                    const isEdit = existingProps !== null && existingProps !== undefined;
                    
                    const formHTML = `
                        <div class="form-group">
                            <label>ID (id_1):</label>
                            <input type="text" id="prop_id_1" value="${existingProps?.id_1 || ''}" disabled style="background:#f0f0f0;">
                            <small style="color:#666;font-size:11px;">El ID se asigna automáticamente</small>
                        </div>
                        
                        <div class="form-group">
                            <label>ID (campo id):</label>
                            <input type="text" id="prop_id" value="${existingProps?.id || ''}" placeholder="Opcional">
                        </div>
                        
                        <div class="form-group">
                            <label>Contrato:</label>
                            <input type="text" id="prop_contrato" value="${existingProps?.contrato || ''}" placeholder="Opcional">
                        </div>
                        
                        <div class="form-group">
                            <label>Condominio <span class="required">*</span>:</label>
                            <input type="text" id="prop_condominio" value="${existingProps?.condominio || ''}" 
                                   placeholder="Nombre del condominio" required>
                        </div>
                        
                        <div class="form-group">
                            <label>TM:</label>
                            <input type="text" id="prop_tm" value="${existingProps?.tm || ''}" placeholder="Opcional">
                        </div>
                        
                        <div class="form-group">
                            <label>Provisional:</label>
                            <input type="text" id="prop_provisional" value="${existingProps?.provisional || ''}" placeholder="Opcional">
                        </div>
                        
                        <div class="form-group">
                            <label>Anexos:</label>
                            <input type="text" id="prop_anexos" value="${existingProps?.anexos || ''}" placeholder="Opcional">
                        </div>
                        
                        <div class="form-group">
                            <label>Dirección:</label>
                            <input type="text" id="prop_direccion" value="${existingProps?.direccion || ''}" 
                                   placeholder="Dirección completa">
                        </div>
                        
                        <div class="form-group">
                            <label>Nivel:</label>
                            <input type="text" id="prop_nivel" value="${existingProps?.nivel || ''}" placeholder="Nivel">
                        </div>
                        
                        <div class="form-group">
                            <label>Fecha:</label>
                            <input type="date" id="prop_fecha" value="${existingProps?.fecha || new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div class="form-group">
                            <label>Mes:</label>
                            <select id="prop_mes">
                                ${Array.from({length: 12}, (_, i) => {
                                    const mes = String(i + 1).padStart(2, '0');
                                    const selected = existingProps?.mes == mes ? 'selected' : '';
                                    return `<option value="${mes}" ${selected}>${mes}</option>`;
                                }).join('')}
                            </select>
                        </div>
                        
                        <div class="form-actions">
                            <button class="btn-cancel" id="cancelProp">Cancelar</button>
                            <button class="btn-save" id="saveProp">${isEdit ? 'Actualizar' : 'Crear'}</button>
                        </div>
                    `;
                    
                    const modal = await createDraggableModal(title, formHTML);
                    this.modalInstance = modal;
                    
                    if (!modal) {
                        resolve(null);
                        return;
                    }
                    
                    document.getElementById('saveProp').onclick = () => {
                        const condominio = document.getElementById('prop_condominio').value.trim();
                        if (!condominio) {
                            showNotification('⚠️ El nombre del condominio es requerido', 'warning');
                            return;
                        }
                        
                        const properties = {
                            id: document.getElementById('prop_id').value || null,
                            contrato: document.getElementById('prop_contrato').value || null,
                            condominio: condominio,
                            tm: document.getElementById('prop_tm').value || null,
                            provisional: document.getElementById('prop_provisional').value || null,
                            anexos: document.getElementById('prop_anexos').value || null,
                            direccion: document.getElementById('prop_direccion').value || '',
                            nivel: document.getElementById('prop_nivel').value || '',
                            fecha: document.getElementById('prop_fecha').value || null,
                            mes: document.getElementById('prop_mes').value || ''
                        };
                        
                        modal.close();
                        this.modalInstance = null;
                        resolve(properties);
                    };
                    
                    document.getElementById('cancelProp').onclick = () => {
                        modal.close();
                        this.modalInstance = null;
                        resolve(null);
                    };
                    
                    setTimeout(() => {
                        const firstInput = modal.modal.querySelector('input:not([readonly])');
                        if (firstInput) firstInput.focus();
                    }, 100);
                });
            }
        }

      
        const editor = new CondominiosEditor(map, lyr_condominios);

      
        loadCondominios();

           let layerVisible = true;
        
        function updateLayerStatus() {
            const status = document.getElementById('layerStatus');
            if (lyr_condominios.getVisible()) {
                status.textContent = '🟢 Activa';
                status.className = 'layer-status';
            } else {
                status.textContent = '🔴 Inactiva';
                status.className = 'layer-status inactive';
            }
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'l' || e.key === 'L') {
                layerVisible = !layerVisible;
                lyr_condominios.setVisible(layerVisible);
                updateLayerStatus();
                showNotification(
                    `Capa ${layerVisible ? 'activada' : 'desactivada'}`,
                    'info', 1500
                );
            }
        });

   

        updateLayerStatus();