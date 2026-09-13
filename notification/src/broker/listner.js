import { subcribeToQueue } from "../broker/broker.js";
import sendEmail from "../utils/email.js";

function startlistner(){

    subcribeToQueue("User_Created",async(data)=>{
        console.log(data)
        const {email,role,fullname:{firstname,lastname}}=data

     const emailTemplate=`
     <h1>Welcome to Spotify Piper</h1>

     <p>dear ${firstname} ${lastname},</p>

     <p> Thank you for registering with Spotify Piper. We are excited to have you on board</p>
     <br/>

     <p>Your role is: ${role}</p>
<p>We hope you enjoy our services. </p>
<br />
<p>best regards,</p>
<p>Spotify Piper Team</p>
     
     `
     await sendEmail(email,"Welcome to Spotify-Piper","thank you for register with us!",emailTemplate)
        
    })
}


export default startlistner;

