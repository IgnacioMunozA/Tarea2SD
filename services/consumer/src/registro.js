import Kafka from 'node-rdkafka';
import fs from 'fs';
var consumer= new Kafka.KafkaConsumer({
    'group.id': 'kafka-admin',
    'metadata.broker.list':'localhost:9092'
}, {});

consumer.connect();

consumer.on('ready', () =>{
    console.log("Consumiendo...")
    consumer.subscribe(['miembros']);
    consumer.consume();
}).on('data',async (data)=>{
    const value= JSON.parse(data.value.toString())
    console.log("Miembro agregado")
    fs.writeFile('/.registro.txt',JSON.stringify(value))
})

