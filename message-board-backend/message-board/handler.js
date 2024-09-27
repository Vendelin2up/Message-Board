const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// POST: Skapa ett nytt meddelande
module.exports.postMessage = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    TableName: process.env.MESSAGES_TABLE,
    Item: {
      id: uuidv4(),  // Genererar unikt id
      username: body.username,
      text: body.text,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Tillåt alla origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      },
      body: JSON.stringify({ message: 'Message posted successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Tillåt alla origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      },
      body: JSON.stringify({ error: 'Could not create message', error }),
    };
  }
};

// GET: Hämta alla meddelanden
module.exports.getMessages = async () => {
  const params = {
    TableName: process.env.MESSAGES_TABLE,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Tillåt alla origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      },
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Tillåt alla origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      },
      body: JSON.stringify({ error: 'Could not fetch messages', error }),
    };
  }
};

// PUT: Uppdatera ett meddelande
module.exports.updateMessage = async (event) => {
  const { id } = event.pathParameters;  // Hämta id från URL-parameter
  const body = JSON.parse(event.body);  // Parsear JSON body

  const params = {
    TableName: process.env.MESSAGES_TABLE,
    Key: { id },  // Hitta meddelandet med det här id:t
    UpdateExpression: 'SET #textField = :text',
    ExpressionAttributeNames: {
      '#textField': 'text',  // Mappa "text" till ett alias
    },
    ExpressionAttributeValues: {
      ':text': body.text,  // Uppdatera med ny text
    },
    ReturnValues: 'UPDATED_NEW',  // Returnera de nya värdena efter uppdatering
  };

  try {
    const result = await dynamoDb.update(params).promise();  // Utför uppdateringen i DynamoDB
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Tillåt alla origin (ändra vid behov)
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      },
      body: JSON.stringify({ message: 'Message updated successfully!', result }),  // Returnera lyckat svar
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Tillåt alla origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      },
      body: JSON.stringify({ error: 'Could not update message', error }),  // Returnera fel om något gick fel
    };
  }
};
