// Variables para "Punitorios"
const puniSaldo = document.getElementById("puniSaldo");
const puniTasa = document.getElementById("puniTasa");
const puniDias = document.getElementById("puniDias");
const puniButton = document.querySelector("#puniButton");
const puniResultado = document.querySelector("#puniResultado");

// Variables para "Ingreso Pago"
const IPidCliente = document.querySelector("#IPidCliente");
const IPpago = document.querySelector("#IPpago");
const IPButton = document.querySelector("#IPButton");
const IPResultado = document.querySelector("#IPResultado");

// Variables para "Moroso"
const moroButton = document.querySelector("#moroButton");
const moroResultado = document.querySelector("#moroResultado");
let recordatorioButtons = null;

// Variables para "recordatorioDiv"
const recordatorioDiv = document.querySelector("#recordatorioDiv");
const cantRecord = document.querySelector("#cantRecord");

// Variable de control
let moroConsulted = false;
let IPConsulted = false;
// let getResultTotal = [];

// Url mock api
const clientesDB =
  "https://raw.githubusercontent.com/maurolmorales/ProyectoFinal_Morales/refs/heads/main/mockapi/clientes.json";
const cuentasDB =
  "https://raw.githubusercontent.com/maurolmorales/ProyectoFinal_Morales/refs/heads/main/mockapi/cuentas.json";
const pagosDB =
  "https://raw.githubusercontent.com/maurolmorales/ProyectoFinal_Morales/refs/heads/main/mockapi/pagos.json";

///////////   calcula el interés del punitorio por día.  ///////////////////////////////////////////////////////////////////

const calculoPunitorio = (saldo, tasa, dias) => {
  let fnResultado = 0;
  if (!saldo || !tasa || !dias) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "falta completar campos",
    });
  } else {
    fnResultado = Number(saldo * (tasa / 100 / 365) * dias).toLocaleString(
      "es-ES"
    );
  }

  return fnResultado
    ? (puniResultado.innerHTML = `<p>Resultado: $${fnResultado}</p>`)
    : (puniResultado.innerHTML = "");
};

/////////  devuelve un array de objetos de cliente cuyo status es de "moroso".  ////////////////////////////////////////////

const morosos = async () => {
  let data = await obtenerDatos(clientesDB);
  let cantidad = data.filter((cliente) => {
    return cliente.estado == "moroso";
  });
  return cantidad;
};

const pagos = async (id) => {
  let data = await obtenerDatos(pagosDB);
  let cantidad = data.filter((cliente) => {
    return cliente.cuentaId == id;
  });
  return cantidad;
};

const cuentas = async (idCliente) => {
  const data = await obtenerDatos(cuentasDB);
  return data.find((f) => f.id == idCliente);
};

const showMorosos = async () => {
  let getResultTotal = [];
  let cantidad = await morosos();
  let clienteMoro = await obtenerDatos(clientesDB);

  for (const m of cantidad) {
    let getResult = {};
    getResult.id = m.id;
    getResult.nombre = m.nombre;
    getResult.cuenta = await cuentas(m.id);
    getResult.pagos = await pagos(m.id);
    getResultTotal.push(getResult);
  }

  getResultTotal.forEach((e) => {
    let divRow = document.createElement("div");
    divRow.setAttribute("class", "morososDivChildren");
    let divCliente = document.createElement("div");
    divCliente.innerText = `ID: ${e.id} Cliente: ${e.nombre}`;
    let divCuenta = document.createElement("div");
    divCuenta.innerText = `Saldo Pendiente: ${e.cuenta.saldo_pendiente} Estado: ${e.cuenta.estado}`;
    let divPago = document.createElement("div");
    divPago.innerText = `Fecha Pago: ${e.pagos[0].fecha_pago} Monto: ${e.pagos[0].monto}`;
    let divMemo = document.createElement("div");
    divMemo.innerHTML = `<button class="recordatorio" id="${e.id}"}> Recordatorio </button>`;
    divRow.appendChild(divCliente);
    divRow.appendChild(divCuenta);
    divRow.appendChild(divPago);
    divRow.appendChild(divMemo);
    moroResultado.appendChild(divRow);
  });

  moroConsulted = true;

  recordatorioButtons = document.querySelectorAll(".recordatorio");
  recordatorioButtons.forEach((button) => {
    // console.log("botones", button);
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      let clienteFound = clienteMoro.find((c) => c.id == Number(e.target.id));
      let cuentaFound = await cuentas(Number(e.target.id));

      // console.log('cuentaFound: ', cuentaFound)
      // console.log('muestra: ', clienteFound)
      let dataRecord = {
        id: clienteFound.id,
        nombre: clienteFound.nombre,
        telefono: clienteFound.telefono,
        mail: clienteFound.email,
        pendiente: cuentaFound.saldo_pendiente,
      };
      recordatorio(dataRecord);
    });
  });
};

