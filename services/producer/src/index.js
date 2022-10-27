import Kafka from 'node-rdkafka';
//const { Kafka }= require ('kafkajs')
import express from "express";
import bodyParser from 'body-parser';
import { crearTopics } from "./topics.js";
import { ventasdiarias, miembronuevo, stock, ubicacion} from "./sendtopics.js";

const app= express();
const port= process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

crearTopics();

app.post('/venta', (req,res) =>{
    console.log(req.body)
    const venta = {
        cliente: req.body.cliente,
        cantidad: req.body.cantidad,
        hora: req.body.hora
    }
    ventasdiarias(venta);

    const reponer= {
        cliente: req.body.cliente,
        stock: req.body.stock
    }
    stock(reponer);

})

app.post('/registro',(req,res)=>{
    console.log(req.body)
    miembronuevo(req.body);
    res.send("Todo ok")
})

app.post('/ubicacion',(req,res)=>{
    console.log(req.body)
    const ubicaciones={
        miembro: req.body.nombre,
        ubicacion: req.body.ubicacion
    }

    ubicacion(ubicaciones,1);
})

app.post('/ubicacion',(req,res)=>{
    console.log(req.body)
    const stranges={
        miembro: req.body.nombre,
        ubicacion: req.body.ubicacion
    }
    strange(ubicaciones,2);
})



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

