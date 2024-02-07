require('dotenv').config();
const { MongoClient } = require('mongodb');


async function get_telecore_data() {
    const uri = process.env.DB_URI;
    try {
        const uri = process.env.DB_URI;
    let mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        const db = mongoClient.db('telecore');
        const collection = db.collection('telecore_collection');
        let telecoreData = await collection.find().toArray();
        return telecoreData;
    }
        catch(error){
         console.log(error);
        }
}

module.exports = { get_telecore_data };
