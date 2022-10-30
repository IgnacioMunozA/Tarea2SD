const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const { Kafka } = require("kafkajs");

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 8000;
var host = process.env.PORT || '0.0.0.0';

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

var clientes= new Array()
var ventas= new Array()
var clientescarro= []

const main = async () => {
  const consumer = kafka.consumer({ groupId: "ventas" });
  await consumer.connect();
  await consumer.subscribe({ topic: "ventas", fromBeginning: true });
setInterval(async function(){
  await consumer.run({
    eachMessage: async({topic, partition, message})=>{
        value=message.value
        json= JSON.parse(value)

        const aux= json.cantidad
        const cliente= json["cliente"]
        const patente= json["patente"]

        if(ventas.includes(json.patente)){
          ventas[patente]+=1
        }else if(!clientes.includes(json.cliente)){
          clientes.push(patente)
          clientes[patente]+=1
        }else if(!ventas.includes(json.patente)){
          ventas+=1
          ventas.push(patente)
        }
      },
  })
},10*1000)

console.log(`Ventas: ${ventas}.`)
console.log(`Clientes: ${clientes}`)
};



app.listen(port,host,()=>{
    console.log(`Consumo de ventas in: http://localhost:${port}.`)
    main()
});