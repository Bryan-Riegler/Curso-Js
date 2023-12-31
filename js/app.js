//La idea de este proyecto es hacer una especie de "app" para guardar rutas o crear rutas nuevas para navegacion en avion, partiendo desde Olavarria (donde vivo) y tomando por ahora pocos datos. La  idea para mostar los datos en un futuro seria tipo una tabla donde en cada columna se muestren los distintos tipos de datos.


let rutas = [];
//si hay rutas guardadas en el local, agregarlas al array inicial
if (localStorage.getItem("rutas")){
    rutas = JSON.parse(localStorage.getItem("rutas"));
}
//obtener los valores de los inputs
const btnCrearRuta = document.getElementById("crear");
const contBuscador = document.getElementById("contBuscador");
const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("buscar");
const resultado2 = document.getElementById("resultado2");
const crearRuta = document.getElementById("formCrear");
const btnEnviar = document.getElementById("enviar");
const nuevaRuta = document.getElementById("nuevaRuta");
const datalist = document.getElementById("rutasGuardadas");
rutas.forEach(function(ruta){
    const option = document.createElement ("option");
    option.value = ruta.destino;
    datalist.appendChild(option);
});
//agregar el evento al boton de buscar
btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    buscarRutas();
})
async function buscarRutas() {
    let rutaEncontrada = inputBuscador.value.toLowerCase();

    try{
        //obtener las rutas desde el archivo JSON
        const response = await fetch("../JSON/rutas.JSON");
        if (!response.ok){
            throw new Error("Error al obtener las rutas preestablecidas.");
        }
        const rutasPreestablecidas = await response.json();

        // Filtrar las rutas preestablecidas para encontrar coincidencias
        let rutasEncontradas = rutasPreestablecidas.filter(function (ruta) {
            return ruta.destino.toLowerCase().includes(rutaEncontrada);
        });

        if (rutasEncontradas.length === 0) {
            // Si no hay coincidencias en las rutas preestablecidas, buscar en las rutas nuevas
            rutasEncontradas = rutas.filter(function (ruta) {
                return ruta.destino.toLowerCase().includes(rutaEncontrada);
            });
        }

        if (rutasEncontradas.length > 0){
            let resultadoBusqueda = "Ruta encontrada : <br>";
            rutasEncontradas.forEach(function (rutaEncontrada){
                resultadoBusqueda +=
                    "Destino: " + rutaEncontrada.destino + "<br>" +
                    "Rumbo: " + rutaEncontrada.rumbo + "°" + "<br>" +
                    "Punto de referencia 1: " + rutaEncontrada.puntoReferencia1 + "<br>" +
                    "Combustible remanente en punto 1: " + rutaEncontrada.combustibleRemanenteP1 + "<br>" +
                    "Tiempo en punto 1: " + rutaEncontrada.tiempoP1 + "<br>" +
                    "Punto de referencia 2: " + rutaEncontrada.puntoReferencia2 + "<br>" +
                    "Combustible remanente en punto 2: " + rutaEncontrada.combustibleRemanenteP2 + "<br>" +
                    "Tiempo en punto 2: " + rutaEncontrada.tiempoP2 + "<br>" +
                    "Tiempo total: " + rutaEncontrada.tiempoAlDestino + "<br>" +
                    "Combustible remanente en el destino: " + rutaEncontrada.combustibleRemanenteDestino
            });
            Swal.fire({
                html: resultadoBusqueda,
                width: "40%",
                color: "black",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#448AFF",
            });
        } else{
            //mensaje ruta no encontrada
            resultado2.classList.remove("displayNone");
        }
    } catch (e) {
        console.error("error" , e.message);
        Swal.fire({html: e.message})
    }
}
//agregar evento al boton de crear ruta
btnCrearRuta.addEventListener("click", async (e) => {
    e.preventDefault();
    crearRuta.classList.remove("displayNone");
    await tomarValoresFormulario();
});


async function tomarValoresFormulario() {
    const destino = document.getElementById("destino").value;
    const rumbo = document.getElementById("rumbo").value;
    const p1 = document.getElementById("p1").value;
    const comb1 = document.getElementById("comb1").value;
    const tP1 = document.getElementById("tP1").value;
    const p2 = document.getElementById("p2").value;
    const comb2 = document.getElementById("comb2").value;
    const tP2 = document.getElementById("tP2").value;
    const tAlDestino = document.getElementById("tT").value;
    const combF = document.getElementById("combFinal").value;
    const alert = document.getElementById("alert")
    const alertInput =document.getElementById("alertInput");
//validar que no hayan inputs vacios
if (destino === "" || rumbo === "" || p1 === "" || comb1 === "" || tP1 === "" || p2 === "" || comb2 === "" || tP2 === "" || tAlDestino === "" || combF === "") {
    alertInput.classList.remove("displayNone");
}else{
    alertInput.classList.add("displayNone");
    if (combF <18){
        alert.classList.remove("displayNone");
    }else{
        alert.classList.add("displayNone");
        window.scrollTo({
            top: 0,
                    behavior:'smooth'
        })
        //obtener rutas preestablecidas desde el archivo JSON
        const response = await fetch("../JSON/rutas.JSON");
        if (!response.ok){
            throw new Error("Error al obtener las rutas preestablecidas.");
        }
        const rutasPreestablecidas = await response.json();
        //crear objeto de la ruta
        let nuevaRuta = {
            destino: destino,
            rumbo: rumbo,
            puntoReferencia1: p1,
            combustibleRemanenteP1: comb1,
            tiempoP1: tP1,
            puntoReferencia2: p2,
            combustibleRemanenteP2: comb2,
            tiempoP2: tP2,
            tAlDestino: tAlDestino,
            combustibleRemanenteDestino: combF
        };
    
        //agregar  la nueva ruta al array de rutas preestablecidas
        rutas.push(nuevaRuta);
        
        let resultadoNueva = "Ruta creada : <br>" +
            "Destino: " + nuevaRuta.destino + "<br>" +
            "Rumbo: " + nuevaRuta.rumbo + "°" + "<br>" +
            "Punto de referencia 1: " + nuevaRuta.puntoReferencia1 + "<br>" +
            "Combustible remanente en punto 1: " + nuevaRuta.combustibleRemanenteP1 + "L" +"<br>" +
            "Tiempo en punto 1: " + nuevaRuta.tiempoP1 + "<br>" +
            "Punto de referencia 2: " + nuevaRuta.puntoReferencia2 + "<br>" +
            "Combustible remanente en punto 2: " + nuevaRuta.combustibleRemanenteP2 + "L" + "<br>" +
            "Tiempo en punto 2: " + nuevaRuta.tiempoP2 + "<br>" +
            "Tiempo total: " + nuevaRuta.tAlDestino + "<br>" +
            "Combustible remanente en el destino: " + nuevaRuta.combustibleRemanenteDestino + "L"
            //resultado, ruta creada
            Swal.fire({
                html: resultadoNueva,
                width:"40%",
                color: "black",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#448AFF",
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                
        localStorage.setItem("rutas", JSON.stringify(rutas));
    };}
}
//agregar evento al boton enviar formulario, llamando la funcion de tomarValoresFormulario y mostrando el resultado
btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    tomarValoresFormulario();
});
