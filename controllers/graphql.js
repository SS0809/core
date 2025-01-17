const { Pool } = require('pg');
require('dotenv').config();


const { get2redis } = require('../redis/redis_data.js');
/*
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
*/


const typeDefs = `
  scalar JSON
  scalar JSONObject
  type Series {
    series_name: String!
    moviename_ref: JSON  
    img_data: String
  }
  type Movie {
    _id: JSONObject
    drive_code: String
    movie_name: String!
    size_mb: String
    streamtape_code: String
    doodstream_code: String
    is_series: Boolean
    img_data: JSON  
    is_reported: Int
    telegram: String
    gofile: String
  }
  type Query {
    movie(movie_name: String!): Movie
    movieseries(movie_name: String!): Movie
    series(series_name: String!): Series    
    allMovieNames( offset: Int , limit: Int): [String!]!
    allSeriesNames: [String!]!
    totalsize: JSONObject!
    movieSearch(query: String!): [Movie!]!
    version: String!
  }
  type Mutation {
    report(movie_name: String!): Movie
  }
`;

const resolvers = {
  Query: {
    movie: async (_, { movie_name }, {movies_collection})  => {
     /* try {
        const query = 'SELECT * FROM moviedata WHERE movie_name = $1 AND is_series = false;';
        const values = [movie_name];
        const result = await pool.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error executing query', error);
        throw new Error('Error retrieving movie');
      }*/
      try {
        const query1 = { movie_name: movie_name, is_series: false};
        let telecoreData = await movies_collection.findOne(query1);
        console.log(telecoreData);
        return telecoreData;
      } catch (error) {
        console.error(error);
        throw error;
      }    
    },
    movieseries: async (_, { movie_name } , {movies_collection}) => {
      /*try {
        const query = 'SELECT * FROM moviedata WHERE movie_name = $1 ;';
        const values = [movie_name];
        const result = await pool.query(query, values);
        console.log('result', result.rows[0]);
        return result.rows[0];
      } catch (error) {
        console.error('Error executing query', error);
        throw new Error('Error retrieving movie');
      }*/
      try {
        const query1 = { movie_name: movie_name };
        let telecoreData = await movies_collection.findOne(query1);
        console.log(telecoreData);
        return telecoreData;
      } catch (error) {
        console.error(error);
        throw error;
      }    
    },
    series: async (_, { series_name } ,{series_collection}) => {
      /*try {
        const query = 'SELECT * FROM series WHERE series_name = $1 ';
        const values = [series_name];
        const result = await pool.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error executing query', error);
        throw new Error('Error retrieving movie');
      }*/
      try {
        const query1 = { series_name: series_name };
        let telecoreData = await series_collection.findOne(query1);
        console.log(telecoreData);
        return telecoreData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    allMovieNames: async (_, { offset , limit }, {movies_collection}) => {
      /* try {
         const query = 'SELECT movie_name FROM moviedata WHERE is_series = false;';
         const result = await pool.query(query);
         return result.rows.map(row => row.movie_name);
       } catch (error) {
         console.error('Error executing query', error);
         throw new Error('Error retrieving movie names');
       }*/
       try {
        (offset == null) ? offset = 0 : offset = offset;    // to make it compatible with older version of client also
        (limit == null) ? limit = 0 : limit = limit;    // to make it compatible with older version of client also
         const query1 = { is_series: false };
         const projection = {
           _id: 0,
           drive_code: 0,
           size_mb: 0,
           streamtape_code: 0,
           doodstream_code: 0,
           is_series: 0,
           img_data: 0,
           is_reported: 0,
           telegram: 0,
           admin: 0,
           message_id: 0
         };
         const result = await movies_collection.find(query1).skip( offset ).limit( limit ).project(projection).toArray();
         const movieNames = result.map(item => item.movie_name);
         console.log(movieNames);
         return movieNames;
       } catch (error) {
         console.error(error);
         throw error;
       }  
     },
    allSeriesNames: async (_, __, {series_collection}) => {
      /*try {
        const query = 'SELECT series_name FROM series ';
        const result = await pool.query(query);
        return result.rows.map(row => row.series_name);
      } catch (error) {
        console.error('Error executing query', error);
        throw new Error('Error retrieving movie names');
      }*/
      try {
        const projection = { _id: 0, series_name: 1 };
        const result = await series_collection.find({}, projection).toArray();
        const seriesNames = result.map(item => item.series_name);
        console.log(seriesNames);
        return seriesNames;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    totalsize: async (_, __, {movies_collection ,series_collection}) => {
      /*try {
        const query = 'SELECT SUM(size_mb) as total_size FROM moviedata';
        const result = await pool.query(query);
        const totalSize = result.rows[0].total_size; // Get the total_size from the first row

        return totalSize; // Wrap the totalSize in a JSONObject
      } catch (error) {
        console.error('Error executing query', error);
        throw new Error('Error retrieving movie names');
      }*/
      try {
        const pipeline = [
          {
            $group: {
              _id: null,
              total_size: { $sum: "$size_mb" }
            }
          },
          {
            $project: {
              _id: 0
            }
          }
        ];
        const result = await movies_collection.aggregate(pipeline).toArray();
        if (result.length > 0) {
          const totalSize = result[0].total_size;
          console.log("Total Size (MB):", totalSize);
          return totalSize;
        } else {
          console.log("No documents found");
          return 0;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    version:async () => {
      /*try {
        const query = 'SELECT version FROM blackhole_version';
        const result = await pool.query(query);
        return result.rows[0].version;
      } catch (error) {
        console.error('Error executing query', error);
      }*/
      try {
        return await get2redis("version");
      } catch (error) {
        console.error('Error executing redis query', error);
      }
    },
    movieSearch: async (_, { query } , {movies_collection}) => {
      try {  // TODO IN MONGODB
        /*
        const searchQuery = `%${query.toLowerCase()}%`;
        const sqlQuery = 'SELECT * FROM moviedata WHERE lower(movie_name) LIKE $1';
        const result = await pool.query(sqlQuery, [searchQuery]);
        return result.rows;*/
        const searchQuery = new RegExp(query, 'i'); // Case-insensitive search
        const result = await movies_collection.find({ movie_name: searchQuery }).limit(5).toArray();
        return result;
      } catch (error) {
        console.error('Error executing query', error);
        throw new Error('Error searching movies');
      }
    },
  },
Mutation: {
  report: async (_,{ movie_name } , {movies_collection}) => {
    /*try {
      const query = 'UPDATE moviedata SET is_reported = is_reported + 1 WHERE movie_name = $1 RETURNING *';
      const values = [movie_name];
      const result = await pool.query(query, values);
      return result.rows[0]; // Access the is_reported value from the first row
    } catch (error) {
      console.error('Error executing query', error);
      throw new Error('Error reporting movie');
    }*/
    try {
      const filter = { movie_name: movie_name };
      const update = { $inc: { is_reported: 1 } }; // Increment is_reported by 1
      const result = await movies_collection.updateOne(filter, update);
      if (result.modifiedCount === 1) {
        // Document updated successfully, now fetch the updated document
        const updatedDocument = await movies_collection.findOne(filter);
        console.log(updatedDocument);
        return updatedDocument;
      } else {
        console.log("No document updated");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
},

};

module.exports = {typeDefs ,resolvers};