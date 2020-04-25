class API{
    constructor(apiKey){
        this.apiKey= apiKey;
    }
    //Obetenemos todas las criptomonedas, para mostrarlas en el select
    async obtenerMonedasAPI(){
        const url=`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;

        //Agregamos un fethc a la aPI
        const urlObtenerMonedas= await fetch(url);
        //Creamos una respuesta en JSON
        const monedas= await urlObtenerMonedas.json();
        return{
            monedas
        }
    }
    //Ahora crearemos un método para que realize la consulta al servidor, con los datos seleccionados
    async obtenerValores(moneda, criptomoneda){
        const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apiKey}`;
    //Consultamos en la API
    const urlConvertir = await fetch(url);
    const resultado= await urlConvertir.json();
    return{
        resultado
    }
    }
    
}