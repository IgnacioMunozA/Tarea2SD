import Kafka from 'node-rdkafka';

export async function crearTopics()
{
    const admin = Kafka.AdminClient.create({
        'client.id': 'kafka-admin',
        'metadata.broker.list': 'localhost:9092'
    });

    await admin.connect();

    await admin.createTopic({
        topic: 'ventas',
        num_partitions: 2,
        replication_factor: 1,
        config: { 'retention.ms': (24*60*60*1000).toString()}
    });


   /* await admin.createTopic({
        topic: 'stock',
        num_partitions: 2,
        replication_factor: 1,
        config: { 'retention.ms': (24*60*60*1000).toString}
    }); */

    await admin.createTopic({
        topic: 'ubicaciones',
        num_partitions: 2,
        replication_factor: 1,
        config: { 'retention.ms': (24*60*60*1000).toString()}
    });

    await admin.createTopic({
        topic: 'miembros',
        num_partitions: 2,
        replication_factor: 1,
        config: {'retention.ms': (24*60*60*1000).toString()}
    });
    

    
    admin.disconnect();
}