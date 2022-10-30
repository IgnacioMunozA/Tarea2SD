const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");

const app = express();
dotenv.config();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;
var host = process.env.PORT || '0.0.0.0';

var value = null;

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

app.post("/ventas", (req, res) => {
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const { cliente, cantidad , hora , stockrestante , ubicacion } = req.body;
      let venta = {
        cliente: cliente,
        cantidad: cantidad,
        hora: hora,
        stockrestante: stockrestante,
        ubicacion: ubicacion
      }
      value = JSON.stringify(venta);
        const topicMessages = [
          {
            topic: 'ventas',
            messages: [{value: JSON.stringify(ventas)}]
          },
        ]
        await producer.sendBatch({ topicMessages }) 

      await producer.disconnect();

      res.json("Se registró la venta");  
    })();
});

app.post("/ubicaciones", (req, res) => {
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const {ubicacion, tipo } = req.body;
      let ubicaciones = {
        ubicacion: ubicacion,
        tipo: tipo
      }
      value = JSON.stringify(ubicaciones);
      if(ubicaciones["tipo"]==2){
        const topicMessages=[{
            topic:'ubicaciones',
            partition:1,
            messages:[{value:JSON.stringify(ubicaciones),partition:1}]
        },]
        await producer.sendBatch({ topicMessages }) 
        console.log("profugo registrado")
      }else{
        const topicMessages=[{
            topic:'ubicaciones',
            partition:0,
            messages:[{value:JSON.stringify(ubicaciones),partition:0}]
        },]
        await producer.sendBatch({ topicMessages })
        console.log("carrito limpio")
      }
      
      await producer.disconnect();

      res.json("Se registró la ubicacion");  
    })();
});

app.post("/registro", (req, res) => {
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const {nombre, apellido, rut, correo,patente, tipo} = req.body;
      let usuario = {
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        correo: correo,
        patente: patente,
        tipo: tipo
      }
      value = JSON.stringify(venta);
      if(usuario["tipo"== 1]){
        const topicMessages = [
          {
            topic: 'miembros',
            messages: [{value: JSON.stringify(ventas), partition: 1}]
          },
        ]
        await producer.sendBatch({ topicMessages }) 
      }else{
        const topicMessages = [
          {
            topic: 'miembros',
            messages: [{value: JSON.stringify(ventas),partition: 0}]
          },
        ]
        await producer.sendBatch({ topicMessages }) 
      }
        

      await producer.disconnect();

      res.json("Se registró el usuario");  
    })();
});


app.listen(port,host, () => {
  console.log(`API run in: http://localhost:${port}.`);
});