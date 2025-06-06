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
let getResultTotal = [];

// Emulación de DB.
const clientesDB = [
  {
    id: 1,
    nombre: "Juan Pérez",
    dni: "30123456",
    telefono: "1156781234",
    email: "juan.perez@mail.com",
    direccion: "Av. Rivadavia 1234, CABA",
    estado: "activo",
    fecha_alta: "2024-11-15",
  },
  {
    id: 2,
    nombre: "María Gómez",
    dni: "28900123",
    telefono: "1165439876",
    email: "maria.gomez@mail.com",
    direccion: "Calle Falsa 123, La Plata",
    estado: "moroso",
    fecha_alta: "2023-08-01",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    dni: "34567890",
    telefono: "1134598273",
    email: "carlos.r@mail.com",
    direccion: "San Martín 789, Córdoba",
    estado: "activo",
    fecha_alta: "2022-12-12",
  },
  {
    id: 4,
    nombre: "Lucía Fernández",
    dni: "31234567",
    telefono: "1178912345",
    email: "lucia.fernandez@mail.com",
    direccion: "Mitre 456, Mendoza",
    estado: "moroso",
    fecha_alta: "2023-04-25",
  },
  {
    id: 5,
    nombre: "Ricardo López",
    dni: "29876543",
    telefono: "1167894321",
    email: "ricardo.lopez@mail.com",
    direccion: "Belgrano 321, Rosario",
    estado: "activo",
    fecha_alta: "2024-01-03",
  },
  {
    id: 6,
    nombre: "Sofía Martínez",
    dni: "33456789",
    telefono: "1198761234",
    email: "sofia.martinez@mail.com",
    direccion: "Sarmiento 999, Mar del Plata",
    estado: "activo",
    fecha_alta: "2023-10-10",
  },
  {
    id: 7,
    nombre: "Diego Ramírez",
    dni: "30111222",
    telefono: "1122334455",
    email: "diego.ramirez@mail.com",
    direccion: "Alsina 2020, Salta",
    estado: "moroso",
    fecha_alta: "2023-06-20",
  },
  {
    id: 8,
    nombre: "Camila Torres",
    dni: "32222333",
    telefono: "1144556677",
    email: "camila.torres@mail.com",
    direccion: "Urquiza 4040, Neuquén",
    estado: "activo",
    fecha_alta: "2022-09-05",
  },
];

const cuentasDB = [
  {
    id: 1,
    clienteId: 1,
    fecha_emision: "2024-11-20",
    monto_total: 100000,
    monto_pagado: 60000,
    saldo_pendiente: 40000,
    cuotas: 10,
    estado: "vigente",
  },
  {
    id: 2,
    clienteId: 2,
    fecha_emision: "2023-08-15",
    monto_total: 50000,
    monto_pagado: 10000,
    saldo_pendiente: 40000,
    cuotas: 5,
    estado: "en mora",
  },
  {
    id: 3,
    clienteId: 3,
    fecha_emision: "2023-01-10",
    monto_total: 75000,
    monto_pagado: 75000,
    saldo_pendiente: 0,
    cuotas: 10,
    estado: "cancelado",
  },
  {
    id: 4,
    clienteId: 4,
    fecha_emision: "2023-05-05",
    monto_total: 30000,
    monto_pagado: 5000,
    saldo_pendiente: 25000,
    cuotas: 6,
    estado: "en mora",
  },
  {
    id: 5,
    clienteId: 5,
    fecha_emision: "2024-01-10",
    monto_total: 60000,
    monto_pagado: 30000,
    saldo_pendiente: 30000,
    cuotas: 6,
    estado: "vigente",
  },
  {
    id: 6,
    clienteId: 6,
    fecha_emision: "2023-10-20",
    monto_total: 45000,
    monto_pagado: 45000,
    saldo_pendiente: 0,
    cuotas: 3,
    estado: "cancelado",
  },
  {
    id: 7,
    clienteId: 7,
    fecha_emision: "2023-06-25",
    monto_total: 70000,
    monto_pagado: 20000,
    saldo_pendiente: 50000,
    cuotas: 7,
    estado: "en mora",
  },
  {
    id: 8,
    clienteId: 8,
    fecha_emision: "2022-10-01",
    monto_total: 90000,
    monto_pagado: 90000,
    saldo_pendiente: 0,
    cuotas: 9,
    estado: "cancelado",
  },
];

