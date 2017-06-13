const weather = require('./weather/weather');
const geocode=require('./geocode/geocode');
const yargs=require('yargs');
//<script src="{{asset('http://maps.google.com/maps/api/js?sensor=true')}}"></script>
// <div id="google-map" style="height:650px" data-latitude="7.561418400000001" data-longitude="6.2429045"></div>
const argv=yargs.option({
    a: {
        demand: true,
        alias: 'address',
        description: 'Address to fetch weather for',
        String: true
    }
}).
    help()
    .alias('help','h')
    .argv;
geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log('it is currently '+weatherResults.temperature+' it feels like '+weatherResults.apparentTemperature);
            }
        })
    }
});
