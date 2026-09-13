import config from "../../config/config.js";
import amqlib from "amqplib";

let channel,connection;

export async function connect(){

    if(connection) return connection;

    try {
        
        connection=await amqlib.connect(config.RABBIT_URL)
        console.log("Connected to RabbitMQ")
        channel=await connection.createChannel();
    } catch (error) {
        console.error("Error connecting to RabbitMQ:",error);
    }
}

export async function publishToQueue(queueName,data={}) {
    if(!channel || !connection) await connect();

    await channel.assertQueue(queueName,{durable:true});
    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)));
    console.log("Message sent to queue",queueName,data);
    
}