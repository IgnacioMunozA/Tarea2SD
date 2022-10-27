import Kafka from 'node-rdkafka';
import fs from 'fs';
const consumer= new Kafka.KafkaConsumer({
    'group.id': 'kafka-admin',
    'metadata.broker.list':'localhost:9092'
}, {});

consumer.connect();

consumer.on('ready', () =>{

    var clientes=0
    var promedio=0
    var ventas=0


    
    consumer.consume();
}).on('ready',()=>{
    consumer.subscribe(['ventas']);
    
    const value= JSON.parse(data.value.toString())
    fs.writeFile('/.registro.txt',JSON.stringify(value))
})

