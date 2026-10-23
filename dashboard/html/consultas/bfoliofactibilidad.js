// Botón buscar
document.getElementById("btnBuscarFolio")
    .addEventListener("click", function () {

        let folio = document.getElementById("inputFolio").value.trim();

fetch("consultas/vpgrapds/b_vpgrapds.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ folio: folio })
})
.then(res => res.json())
.then(data => {

    if (data.success) {

        let archivo = data.ruta.replace("pdf/", "");

     document.getElementById("visorPDF").src =
    "consultas/vpgrapds/ver_pdf.php?folio=" + encodeURIComponent(folio);

        document.getElementById("modalPDF").style.display = "block";

    } else {
        alert(data.error);
    }

})
.catch(err => console.error(err));

    });


// Cerrar modal
function cerrarModalPDF() {
    document.getElementById("modalPDF").style.display = "none";
    document.getElementById("visorPDF").src = "";
}