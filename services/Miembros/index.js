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

var miembrosP = [];
var miembrosN = [];
var value= null
const main = async () => {
  const consumer = kafka.consumer({ groupId: "miembros" });
  await consumer.connect();
  await consumer.subscribe({ topic: "miembros", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      value= message.value
      console.log("Registrando Usuario...");
      if(partition == 1)
      {
        console.log("Usuario premium")
        var miembro = JSON.parse(message.value.toString());
        miembrosP.push(miembro); 
      }
      else if(partition == 0)
      {
        console.log("Usuario no premium")
        var miembro = JSON.parse(message.value.toString());
        miembrosN.push(miembro);
      }
      
      console.log("Miembros Premium:" , miembrosP.length)
      if(miembrosP.length > 0)
      {
        console.log(miembrosP)
      }
      console.log("Miembros Normales:" ,miembrosN.length)
      if(miembrosN > 0 )
      {
        console.log(miembrosN)
      }

    },
  })
}

app.listen(port,host,()=>{
    console.log(`Registro de miembros in: http://localhost:${port}.`)
    main()
});