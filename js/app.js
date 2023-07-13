
//array inicial de las rutas "Preestablecidas"
let rutas = [
    {destino : "Azul", Rumbo:"083", PuntoReferencia1:" Hinojo", CombustibleRemanenteP1:"94lts", TiempoP1:"5 Min", PuntoReferencia2:"YPF Nieves", CombustibleRemanenteP2:"90lts", TiempoP2:"20 Min", TiempoAlDestino:"23 Min", CombustibleRemanenteDestino:"88lts"},
    {destino : "Bolivar", Rumbo:"326", PuntoReferencia1:" Laguna La Mostaza", CombustibleRemanenteP1:"92lts", TiempoP1:"10 Min", PuntoReferencia2:"Laguna Blanca Grande", CombustibleRemanenteP2:"86lts", TiempoP2:"25 Min", TiempoAlDestino:"50 Min", CombustibleRemanenteDestino:"80lts"}
];

//preguntar  al usuario que desea hacer
let opcion  = prompt("¿Desea buscar una ruta existente o crear una nueva? Ingrese 'crear' o 'buscar'");

if (opcion === "buscar"){
    //pedir al usuario el nombre de la ruta a buscar
    let nombreRuta = prompt("ingrese el nombre de la ruta");

    //buscar la ruta por nombre en el array
    let rutaEncontrada = rutas.find(function(ruta){
        return ruta.destino ===nombreRuta;
    })
    
    if (rutaEncontrada){
        alert("Ruta encontrada:\n" +
        "Destino: " + rutaEncontrada.destino + "\n" +
        "Rumbo: " + rutaEncontrada.Rumbo + "\n" +
        "Punto de referencia 1: " + rutaEncontrada.PuntoReferencia1 + "\n" +
        "Combustible remanente en punto 1: " + rutaEncontrada.CombustibleRemanenteP1 + "\n" +
        "Tiempo en punto 1: " + rutaEncontrada.TiempoP1 + "\n" +
        "Punto de referencia 2: " + rutaEncontrada.PuntoReferencia2 + "\n" +
        "Combustible remanente en punto 2: " + rutaEncontrada.CombustibleRemanenteP2 + "\n" +
        "Tiempo en punto 2: " + rutaEncontrada.TiempoP2 + "\n" +
        "Tiempo total: " + rutaEncontrada.TiempoAlDestino + "\n" +
        "Combustible remanente en el destino: " + rutaEncontrada.CombustibleRemanenteDestino);
    } else {
        alert("No se a encontrado ninguna ruta con el nombre " + nombreRuta);
    }
} else if (opcion === "crear") {
    //se pide los datos de la ruta nueva
    let nuevaRutaDestino = prompt("Ingrese el destino de la nueva ruta (tambien sera el nombre)");
    let nuevaRutaRumbo = prompt("Ingrese el rumbo requerido");
    let nuevaRutaPuntoReferencia1 = prompt("Ingrese el primer punto de referencia");
    let nuevaRutaCombustibleRemanenteP1 = prompt("Ingrese el combustible remanente al punto 1");
    let nuevaRutaTiempoP1 = prompt("Ingrese el tiempo de vuelo en el punto 1 (Todos los tiempos deben ser tomados con referencia al despegue)");
    let nuevaRutaPuntoReferencia2 = prompt("Ingrese su segundo punto de referencia");
    let nuevaRutaCombustibleRemanenteP2 = prompt("Ingrese el combustible remanente al punto 2");
    let nuevaRutaTiempoP2 = prompt("Ingrese el tiempo de vuelo en el punto 2 (Todos los tiempos deben ser tomados con referencia al despegue)");
    let nuevaRutaTiempoAlDestino = prompt("Ingrese el tiempo de vuelo total");
    let nuevaRutaCombustibleRemanenteDestino = prompt("Ingrese el combustible remanente en el destino");

    //crear objeto de la ruta
    let nuevaRuta = {destino:nuevaRutaDestino, 
        Rumbo:nuevaRutaRumbo, 
        PuntoReferencia1:nuevaRutaPuntoReferencia1, 
        CombustibleRemanenteP1:nuevaRutaCombustibleRemanenteP1, 
        TiempoP1:nuevaRutaTiempoP1, 
        PuntoReferencia2:nuevaRutaPuntoReferencia2, 
        CombustibleRemanenteP2:nuevaRutaCombustibleRemanenteP2, 
        TiempoP2:nuevaRutaTiempoP2, 
        TiempoAlDestino: nuevaRutaTiempoAlDestino, 
        CombustibleRemanenteDestino:nuevaRutaCombustibleRemanenteDestino };

    //agregar la nueva ruta al array
    rutas.push(nuevaRuta);

    alert("La ruta fue creada:\n " +
    "Destino: " + nuevaRuta.destino + "\n" +
    "Rumbo: " + nuevaRuta.Rumbo + "\n" +
    "Punto de referencia 1: " + nuevaRuta.PuntoReferencia1 + "\n" +
    "Combustible remanente en punto 1: " + nuevaRuta.CombustibleRemanenteP1 + "\n" +
    "Tiempo en punto 1: " + nuevaRuta.TiempoP1 + "\n" + 
    "Punto  de referencia 2: " + nuevaRuta.PuntoReferencia2 + "\n" + 
    "Combustible remanente en punto 2: " + nuevaRuta.CombustibleRemanenteP2 + "\n" +
    "Tiempo en punto 2: " + nuevaRuta.TiempoP2 + "\n" + 
    "Tiempo total: " + nuevaRuta.TiempoAlDestino + "\n" +
    "Combustible remanente en el destino: " + nuevaRuta.CombustibleRemanenteDestino);
} else{
    alert("Opcion invalida, ingrese 'crear' o 'buscar'");
}

