const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: ': Sanjeev Kumar'
    })
})
app.get('/About', (req, res)=>{
    res.render('About', {
        title: 'About me',
        name: ': Sanjeev kumar'
        
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        helper: "If you feel any issue feel free to contact me on my E-mail.",
        title: 'Help',
        name: ': Sanjeev kumar'
    })
})
app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an adress!'
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if (error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    
})
//app.com
//app.com/help
//app.com/about
//handlebars means hbs

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: ': Sanjeev kumar',
        errorMessage: 'Help article not found'
    })
})
// to handle erros
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: ': Sanjeev kumar',
        errorMessage: 'Page Not found'
    })
})
// To start the server the method is 
app.listen(port, ()=>{
    console.log('Server, is up on port. ' + port)
}) 