///////////  gestiona el ingreso de un pago a un cliente determinado.  /////////////////////////////////////////////////////

const ingresoPago = async (idCliente, pago) => {
  let respuesta;
  let data = await obtenerDatos(cuentasDB);

  if (!idCliente || !pago) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "falta completar campos",
    });
  }

  let clientePago = data.find((cliente) => {
    return cliente.id == idCliente;
  });
  if (!clientePago) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "no existe cliente con id suministrado",
    });
  }

  data.saldo_pendiente - pago == 0
    ? (respuesta = "Deuda Cancelada")
    : clientePago.saldo_pendiente - pago > 0
    ? (respuesta = `Queda por abonar $${clientePago.saldo_pendiente - pago}`)
    : (respuesta = `Saldo sobrante en crédito de ${
        clientePago.saldo_pendiente - pago
      }`);

  let divRow = document.createElement("div");
  divRow.setAttribute("class", "morososDivChildren");

  let pagoRow = document.createElement("div");
  pagoRow.innerText = ` Se ingresó $${pago}.`;

  let restoRow = document.createElement("div");
  restoRow.innerText = ` ${respuesta}`;
  divRow.appendChild(pagoRow);
  divRow.appendChild(restoRow);
  IPResultado.appendChild(divRow);
  IPConsulted = true;
  // return respuesta;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const obtenerDatos = (data) => {
  let result = fetch(data)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error: ", error));
  return result;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const recordatorio = (data) => {
  if (data) {
    let getData = JSON.parse(localStorage.getItem("recordatorio"));
    // console.log("gtData: ", getData);

    if (!getData) {
      let jsonData = JSON.stringify([data]);
      localStorage.setItem("recordatorio", jsonData);
      showRecordatorio();
    } else {
      let searchEqual = getData.find((d) => d.id == data.id);
      if (searchEqual) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ya fue guardado el recordatorio",
        });
      } else {
        getData.push(data);
        let jsonData = JSON.stringify(getData);
        localStorage.setItem("recordatorio", jsonData);
        showRecordatorio();
      }
    }
  }
};

const showRecordatorio = () => {
  let getData = JSON.parse(localStorage.getItem("recordatorio"));
  recordatorioDiv.innerHTML = "";
  cantRecord.innerHTML = "";
  if (getData)
    getData.forEach((r) => {
      let divRecord = document.createElement("div");
      divRecord.innerText = `Nombre: ${r.nombre} - telefono: ${r.telefono}- pendiente: $${r.pendiente}`;
      recordatorioDiv.appendChild(divRecord);
      cantRecord.innerText = getData.length;
    });
};

////  Muestra los recordatorios al inicio  //////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", showRecordatorio);

///////  Botones ////////////////////////////////////////////////////////////////////////////////////////////////////

moroButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!moroConsulted) {
    showMorosos();
  }
  // console.log("click");
});

puniButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculoPunitorio(puniSaldo.value, puniTasa.value, puniDias.value);
  // console.log("click");
});

IPButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!IPConsulted) {
    ingresoPago(IPidCliente.value, IPpago.value);
  }
  // console.log("click");
});
