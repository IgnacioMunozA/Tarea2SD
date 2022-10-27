//import Kafka from 'node-rdkafka'
const {Kafka}=require ('kafkajs');
const express=require ("express");
const bodyParser =require ("body-parser");
const dotenv=require("dotenv");
dotenv.config();

const app= express();
const port= process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


async function nuevaventa(data){
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
    console.log("Miembro registrado" )
    producer.connect();
}

async function aviso(data){
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
        console.log("Usuario localizado %d",value)
    });

    producer.connect();
}

const kafka= new Kafka({
    clientId: "my-app",
    brokers:["kafka:9092"]
});
app.post('/registro',(req,res)=>{
    (async () =>{
    const producer= kafka.producer();
    await producer.connect();
    const miembro={
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        rut: req.body.rut,
        correo: req.body.correo,
        patente: req.body.patente,
        tipo: req.body.tipo
    }
    var value={}
    value=JSON.stringify(miembro);
    if(miembro["tipo"]== 1){
        const topicMessages=[
            {
                topic: 'miembros',
                partition: 1,
                messages:[{value: JSON.stringify(miembro),partition:1}]
            },
        ]
        await producer.sendBatch({topicMessages})
    }else{
        const topicMessages=[
            {
                topic:'miembros',
                partition:2,
                messages:[{value: JSON.stringify(miembro),partition:2}]
            },
        ]
        await producer.sendBatch({topicMessages})
    }

    await producer.disconnect();
    res.status(200)
})();
});

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

