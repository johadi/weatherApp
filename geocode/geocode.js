const request=require('request');
module.exports={
    geocodeAddress: (address,callback)=>{
        var encodedAddress=encodeURIComponent(address);
        request({url:'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress,
                json: true},
            (error,response,body)=>{
                if(error){
                    callback('can not connect to google server')
                }else if(body.status==='ZERO_RESULTS'){
                    callback('Result not found for that address');
                }else if(body.status==='OK'){
                    callback(undefined,{
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    })
                }else{
                    console.log('Request failed...Try again');
                }
            });
    }
}
