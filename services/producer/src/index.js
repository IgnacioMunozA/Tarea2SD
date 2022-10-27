import Kafka from 'node-rdkafka';
//const { Kafka }= require ('kafkajs')
import express from "express";
import bodyParser from 'body-parser';

const app= express();
const port= 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

function registromiembro(data){
    var producer= new Kafka.Producer({
        'metadata.broker.list':'localhost:9092',
        'dr_cb': true
    });
    var topic= 'miembros';

    producer.on('ready',function(arg){
        var value= Buffer.from(JSON.stringify(data));
        if(data.tipo === 1){
            var partition=1;
        }else{
            var partition=2;
        }
        var headers= [{header: "registro usuario"}]

        console.log(producer.produce(topic,partition,value,null,Date.now(),"",headers))
    });
    producer.connect();
}

function nuevaventa(data){
    var producer= new Kafka.Producer({
        'metadata.broker.list':'localhost:9092',
        'dr_cb':true
    });

    var topic= 'ventas';

    producer.on('ready',function(arg){
        var value= Buffer.from(JSON.stringify(data))
        var partition=1
        var headers= [{header: "Venta registrada"}]

        console.log(producer.produce(topic,partition,value,null,Date.now(),"",headers))
    });

    producer.connect();
}

function aviso(data){
    var producer= new Kafka.Producer({
        'metadata.broker.list':'localhost:9092',
        'dr_cb':true
    });

    var topic= 'ubicaciones';

    producer.on('ready',function(arg){
        var value= Buffer.from(JSON.stringify(data))
        if(data.tipoaviso === "profugo"){
            var partition=2;
            var headers= [{header: "profugo"}]
        }else{
            var partition=1;
            var headers= [{header: "ubicacion registrada"}]
        }
        console.log(producer.produce(topic,partition,value,null,Date.now(),"",headers))
    });

    producer.connect();
}


app.post('/venta', (req,res) =>{
    console.log(req.body)
    const venta = {
        cliente: req.body.cliente,
        cantidad: req.body.cantidad,
        hora: req.body.hora,
        stock: req.body.stock,
        ubicacion: req.body.ubicacion
    }
    nuevaventa(venta)
    res.status(200)
})

app.post('/registro',(req,res)=>{
    console.log(req.body)
    registromiembro(req.body)
    res.status(200)
})

app.post('/ubicacion',(req,res)=>{
    console.log(req.body)
    const ubicaciones={
        miembro: req.body.nombre,
        ubicacion: req.body.ubicacion,
        tipoaviso: req.body.tipoaviso
    }
    aviso(ubicaciones);
    
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

