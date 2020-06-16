//const { response } = require("express")

console.log('hello from new app.js')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1= document.querySelector('#msg1')
const msg2= document.querySelector('#msg2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?search=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }else{
                console.log("forecast",data.forecast)
                msg1.textContent= data.location
                msg2.textContent = "Current Temperature is " +(data.forecast.temp-273) + " Celsius"
            }
        })
    })
    


})