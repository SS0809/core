import requests

def get_link_by_name():
    api_url = 'https://api.streamtape.com/file/listfolder?login=f65b540c475b9b7d4da8&key=268XaKDBLqTZ2kg'
    target_file_name = "randomfile.mp4"

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception for 4xx and 5xx status codes

        data = response.json()  # Parse the response JSON
        files = data['result']['files']
        for file in files:
            if file['name'] == target_file_name:
                return file['link']

        return None  # Return None if the file with the given name is not found

    except requests.exceptions.RequestException as error:
        # Handle request-related errors here
        print('Error:', error)
        return None  # Return None in case of an error
    except ValueError as error:
        # Handle JSON parsing errors here
        print('JSON Parsing Error:', error)
        return None  # Return None in case of a JSON parsing error

link = get_link_by_name()
print(link)