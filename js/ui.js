class Interfaz {

    /**Una vez que se realiza la instancia a la interface
     * Se inicializa el constructor con la referencia al método init, el cual ejecuta 
     * la referencia al otro constructor construirSelect(), el cual imprime el valor
     * de la variable monedas
     * 
     /*/
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                //Tenemos que seleccionar el elemento de seleccion del HTML antes del for, debido a que se reescribirá en cada iteración
                const select = document.querySelector('#criptomoneda');
                //Ya seleccionado el select del HTML, en cada iteración del programa se ira llenando con los nombres que nos arrojará la API

                //Aqui tendremos la lógica para mostrar los datos, como recorer un objeto que es 
                //lo que nos devuelve la API. Podemos husar for o Objetct.entries, etc
                //Aqui mediante el for iteramos con los resultados que nos arroja la API
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //Añadimos el Symbol que es el identificador en la API, y el nombre, en el campo de seleccion de api
                    const opcion = document.createElement('option');
                    //Symbol es un parametro del objeto de la API
                    opcion.value = value.Symbol;
                    //Añadimos cada nombre de la API que ya seleccionamos y tenemos en la variable opcion en el select
                    //CoinName de nuevo es un parametro del objeto de la API
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);

                }

            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        //Seleccionamos el div donde mostraremos las alertas
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //Mostrar el contenido y despues de un tiempo determinado desaparece
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 2000);
    }
    //Imprimimos el resultado de la consulta en un div
    mostrarResultado(resultado, moneda, crypto) {

        //En caso de realizar una segunda consulta el resultado se oculta, para mostrar el spinner
        const resultadoAnterior= document.querySelector('#resultado > div');
        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        //Recortamos el número de digitos que nos arroja la API en el precio, con el método toFixed
        let precio = datosMoneda.PRICE.toFixed(2),
        porcentaje= datosMoneda.CHANGEPCTDAY.toFixed(2),
        //Realizamos la misma operación con la fecha, pero en este caso se multiplica por 1000 para convertir a fecha el dato de la API, es un estandrar o algo así
        actualizado= new Date(datosMoneda.LASTUPDATE *1000).toLocaleDateString
        ('es-MX');
        //EL método toLocaleDateString, nos permite convertir la fecha a un formato de una región, en este caso méxico


        //Construir el template
        let templateHTML = `
        <div class= "card bg-warning">
            <div class="card-body text-light">
                <h2 class="card-title">Resultado:</h2>
                <img class="img-fluid mb-2" src="${ImageUrl }">
                <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}
                <p>Variación del último día: % ${porcentaje}</p>
                <p>Actualización reciente: ${actualizado}</p>
                
            </div>
        </div>`;

        this.mostrarOcultarSpinner('block');
        setTimeout(()=>{
        //INsertamos el resultado en el div
        document.querySelector('#resultado').innerHTML=templateHTML;
        this.mostrarOcultarSpinner('none')


        }, 2000);
    }
    mostrarOcultarSpinner(vista){
        const spinner= document.querySelector('.contenido-spinner');
        spinner.style.display= vista;
    }
}