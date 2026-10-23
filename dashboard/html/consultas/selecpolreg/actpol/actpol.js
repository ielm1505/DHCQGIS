
let ultimaLista = [];


const panel = document.getElementById("panelResultados");
const header = document.getElementById("panelHeader");




document.addEventListener("DOMContentLoaded", () => {

    const panel = document.getElementById("panelResultados");
    const header = document.getElementById("panelHeader");
    const btnCerrar = document.getElementById("btnCerrarPanel");

    let drag = false,
        offsetX = 0,
        offsetY = 0;

    header.onmousedown = e => {

        if(e.target.id === "btnCerrarPanel") return;

        drag = true;

        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    };

    document.onmousemove = e => {

        if(drag){

            panel.style.left = (e.clientX - offsetX) + "px";
            panel.style.top  = (e.clientY - offsetY) + "px";
        }
    };

    document.onmouseup = () => drag = false;

    btnCerrar.onclick = () => {

        panel.style.display = "none";
    };

});

function cambiarTab(tab){
    const tabs =
        document.querySelectorAll(
            ".tab"
        );
    tabs.forEach(t=>{
        t.classList.remove(
            "active"
        );
    });

    if(tab==="lista"){
        tabs[0]
        .classList
        .add("active");
        document.getElementById(
            "contenidoLista"
        ).style.display =
            "block";
        document.getElementById(
            "contenidoDetalle"
        ).style.display =
            "none";
    }
    else{

        tabs[1]
        .classList
        .add("active");
        document.getElementById(
            "contenidoLista"
        ).style.display =
            "none";
        document.getElementById(
            "contenidoDetalle"
        ).style.display =
            "block";

    }

}

async function consultarAfectacion(){

    const input =
        document.getElementById("idAfectacion");
    if(!input){alert("No existe input ID");return;}
    const id = input.value;
    if(!id){alert( "Ingrese ID" );return;}

    fuenteAfectacion.clear();
    vectorSeleccion.clear();
    seleccionados = [];
    clonesSeleccion = {};

    if(panel){ panel.style.display = "block";  }
    document.getElementById(
        "contenidoLista"
    ).innerHTML =
        "Consultando...";

    try{
        const res = await fetch(
            `consulta_afectacion_edit.php?id=${id}`
        );
        const data =
            await res.json();
        if(!data.length){
            document.getElementById(
                "contenidoLista"
            ).innerHTML =
                "Sin resultados";
            return;
        }

        ultimaLista = data;
        let html = "";
        data.forEach(row=>{
            html += `
                <div
                    class="listaAfectacion"
                    onclick="
                        mostrarDetalle(
                            ${row.id_afectacion}
                        )
                    "
                >
                    <b>ID:</b>
                    ${row.id_afectacion}
                    <br><br>
                    <b>Tipo:</b>
                    ${row.tipo || ''}
                    <br><br>
                    <b>Estatus:</b>
                    ${row.estatus || ''}
                </div>
            `;
            if(row.geom){
                try{
                    let geo =
                        row.geom;
                    if(
                        typeof geo ===
                        "string"
                    ){
                        geo =
                            JSON.parse(
                                geo
                            );
                    }
                    const formato =
                        new ol.format.GeoJSON();
                    const feature =
                        formato.readFeature(
                            geo
                        );
                    feature
                    .getGeometry()
                    .transform(
                        "EPSG:32616",
                        "EPSG:3857"
                    );
                    console.log(
                        "EXTENT 3857:",
                        feature
                        .getGeometry()
                        .getExtent()
                    );

                    cargarGeometriaAfectacion(
                        feature
                    );
                }catch(err){

                    console.error(
                        "ERROR GEOMETRIA:",
                        err
                    );

                }

            }

        });
        document.getElementById(
            "contenidoLista"
        ).innerHTML =html;const extent =fuenteAfectacion.getExtent();

        if(
            extent &&
            extent[0] !== Infinity
        ){

            map.getView().fit(

                extent,

                {  padding:[50,50,50,50], maxZoom:17, duration:1000 }
            );
        }

    }catch(err){
        console.error(
            "ERROR CONSULTA:",
            err
        );
        document.getElementById(
            "contenidoLista"
        ).innerHTML =
            "Error consulta";
    }
}

function mostrarDetalle(id){
    const row =
        ultimaLista.find(r =>r.id_afectacion == id);

    if(!row)
        return;

    document.getElementById("contenidoDetalle").innerHTML = `

        <h3>
            Detalle Afectación
        </h3>
        <table>
            <tr>
                <th>ID</th>
                <td>
                    ${row.id_afectacion}
                </td>
            </tr>
            <tr>
                <th>Tipo</th>
                <td>
                    ${row.tipo || ''}
                </td>
            </tr>
            <tr>
                <th>Estatus</th>
                <td>
                    ${row.estatus || ''}
                </td>
            </tr>
            <tr>
                <th>Descripción</th>
                <td>
                    ${row.descripcion || ''}
                </td>
            </tr>
            <tr>
                <th>Usuario</th>
                <td>
                    ${row.usuario || ''}
                </td>
            </tr>
            <tr>
                <th>Fecha Inicio</th>
                <td>
                    ${row.fecha_inicio || ''}
                </td>
            </tr>
            <tr>
                <th>Fecha Fin</th>
                <td>
                    ${row.fecha_fin || ''}
                </td>
            </tr>
        </table>
    `;
    cambiarTab(
        "detalle"
    );
}
