const request=require('request');
module.exports.getWeather=(lat,lng,callback)=>{
    request({url: 'https://api.darksky.net/forecast/bfb949a60d88f327f915a81fea3db3e9/'+lat+','+lng,
            json: true},
        (error,response,body)=>{
            if(!error && response.statusCode===200){
                callback(undefined,{
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature});
            }else{
                callback('Oops! Unable to fetch weather');
            }
        });
}
