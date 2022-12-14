const express = require('express')
const bodyParser = require('body-parser')
const https = require("https")

const app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url =  `https://us21.api.mailchimp.com/3.0/lists/2491f2783e`

    const options = {
        method: "POST",
        auth: "brennan1:d51d77d3aa94c2a76fb9a3b25d148d14-us21"        
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    // request.write(jsonData)
    request.end()
})

app.post('/failure', function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started on port 3000')
})


//api key
//d51d77d3aa94c2a76fb9a3b25d148d14-us21
//list ID
//2491f2783e
//endpoint
// https://us21.api.mailchimp.com/3.0/