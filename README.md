# FE23_Individuella - Amanda Cyrus

http://message-board-superheroes.s3-website.eu-north-1.amazonaws.com/

| Anrop       | Route           | Resultat |
| ------------- |:-------------:| -----:|
| POST      | /messages | Postar ett meddelande på anslagstavlan |
| PUT      | /booking{id} | Uppdaterar specifikt meddelande |
| GET      | /messages | Ser hela anslagstavlan med befintliga meddelanden |


  POST - https://k4uqnvfm1j.execute-api.eu-north-1.amazonaws.com/dev/messages
  GET - https://k4uqnvfm1j.execute-api.eu-north-1.amazonaws.com/dev/messages
  PUT - https://k4uqnvfm1j.execute-api.eu-north-1.amazonaws.com/dev/messages/{id}


  ** POST: **  
### Path: /messages

#### Body: 

| Command | Description |
| --- | --- |
| "username": | "The Flash" |
| "text": | "Vrooom vroooom" | 

#### At success:
| {
	"message": "Message posted successfully!"
} | 

#### At fail:
| {
	"message": "Internal server error"
} | 

  ** PUT: **  
### Path: /messages{id}

#### Body: 

| Command | Description |
| --- | --- |
| "text": | "TUUUT TUUUUT här kommer jag" |


#### At success:
| {
	"message": "Message updated successfully!",
	"result": {
		"Attributes": {
			"text": "TUUUT TUUUUT här kommer jag"
		}
	}
} | 
#### At fail:
| {
	"message": "Missing Authentication Token"
} | 

