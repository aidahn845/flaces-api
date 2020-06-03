import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// get all projects (expensive)
export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,

    /*ProjectionExpression: "title, description",
    FilterExpression: "active = :active",
    ExpressionAttributeValues: {
         ":active": true
    }*/
  };

  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return result.Items;
});