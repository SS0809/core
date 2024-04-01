## DATABASE FOR USERS
```SQL
CREATE TABLE users_login_dark_matter (
    name VARCHAR(255),
    email VARCHAR(255) PRIMARY KEY ,
    picture VARCHAR(255),
);
-- Set the starting value of the sequence to 10
ALTER SEQUENCE idd RESTART WITH 10;

ALTER TABLE your_table_name
ADD PRIMARY KEY (your_column_name);


SELECT constraint_name
FROM information_schema.table_constraints
WHERE table_name = 'moviedata' AND constraint_type = 'PRIMARY KEY';
ALTER TABLE moviedata  DROP CONSTRAINT moviedata_pkey;

INSERT INTO users_login_dark_matter (name, email,picture) VALUES ($1, $2 ,$3 );
```


# Movie/Series Data Documentation

This document provides an overview of the fields present in the JSON data related to movies or series.

```JSON
{
  "_id": {
    "$oid": "65d784d62818e0345e3df3b1"
  },
  "drive_code": "1ePq3awjMkIJalxaIEXY7HFqfaiu3YH1H",
  "movie_name": "TheWitcherS01E05",
  "size_mb": 2160,
  "streamtape_code": "aZgYlRa3G6Ix1yM",
  "doodstream_code": "null",
  "is_series": true,
  "img_data": [
    "4eb912b9-0492-4755-8ba7-d5e273850f10",
    "f62dec96-ae1e-4562-8660-4d3567a0f033",
    "7b49bc03-d309-465d-866e-981ae833c91a",
    "b71274c6-aaaf-4775-8dd2-4403e7658bf6",
    "e5fea6d3-de8f-4cb8-930c-335ee5852e35",
    "77b1c1b6-b588-4e0e-af13-ce549bb265fc",
    "e6a67755-b374-476c-86ac-58921f4cda58",
    "42c2182a-7bfa-43e3-a1d5-cd08ea7edd6b  "
  ],
  "is_reported": 0,
  "telegram": "TheWitcherS01E05.mkv",
  "admin": "sudo",
  "message_id": 0
}
```
## Fields

### `_id`
- Description: The unique identifier of the document in the MongoDB collection.
- Type: MongoDB ObjectId
- Example: `65d784d62818e0345e3df3b1`

### `drive_code`
- Description: The code associated with the movie or series in Google Drive.
- Type: String
- Example: `1ePq3awjMkIJalxaIEXY7HFqfaiu3YH1H`

### `movie_name`
- Description: The name of the movie or series.
- Type: String
- Example: `TheWitcherS01E05`

### `size_mb`
- Description: The size of the movie or series in megabytes.
- Type: Number
- Example: `2160`

### `streamtape_code`
- Description: The code associated with the movie or series in Streamtape.
- Type: String
- Example: `aZgYlRa3G6Ix1yM`

### `doodstream_code`
- Description: The code associated with the movie or series in DoodStream.
- Type: String or Null
- Example: `null`

### `is_series`
- Description: A boolean indicating whether the entry represents a series (`true`) or not (`false`).
- Type: Boolean
- Example: `true`

### `img_data`
- Description: An array of image data related to the movie or series.
- Type: Array of Strings
- Example: `["4eb912b9-0492-4755-8ba7-d5e273850f10", "f62dec96-ae1e-4562-8660-4d3567a0f033", ...]`

### `is_reported`
- Description: A flag indicating whether the movie or series has been reported (`1`) or not (`0`).
- Type: Number (0 or 1)
- Example: `0`

### `telegram`
- Description: The name of the file associated with the movie or series on Telegram.
- Type: String
- Example: `TheWitcherS01E05.mkv`

### `admin`
- Description: The administrator associated with the movie or series.
- Type: String
- Example: `sudo`

### `message_id`
- Description: The ID of the message related to the movie or series.
- Type: Number
- Example: `0`
