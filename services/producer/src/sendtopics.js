import Kafka from 'node-rdkafka';

export function miembronuevo(data){
    const producer = new Kafka.Producer({
        'metadata.broker.list': 'localhost:9092',
        'dr_cb':true
    });

    const topic= 'miembros';

    producer.on('ready', function(arg){
        var value= Buffer.from(JSON.stringify(data));
        var key = null;
        if(data.registro === 1){
            var partition = 1;
        }else{
            var partition = 2;
        }
        var header= [ { header: "Miembro registrado"}]
        console.log(producer.produce(topic, partition, value, key, Date.now(),header))
    });

    producer.connect();
}

export function ventasdiarias(data){
    const producer= new Kafka.Producer({
        'metadata.broker.list': 'localhost:9092',
        'dr_cb': true
    });

    const topic= 'ventas';

    producer.on('ready',function(arg){
        var value= Buffer.from(JSON.stringify(data));
        var key= null;
        var partition= 1;
        var header= [{header: "Venta registrada"}]

        console.log(producer.produce(topic, partition, value, key, Date.now(),header))
    });
    producer.connect();
}

export function stock(data){
    const producer= new Kafka.Producer({
        'metadata.broker.list':'localhost:9092',
        'dr_cb':true
    });

    const topic= 'ventas';

    producer.on('ready',function(arg){
        var value= Buffer.from(JSON.stringify(data));
        var key= null;
        var partition= 2;
        var header= [{ header: "Stock"}]

        console.log(producer.produce(topic, partition, value, key, Date.now(), header))
    });

    producer.connect();
}

/*    export function strange(data){
        const producer = new Kafka.Producer({
            'metadata.broker.list': 'localhost:9092',
            'dr_cb':true
        });

        const topic= 'ubicaciones';

        producer.on('ready',function(arg){
            var value= Buffer.from(JSON.stringify(data));
            var key= null;
            var partition= 2;
            var header= [ { header: "Ubicacion"}]

            console.log(producer.produce(topic,partition,value,key,Date.now(),header))
        });

        producer.connect();

} */

export function ubicacion(data,partition){
    const producer= new Kafka.Producer({
        'metadata.broker.list':'localhost:9092',
        'dr_cb':true
    });

    const topic= 'ubicaciones';

    producer.on('ready',function(arg){
        var value= Buffer.from(JSON.stringify(data));
        var key= null;
        var header=[{ header: "Ubicacion carrito"}]

        console.log(producer.produce(topic,partition,value,key,Date.now(),header))
    });

    producer.connect();
}

