import Kafka from 'node-rdkafka';
import fs from 'fs';
const consumer= new Kafka.KafkaConsumer({
    'group.id': 'kafka-admin',
    'metadata.broker.list':'localhost:9092'
}, {});

consumer.connect();


consumer.on('ready', () =>{
    consumer.subscribe(['ubicaciones']);
    consumer.consume();
    console.log("Consumiendo");
}).on('data',async (data)=>{
    const value= JSON.parse(data.value.toString())
    if(data.partition==1){
        console.log("Profugo registrado")
        fs.writeFile('/.extranios.txt',JSON.stringify(value))
        
    }else{
        console.log("Ubicacion actualizada")
        fs.writeFile('/.ubicaciones.txt',JSON.stringify(value))
    }
    
})


