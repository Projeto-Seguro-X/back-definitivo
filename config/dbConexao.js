const mongoose = require('mongoose');


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS



async function conectarBanco(){
   await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.i26sooe.mongodb.net/?retryWrites=true&w=majority`)
   return
}

// export default {
//     conectarBanco 
// } 

// export  conectarBanco;
module.exports = conectarBanco;