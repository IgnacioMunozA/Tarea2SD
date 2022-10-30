
## Instrucciones
cd Tarea2SD

1) docker-compose up 
```
## Para levantar topicos

2) docker-compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 --config retention.ms=259200000 --topic nombretopico

# Hay que crear los 3 topicos

## Para listar topicos
3) docker-compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

#instalar dependencias de npm
npm i express
npm i cors
npm i dotenv
npm i kafkajs
npm i body-parser


4) ejecutar el productor

node ./services/producer/index.js

5) realizar solicitudes POST en localhost:3000