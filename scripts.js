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

function guardarValoresDiarios() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}-${mm}-${yyyy}`;

  const totals = {
    fecha: formattedDate,
    secoTotal: valoresSeco.reduce((a, b) => a + b, 0),
    fiambreriaTotal: valoresFiambreria.reduce((a, b) => a + b, 0),
    panVegTotal: valoresPanVeg.reduce((a, b) => a + b, 0),
    carnesTotal: valoresCarnes.reduce((a, b) => a + b, 0),
    congeladoTotal: valoresCongelado.reduce((a, b) => a + b, 0),
    totalFactor: Math.round(valoresSeco.reduce((a, b) => a + b, 0) * 0.6 +
                            valoresFiambreria.reduce((a, b) => a + b, 0) * 0.7 +
                            valoresPanVeg.reduce((a, b) => a + b, 0) * 1 +
                            valoresCarnes.reduce((a, b) => a + b, 0) * 1.3 +
                            valoresCongelado.reduce((a, b) => a + b, 0) * 1.5),
    totalCajas: valoresSeco.reduce((a, b) => a + b, 0) +
                valoresFiambreria.reduce((a, b) => a + b, 0) +
                valoresPanVeg.reduce((a, b) => a + b, 0) +
                valoresCarnes.reduce((a, b) => a + b, 0) +
                valoresCongelado.reduce((a, b) => a + b, 0)
  };

  const storedData = JSON.parse(localStorage.getItem('accumulatedValues')) || [];
  storedData.push(totals);
  localStorage.setItem('accumulatedValues', JSON.stringify(storedData));
}

function exportarExcel() {
  const wb = XLSX.utils.book_new();
  const ws_data = [["Fecha", "Cámara", "Total", "Total Factor", "Total Cajas"]];

  const storedData = JSON.parse(localStorage.getItem('accumulatedValues')) || [];
  storedData.forEach(data => {
    ws_data.push([data.fecha, "Seco", data.secoTotal, "", ""]);
    ws_data.push([data.fecha, "Fiambrería", data.fiambreriaTotal, "", ""]);
    ws_data.push([data.fecha, "Pan/Veg", data.panVegTotal, "", ""]);
    ws_data.push([data.fecha, "Carnes", data.carnesTotal, "", ""]);
    ws_data.push([data.fecha, "Congelado", data.congeladoTotal, "", ""]);
    ws_data.push([data.fecha, "", "", data.totalFactor, data.totalCajas]);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  XLSX.utils.book_append_sheet(wb, ws, "Detalle");

  // Descargar el archivo Excel con la fecha actual en el nombre
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}${mm}${yyyy}`;

  XLSX.writeFile(wb, `detalle_calculadora_${formattedDate}.xlsx`);
}
