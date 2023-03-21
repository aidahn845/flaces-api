import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// get all projects created by userId
export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    IndexName: process.env.userIndexName,

    KeyConditionExpression: "#userId = :v_userId",
    ExpressionAttributeNames: {
      "#userId": "userId"
    },
    ExpressionAttributeValues: {
      ":v_userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  //const result = await dynamoDb.query(params);

  try {
    const result = await dynamoDb.query(params);
    return result.Items;
  } catch (err) {
    console.log("Error", err);
  }

  return null;
});