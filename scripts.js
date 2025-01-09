let valoresSeco = [];
let valoresFiambreria = [];
let valoresPanVeg = [];
let valoresCarnes = [];
let valoresCongelado = [];

function guardarValores() {
  const totals = document.getElementsByClassName('total'); // Inputs de valores
  const factors = [0.6, 0.7, 1, 1.3, 1.5]; // Factores de las categorías

  // Variables para acumular totales
  let totalCajas = 0; // Suma de los valores ingresados
  let totalFactor = 0; // Suma de valores multiplicados por factores

  // Procesar los valores de cada fila
  for (let i = 0; i < totals.length; i++) {
    if (totals[i].value) {
      const value = parseFloat(totals[i].value); // Convertir a número decimal
      const factor = factors[i];
      const calculatedValue = value * factor;

      // Guardar el valor ingresado en el arreglo correspondiente
      switch (i) {
        case 0:
          valoresSeco.push(value);
          document.getElementById('secoTotal').innerHTML = `${valoresSeco.join(" + ")} = <strong>${valoresSeco.reduce((a, b) => a + b, 0)}</strong>`;
          break;
        case 1:
          valoresFiambreria.push(value);
          document.getElementById('fiambreriaTotal').innerHTML = `${valoresFiambreria.join(" + ")} = <strong>${valoresFiambreria.reduce((a, b) => a + b, 0)}</strong>`;
          break;
        case 2:
          valoresPanVeg.push(value);
          document.getElementById('panVegTotal').innerHTML = `${valoresPanVeg.join(" + ")} = <strong>${valoresPanVeg.reduce((a, b) => a + b, 0)}</strong>`;
          break;
        case 3:
          valoresCarnes.push(value);
          document.getElementById('carnesTotal').innerHTML = `${valoresCarnes.join(" + ")} = <strong>${valoresCarnes.reduce((a, b) => a + b, 0)}</strong>`;
          break;
        case 4:
          valoresCongelado.push(value);
          document.getElementById('congeladoTotal').innerHTML = `${valoresCongelado.join(" + ")} = <strong>${valoresCongelado.reduce((a, b) => a + b, 0)}</strong>`;
          break;
      }

      // Actualizar los totales generales
      totalCajas += value; // Sumar directamente los valores ingresados
      totalFactor += calculatedValue; // Sumar los valores multiplicados por su factor
    }
  }

  // Mostrar los totales generales
  document.getElementById('total').textContent = `Total factor: ${totalFactor.toFixed(2)}`; // Mostrar hasta dos decimales
  document.getElementById('totalCajas').textContent = `Total cajas: ${totalCajas.toFixed(2)}`; // Mostrar hasta dos decimales

  // Guardar en almacenamiento local
  guardarValoresDiarios();

  // Limpiar los campos
  clearFields();
}

function clearFields() {
  const totals = document.querySelectorAll('.total');
  totals.forEach(input => {
    input.value = ''; // Vaciar cada campo de entrada
  });
}
