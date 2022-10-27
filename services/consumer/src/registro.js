import Kafka from 'node-rdkafka';
import fs from 'fs';
const consumer= new Kafka.KafkaConsumer({
    'group.id': 'kafka-admin',
    'metadata.broker.list':'localhost:9092'
}, {});

consumer.connect();

consumer.on('ready', () =>{
    consumer.subscribe(['miembros']);
    consumer.consume();
}).on('data',async (data)=>{
    const value= JSON.parse(data.value.toString())
    fs.writeFile('/.registro.txt',JSON.stringify(value))
})

