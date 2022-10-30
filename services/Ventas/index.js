const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { Kafka } = require("kafkajs");

const app = express()
dotenv.config()
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

var total=0
var cliente= 0
var promedio=0



const main = async () => {
  const consumer = kafka.consumer({ groupId: "ventas" });
  await consumer.connect();
  await consumer.subscribe({ topic: "ventas", fromBeginning: true });
setInterval(async function(){
  await consumer.run({
    eachMessage: async({topic, partition, message})=>{
        value=message.value
        json= JSON.parse(value)

        if(cliente != 0){
            promedio=total/cliente
            console.log(`El usuario vendió ${promedio} sopaipillas`)
        }
        total=0
        cliente=0
        promedio=0

    },
  })
},10*1000)
var data= JSON.parse(message.value.toString())
total += data.cantidad
cliente += 1
};

app.get('/ventasregistro',(req,res)=>{
    console.log(`Ventas: ${ventascarro}`)
    console.log(`Clientes: ${miembroscarro}`)
    res.send(ventascarro)
    res.send(miembroscarro)
})



app.listen(port,host,()=>{
    console.log(`Consumo de ventas in: http://localhost:${port}.`)
    main()
});