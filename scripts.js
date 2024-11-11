let valoresSeco = [];
let valoresFiambreria = [];
let valoresPanVeg = [];
let valoresCarnes = [];
let valoresCongelado = [];

function guardarValores() {
  const totals = document.getElementsByClassName('total');

  if (totals[0].value) {
    valoresSeco.push(parseInt(totals[0].value));
    document.getElementById('secoTotal').innerHTML = `${valoresSeco.join(" + ")} = <strong>${valoresSeco.reduce((a, b) => a + b, 0)}</strong>`;
  }

  if (totals[1].value) {
    valoresFiambreria.push(parseInt(totals[1].value));
    document.getElementById('fiambreriaTotal').innerHTML = `${valoresFiambreria.join(" + ")} = <strong>${valoresFiambreria.reduce((a, b) => a + b, 0)}</strong>`;
  }

  if (totals[2].value) {
    valoresPanVeg.push(parseInt(totals[2].value));
    document.getElementById('panVegTotal').innerHTML = `${valoresPanVeg.join(" + ")} = <strong>${valoresPanVeg.reduce((a, b) => a + b, 0)}</strong>`;
  }

  if (totals[3].value) {
    valoresCarnes.push(parseInt(totals[3].value));
    document.getElementById('carnesTotal').innerHTML = `${valoresCarnes.join(" + ")} = <strong>${valoresCarnes.reduce((a, b) => a + b, 0)}</strong>`;
  }

  if (totals[4].value) {
    valoresCongelado.push(parseInt(totals[4].value));
    document.getElementById('congeladoTotal').innerHTML = `${valoresCongelado.join(" + ")} = <strong>${valoresCongelado.reduce((a, b) => a + b, 0)}</strong>`;
  }

  const totalCajas = valoresSeco.reduce((a, b) => a + b, 0) +
                     valoresFiambreria.reduce((a, b) => a + b, 0) +
                     valoresPanVeg.reduce((a, b) => a + b, 0) +
                     valoresCarnes.reduce((a, b) => a + b, 0) +
                     valoresCongelado.reduce((a, b) => a + b, 0);

  const totalFactor = valoresSeco.reduce((a, b) => a + b, 0) * 0.6 +
                      valoresFiambreria.reduce((a, b) => a + b, 0) * 0.7 +
                      valoresPanVeg.reduce((a, b) => a + b, 0) * 1 +
                      valoresCarnes.reduce((a, b) => a + b, 0) * 1.3 +
                      valoresCongelado.reduce((a, b) => a + b, 0) * 1.5;

  document.getElementById('total').textContent = `Total factor: ${Math.round(totalFactor)}`;
  document.getElementById('totalCajas').textContent = `Total cajas: ${totalCajas}`;

  // Guardar los valores diarios en el almacenamiento local
  guardarValoresDiarios();

  // Limpiar los campos
  clearFields();
}

function clearFields() {
  const totals = document.querySelectorAll('.total');
  totals.forEach((input, index) => {
    input.value = '';
  });
}


function exportarExcel() {
  console.log("Iniciando la exportación a Excel...");
  try {
    // Crear un nuevo libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Encabezados de la hoja
    const ws_data = [["Fecha", "Cámara", "Total", "Total Factor", "Total Cajas"]];

    // Obtener los datos acumulados del almacenamiento local
    const storedData = JSON.parse(localStorage.getItem('accumulatedValues')) || [];

    // Agregar los datos al array ws_data
    storedData.forEach(data => {
      ws_data.push([data.fecha, "Seco", data.secoTotal, "", ""]);
      ws_data.push([data.fecha, "Fiambrería", data.fiambreriaTotal, "", ""]);
      ws_data.push([data.fecha, "Pan/Veg", data.panVegTotal, "", ""]);
      ws_data.push([data.fecha, "Carnes", data.carnesTotal, "", ""]);
      ws_data.push([data.fecha, "Congelado", data.congeladoTotal, "", ""]);
      ws_data.push([data.fecha, "", "", data.totalFactor, data.totalCajas]);
    });

    // Crear una hoja de Excel con los datos
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Detalle");

    // Obtener la fecha actual en formato DDMMYYYY
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}${mm}${yyyy}`;

    // Descargar el archivo Excel con la fecha actual en el nombre
    XLSX.writeFile(wb, `detalle_calculadora_${formattedDate}.xlsx`);

    console.log("Archivo exportado exitosamente.");
  } catch (error) {
    console.error("Error durante la exportación a Excel:", error);
  }
}

