// Extensión inicial del mapa
const initialExtent = [-9721006.851803, 2335340.663016, -9631497.001877, 2425218.136975];

// Historial de vistas
let viewHistory = [];
let currentViewIndex = -1;

// Guardar vistas cuando cambia el centro o resolución
map.getView().on('change:center', saveViewState);
map.getView().on('change:resolution', saveViewState);

function saveViewState() {
    const view = map.getView();
    const center = view.getCenter().slice();
    const zoom = view.getZoom();
    if (currentViewIndex === -1 || center.toString() !== viewHistory[currentViewIndex]?.center.toString()) {
        viewHistory = viewHistory.slice(0, currentViewIndex + 1);
        viewHistory.push({ center, zoom });
        currentViewIndex = viewHistory.length - 1;
    }
}

// 🔙 Zoom Anterior
document.getElementById('zoom-prev').addEventListener('click', () => {
    if (currentViewIndex > 0) {
        currentViewIndex--;
        const prev = viewHistory[currentViewIndex];
        map.getView().setCenter(prev.center);
        map.getView().setZoom(prev.zoom);
    }
});

// 🔲 Zoom por Ventana (Zoom Box)
const dragZoom = new ol.interaction.DragZoom({
    condition: ol.events.condition.always
});

dragZoom.on('boxend', () => {
    // Desactiva automáticamente después de hacer el zoom
    map.removeInteraction(dragZoom);
    zoomBoxActive = false;
    // Opcional: cambia estilo visual del botón para reflejar desactivación
    document.getElementById('zoom-box').classList.remove('active');
});

let zoomBoxActive = false;

document.getElementById('zoom-box').addEventListener('click', () => {
    zoomBoxActive = !zoomBoxActive;
    if (zoomBoxActive) {
        map.addInteraction(dragZoom);
        document.getElementById('zoom-box').classList.add('active');
    } else {
        map.removeInteraction(dragZoom);
        document.getElementById('zoom-box').classList.remove('active');
    }
});

// 🏠 Zoom Inicial
document.getElementById('zoom-home').addEventListener('click', () => {
    map.getView().fit(initialExtent, { size: map.getSize() });
});

(function () {
    const zoomMenu = document.getElementById('zoom-menu');
    const dragHeader = zoomMenu.querySelector('.drag-header');
    const cerrarBtn = document.getElementById('cerrar-menu');

    let isDragging = false;
    let offsetX, offsetY;

    // Mostrar menú al hacer clic en "Zoom"
    window.zoom = function () {
        zoomMenu.style.display = 'flex';
    };

    // Cerrar menú
    cerrarBtn.addEventListener('click', () => {
        zoomMenu.style.display = 'none';
    });

    // Drag con mouse
    dragHeader.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        offsetX = e.clientX - zoomMenu.offsetLeft;
        offsetY = e.clientY - zoomMenu.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            zoomMenu.style.left = `${e.clientX - offsetX}px`;
            zoomMenu.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch
    dragHeader.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - zoomMenu.offsetLeft;
        offsetY = touch.clientY - zoomMenu.offsetTop;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            zoomMenu.style.left = `${touch.clientX - offsetX}px`;
            zoomMenu.style.top = `${touch.clientY - offsetY}px`;
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
})();
