import app from './src/app.js';
import {connect} from './src/broker/broker.js'
import startlistner from './src/broker/listner.js'

connect().then(startlistner);


app.listen(3001,()=>{
    console.log('Auth server is running on port 3001 ');

})