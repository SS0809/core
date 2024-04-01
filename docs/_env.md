# Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

## Required Variables:

- `DB_URI`: [mongoDB URL]
- `REDIS_AUTH_KEY`: [redis URL]
- `PORT`: [port for Node.js]
- `DB_HOST`: [PostgreSQL host]
- `DB_PORT`: [PostgreSQL port]
- `DB_DATABASE`: [PostgreSQL database name]
- `DB_USER`: [PostgreSQL username]
- `DB_PASSWORD`: [PostgreSQL password]

## Non-required Variables:

- `api_id`: [API ID]
- `api_hash`: [API hash]
- `api_id_shah`: [API Shah ID]
- `api_hash_shah`: [API Shah hash]
- `TELECORE_API_ENDPOINT`: [Telecore API endpoint URL]
- `TOKEN`: [Telecore token]

Example `.env` file:

```plaintext
DB_URI=mongodb+srv://your_mongodb_url
REDIS_AUTH_KEY=your_redis_url
PORT=8081
DB_HOST=your_db_host
DB_PORT=5432
DB_DATABASE=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
api_id=your_api_id
api_hash=your_api_hash
api_id_shah=your_api_id_shah
api_hash_shah=your_api_hash_shah
TELECORE_API_ENDPOINT=https://your_telecore_api_endpoint
