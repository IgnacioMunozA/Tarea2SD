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

var value= null
var json={}
var ventascarro= new Array()
var miembroscarro= new Array()


const main = async () => {
  const consumer = kafka.consumer({ groupId: "stock" });
  await consumer.connect();
  await consumer.subscribe({ topic: "stock", fromBeginning: true });

  await consumer.run({
    eachMessage: async({topic, partition, message})=>{
        value=message.value
        json= JSON.parse(value)

        var carrito= json["patente"]
        var miembro= json["cliente"]
        var cantidad= json["cantidad"]

        if(ventascarro.includes(carrito)){
            ventascarro[patente]+=1
        }else if(!miembroscarro.includes(miembro)){
            miembroscarro.push(patente)
            miembroscarro[patente]+=1
        }

        console.log(`Ventas: ${ventascarro}`)
        console.log(`Miembros: ${miembroscarro}`)

    },

    


  })
};

app.listen(port,host,()=>{
    console.log(`Consumo de ventas in: http://localhost:${port}.`)
    main()
});