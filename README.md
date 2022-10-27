# Kafka NodeJS Example

## Introduction
This repository showcases a simple example of using Kafka with NodeJS. In this example the producer push a testing message onto the test_topic (in Kafka) while the consumer consumes the message and print it.

## Instructions
This demonstration assumes you already have `docker` and `docker-compose` installed. The steps are as follows:

1) Using `docker-compose`, spin up all containers (Zookeeper, Kafka, Producer and Consumer):
```
docker-compose up
```

## Para levantar topicos

docker-compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 --config retention.ms=259200000 --topic auth

## Para listar topicos
docker-compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list