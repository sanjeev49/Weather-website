const request = require('request')

const forecast = (latitude, longitude,  callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c83924bda2cb8f7c61b60b8a98ebec62&query='+ latitude +','+longitude + '&units=f'
    request({url, json:true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to Weather Service!', undefined)

        }
        else if(body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currenlty " + body.current.temperature + " degree  , it feels like " + body.current.feelslike+" degree")

        }
    })
}

module.exports = forecast