import Kafka from 'node-rdkafka';

var consumer= new Kafka.KafkaConsumer({
    'group.id':'kafka-admin',
    'metadata.broker.list':'localhost:9092'
}, {});

consumer.connect();

consumer.on('ready',()=>{
    consumer.subscribe(['ventas']);

    consumer.consume()
}).on('data',async(data)=>{
    if(data.partition == 2){
        
    }
})