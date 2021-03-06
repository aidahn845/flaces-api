import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// TODO: check if user is admin (all projects) or not (user projects)

// get all projects created by userId
export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    IndexName : process.env.userIndexName,

    KeyConditionExpression: "#userId = :v_userId",
    ExpressionAttributeNames:{
        "#userId": "userId"
    },
    ExpressionAttributeValues: {
        ":v_userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});