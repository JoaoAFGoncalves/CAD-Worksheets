const express = require('express')
const app = express()
const port = 3000

let temperature = null;

const sensors = require('./sensors')

sensors.addSensor('kitchenTemp')
sensors.addSensor('roomTemp')


// console.log(sensors.getSensor('KitchenTemp'))


// fs.watch('./temp1.sensor', (eventType, filename) => {
//   console.log(` event type is: ${eventType}`);
//   if (filename) {
//     console.log(`filename provided: ${filename}`);
//   } else {
//     console.log('filename not provided');
//   }
//   temperature = fs.readFileSync('./temp1.sensor', 'utf8')
//   temperature = Number(temperature)
// });



app.get('/', (req, res) => {
  res.send({ temp: temperature})
})

app.get('/sensors/:sensorName', function(req, res){
  res.send(sensors.getSensor(req.params.sensorName))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})