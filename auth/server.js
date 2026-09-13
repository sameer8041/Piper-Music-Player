import app from './src/app.js';
import connectdb from './src/db/db.js'
import {connect} from './src/broker/broker.js'
connectdb();
connect();



app.listen(3000,()=>{
    console.log('Auth server is running on port 3000 ');
})