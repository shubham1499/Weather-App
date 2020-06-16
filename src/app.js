const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//defining path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')


//set the views and viewengine path
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)
//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"WEATHER",
        name:"Shubham Fargade"
    })
}) 

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name :'Shubham Fargade'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"ALL HELP WILL BE PROVIDED",
        title:"Help",
        name:"Shubham Fargade"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide address!"
        })
    }

    geocode(req.query.search,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastdata) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location:data.location
            })
        })
    })



    // res.send({
    //     address : req.query.search
    // })
})
app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products :[]
    }) 
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error Page",
        errormessage:"Page not found",
        name:"Shubham Fargade"
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})