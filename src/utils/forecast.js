const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/99a27564f320d4248fc073c16582f292/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)+'?units=si'

    request({url, json:true},(error, {body}) =>{
        if(error){
            callback("Unable to Connect to weather service!", undefined)
        }else if(body.error){
            callback("Unable yo find location", undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' It is currently '+ body.currently.temperature+ ' degree celcius out. There is '+ body.currently.precipProbability +'% chances of rain.')
            }
        // console.log(response.body.currently)
    })
}

module.exports = forecast 