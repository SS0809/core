const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = '';
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db("CORE");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();
    const limit = parseInt(event.queryStringParameters && event.queryStringParameters.limit) || 20;
    const offset = parseInt(event.queryStringParameters && event.queryStringParameters.offset) || 0;
    let response;

    if (event.queryStringParameters.tele_data) {
      response = await db.collection("tele_data").find({}).limit(limit).toArray();
    } else if (event.queryStringParameters.movies) {
      response = await db.collection("movies").find({}).limit(limit).toArray();
    } else if (event.queryStringParameters.series) {
      response = await db.collection("series").find({}).limit(limit).toArray();
    } else if (event.queryStringParameters.user1_to_bot) {
      response = await db.collection("user1_to_bot").find({}).limit(limit).toArray();
    } else if (event.queryStringParameters.blackhole_js) {
      response = await db.collection("movies").find({}).skip( offset ).limit(limit).toArray();      
    } else {
      response = "use ? tele_data, movies, or series ,user1_to_bot in queryStringParameters to true";
    }

    const responseObject = {
      statusCode: 200,
      body: JSON.stringify(response),
    };

    return responseObject;
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
///enabled cors for * at api gateway aws