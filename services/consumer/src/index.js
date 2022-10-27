import Kafka from 'node-rdkafka';
const consumer= new Kafka.KafkaConsumer({
  'group.id': 'kafka-admin',
  'metadata.broker.list': 'localhost:9092'
},{});

consumer.connect();

consumer.on('ready',()=>{
  consumer.subscribe(['miembros']);
  consumer.consume();
}).on('data',async (data)=>{
  const value= JSON.parse(data.value.toString())
  console.log(JSON.stringify(value));
})

consumer.disconnect();

consumer.connect();
var cliente=0
var promedio=0
var sopaipillas=0

consumer.on('ready',()=>{
  consumer.subscribe(['ventas']);
  consumer.consume();
  setInterval(function(){
    if(cliente!=0){
      promedio= sopaipillas/cliente;
    }
    consumer.consume(5200000);
  },10*1000);
}).on('data',async(data)=>{
  const value= JSON.parse(data.value.toString())
  console.log("venta",JSON.stringify(value));
})

consumer.disconnect();

consumer.connect();

var stock=[]

consumer.on('ready',()=>{
  consumer.subscribe(['ventas']);
  consumer.consume();
}).on('data',async(data)=>{
  if(data.partition == 2){
    const value= JSON.parse(data.value.toString())
    if(stock.length != 20){
      stock.push(value);
    }else{
      console.log("stock: ", JSON.stringify(value))
    }
  }
  const value= JSON.parse(data.value.toString())
  console.log(JSON.stringify(value));
})

consumer.disconnect();