const pagosDB = [
  {
    id: 1,
    cuentaId: 1,
    fecha_pago: "2024-12-01",
    monto: 20000,
    medio_pago: "transferencia",
  },
  {
    id: 2,
    cuentaId: 1,
    fecha_pago: "2025-01-01",
    monto: 40000,
    medio_pago: "efectivo",
  },
  {
    id: 3,
    cuentaId: 2,
    fecha_pago: "2023-09-01",
    monto: 10000,
    medio_pago: "transferencia",
  },
  {
    id: 4,
    cuentaId: 3,
    fecha_pago: "2023-12-15",
    monto: 75000,
    medio_pago: "tarjeta",
  },
  {
    id: 5,
    cuentaId: 4,
    fecha_pago: "2023-06-01",
    monto: 5000,
    medio_pago: "efectivo",
  },
  {
    id: 6,
    cuentaId: 5,
    fecha_pago: "2024-02-01",
    monto: 30000,
    medio_pago: "transferencia",
  },
  {
    id: 7,
    cuentaId: 6,
    fecha_pago: "2023-11-01",
    monto: 45000,
    medio_pago: "tarjeta",
  },
  {
    id: 8,
    cuentaId: 7,
    fecha_pago: "2023-07-15",
    monto: 20000,
    medio_pago: "efectivo",
  },
  {
    id: 9,
    cuentaId: 8,
    fecha_pago: "2023-01-10",
    monto: 90000,
    medio_pago: "transferencia",
  },
];




///////////   calcula el interés del punitorio por día.  ///////////////////////////////////////////////////////////////////

const calculoPunitorio = (saldo, tasa, dias) => {
  let fnResultado = 0;
  if (!saldo || !tasa || !dias) {
    alert("falta completar campos");
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

const morosos = () => {
  let cantidad = clientesDB.filter((cliente) => {
    return cliente.estado == "moroso";
  });
  return cantidad;
};

const pagos = (id) => {
  let cantidad = pagosDB.filter((cliente) => {
    return cliente.cuentaId == id;
  });
  return cantidad;
};

const cuentas = (idCliente, db = cuentasDB) => {
  let cantidad = db.find((f) => {
    return f.id === idCliente;
  });
  return cantidad;
};

const showMorosos = () => {
  let cantidad = morosos();

  cantidad.map((m) => {
    let getResult = {};
    getResult.id = m.id;
    getResult.nombre = m.nombre;
    getResult.cuenta = cuentas(m.id);
    getResult.pagos = pagos(m.id);

    return getResultTotal.push(getResult);
  });

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

  console.log("morosos: ", getResultTotal);
  moroConsulted = true;

  recordatorioButtons = document.querySelectorAll(".recordatorio");
  recordatorioButtons.forEach((button) => {
    console.log("botones", button);
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let clienteFound = cuentas(Number(e.target.id), clientesDB);
      let cuentaFound = cuentas(Number(e.target.id));
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
 
const ingresoPago = (idCliente, pago) => {
  let respuesta;

  if (!idCliente || !pago) {
    return alert("falta completar campos");
  }

  let cliente = cuentasDB.find((cliente) => {
    return cliente.id == idCliente;
  });
  if (!cliente) {
    return alert((respuesta = "no existe cliente con id suministrado"));
  }

  cuentasDB.saldo_pendiente - pago == 0
    ? (respuesta = "Deuda Cancelada")
    : cliente.saldo_pendiente - pago > 0
    ? (respuesta = `Queda por abonar $${cliente.saldo_pendiente - pago}`)
    : (respuesta = `Saldo sobrante en crédito de ${
        cliente.saldo_pendiente - pago
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

const recordatorio = (data) => {
  if (data) {
    let getData = JSON.parse(localStorage.getItem("recordatorio"));
    console.log("gtData: ", getData);

    if (!getData) {
      let jsonData = JSON.stringify([data]);
      localStorage.setItem("recordatorio", jsonData);
      showRecordatorio()
    } else {
        let searchEqual = getData.find(d=>d.id == data.id)  
        if (searchEqual) {
          return alert("ya fue guardado el recordatorio")
        }else{
          getData.push(data);
          let jsonData = JSON.stringify(getData);
          localStorage.setItem("recordatorio", jsonData);
          showRecordatorio()  
        }
    }
  }
};


const showRecordatorio = ()=>{
  let getData = JSON.parse(localStorage.getItem("recordatorio"));
  recordatorioDiv.innerHTML = '';
  cantRecord.innerHTML='';
  getData.forEach(r =>{
    let divRecord = document.createElement("div")
    divRecord.innerText = `Nombre: ${r.nombre} - telefono: ${r.telefono}- pendiente: $${r.pendiente}`
    recordatorioDiv.appendChild(divRecord)
  })
  cantRecord.innerText = getData.length
}





////  Muestra los recordatorios al inicio  //////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", showRecordatorio)





///////  Botones ////////////////////////////////////////////////////////////////////////////////////////////////////

moroButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!moroConsulted) {
    showMorosos();
  }
  console.log("click");
});

puniButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculoPunitorio(puniSaldo.value, puniTasa.value, puniDias.value);
  console.log("click");
});

IPButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!IPConsulted) {
    ingresoPago(IPidCliente.value, IPpago.value);
  }
  console.log("click");
});
