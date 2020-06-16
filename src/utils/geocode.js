const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2h1YmhhbTE0OTkiLCJhIjoiY2tiODk4c2F3MDIwZDJ6cGIxbW9lOWFscyJ9.PWGBooSlu3fju02TeuQR8Q&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect mapbox!',undefined)
        }else if(response.body.features.length === 0){
            callback('unable to find location. Try another search!',undefined)
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:  response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode