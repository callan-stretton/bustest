var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var request = require('superagent')
var server = express()

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/bus/:number', (req, res) => {
  request
    .get("https://www.metlink.org.nz/api/v1/ServiceLocation/" + req.params.number)
    .end((err, response) => {
      if (err) {
        console.log(err)
      } else {
        res.json({ Services: response.body.Services, inboundStops: require(`./busStops/bus-${req.params.number}-in`), outboundStops: require(`./busStops/bus-${req.params.number}-out`)})
      }
    })
})

module.exports = server
