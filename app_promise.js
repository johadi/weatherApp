const yargs=require('yargs');
const axios=require('axios');
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

var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl='https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress;

axios.get(geocodeUrl)
    .then((response)=>{
        if(response.data.status==='ZERO_RESULTS'){
            throw new Error('Unable to find that address');
        }
        var lat=response.data.results[0].geometry.location.lat;
        var lng=response.data.results[0].geometry.location.lng;
        var weatherUrl='https://api.darksky.net/forecast/bfb949a60d88f327f915a81fea3db3e9/'+lat+','+lng
        console.log(response.data.results[0].formatted_address);
        console.log(lat,lng);
        return axios.get(weatherUrl);
    })
    .then((response)=>{
        var temperature=response.data.currently.temperature;
        var apparentTemperature=response.data.currently.apparentTemperature;
        console.log(`it's currently ${temperature} ,it feels like ${apparentTemperature}`);
    })
    .catch((err)=>{
        if(err.code==='ENOTFOUND'){
            console.log('Unable to connect to api server');
        }else{
            console.log(err.message);
        }

    })