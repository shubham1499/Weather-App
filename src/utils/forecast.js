const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude  + '&exclude=hourly,daily&appid=94b245b8467e696f63b3ec1162991a5f'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect weather app!',undefined)
        }else if(response.body.error){
            callback('unable to find location. Try another search!',undefined)
        }else{
            callback(undefined,response.body.current)
        }
    })


}
module.exports = forecast