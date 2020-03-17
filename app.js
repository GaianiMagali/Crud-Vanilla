//VARIABLES GLOBALES

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');


let arrayActividades = [];


//FUNCIONES

const crearItem = (actividad) => {

    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);
    return item;
}

const guardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    pintarDB();
};

const pintarDB = () => {
    listaActividadesUI.innerHTML = ' ';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {

            if (element.estado) {
                listaActividadesUI.innerHTML += ` <div class="alert alert-success" role="alert">
                <i class="material-icons float-left mr-2">accessibility</i>
                <!-- Para poner en negrita el texto -->
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-right"><i class="material-icons">done</i>
                <i class="material-icons">delete</i></span></div>`
            } else {
                listaActividadesUI.innerHTML += ` <div class="alert alert-danger" role="alert">
                <i class="material-icons float-left mr-2">accessibility</i>
                <!-- Para poner en negrita el texto -->
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-right"><i class="material-icons">done</i>
                <i class="material-icons">delete</i></span></div>`
            };
        });
    };
};

const eliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((element, index) => {
        if (element.actividad === actividad) {
            indexArray = index;
        }
    });
    arrayActividades.splice(indexArray, 1);
    guardarDB();
}

const editarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((element) =>
        element.actividad === actividad
    );
    arrayActividades[indexArray].estado = true;
    guardarDB();
}

//EVENTLISTENER

formularioUI.addEventListener('submit', (e) => {
    //Para que no nos refresque el sitio web
    e.preventDefault();
    //Leer el input
    let actividadUi = document.querySelector("#actividad").value;

    //Reiniciiar el formulario
    formularioUI.reset();

    crearItem(actividadUi);
    guardarDB();
});

document.addEventListener('DOMContentLoaded', pintarDB);

listaActividadesUI.addEventListener('click', (e) => {
    //Para que nuestro sitio haga lo que escribiremos a continuacion
    e.preventDefault();

    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let texto = e.path[2].childNodes[5].innerHTML;
        //console.log(e);
        if (e.target.innerHTML === 'delete') {
            eliminarDB(texto);
        }

        if (e.target.innerHTML === 'done') {
            editarDB(texto);

        }
    };
});
