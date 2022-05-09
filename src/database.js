const { connect } = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const MONGODB_URI=process.env.MONGODB_URI || 'mongodb://localhost/testdb' 

(async() => {
    try {
       const db=await connect(MONGODB_URI);
        console.log('db is connected',db.connection.name);
    } catch (error) {
        console.log(error)
    }
   
})();





