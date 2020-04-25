//Instancias de otros archivos
const cotizador= new API('2664fcd77af9cb6ca432e3ef8c130734d67cfe14f3be2d79527fdccc44f99cc5');
const ui = new Interfaz();

cotizador.obtenerMonedasAPI();

//Leer el form
const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    //Leemos el campo de moneda
    const monedaSelect= document.querySelector('#moneda');
    const monedaSeleccionada= monedaSelect.options[monedaSelect.selectedIndex].value;
   
        //Leemos el campo de tipo de criptomoneda
        const criptomonedaSelect= document.querySelector('#criptomoneda');
        const criptoMonedaSeleccionada= criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
    
        //Comprobamos que los dos campos tengan una opción seleccionada
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        //Arrojamos una alerta de error
        //El método es instanciado desde el archivo ui.js
        ui.mostrarMensaje('Ambos obligatorios', 'alert bg-danger text-center');

    }else {
        //Se realiza la consulta correcta a la api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
        .then(data =>{
            ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
        })
    }
})


