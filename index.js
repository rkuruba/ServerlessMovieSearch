const request = require('request');
const AWS = require('aws-sdk');

exports.handler=async function(event, context, callback){

  
const res = await request.get('https://www.omdbapi.com/?t=Gladiator&y=&plot=short&apikey=trilogy', { statusCode: 200,
 body: "OMDB Data response",
 headers: {
   "Access-Control-Allow-Origin":"*",
   "content-type": "application/json"
 }})

 
 const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
      // Add your DynamoDB table name here
      TableName: "movie_search",
      Item: {
          name: 'movie',
          type: "HTTP",
          title: "Gladiator",
          timestamp: (new Date().getTime()).toString
      }
  };
  docClient.put(params, function(err, data) {
    console.log("****entred put function****");
      if (err) {
          console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      }
      else {
          console.log("Added item:", JSON.stringify(data, null, 2));
      }
      callback(null, 'SAM development complete');
  });


  return res;
  
}
