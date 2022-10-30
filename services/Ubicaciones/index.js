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


const main = async () => {
  const consumer = kafka.consumer({ groupId: "ubicaciones" });
  await consumer.connect();
  await consumer.subscribe({ topic: "ubicaciones", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if(partition ==1){
        console.log("Carrito profugo")
      }else{
        console.log("Carrito limpio")
      }
    },
  })
};

app.listen(port,host,()=>{
    console.log(`Registro de miembros in: http://localhost:${port}.`)
    main()
});