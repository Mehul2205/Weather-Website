const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index',{
        title:'Weather',
        name: 'Mehul Patni'
    })
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About Me',
        name: 'Mehul Patni',
        age: 20
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        helpText: 'This is some helpfull text',
        title: 'Help',
        name: 'Mehul Patni'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({
            error: 'Address query is required'
        })
        // req.query.address = 'Nagpur'
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, ForecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: ForecastData,
                location,
                address: req.query.address
            })
        })
        
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('help404',{
        errorMessage: 'This is some helpfull textHelp article not found!.',
        title: 'Help 404 Error',
        name: 'Mehul Patni'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found!.',
        title: '404 Error',
        name: 'Mehul Patni'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})