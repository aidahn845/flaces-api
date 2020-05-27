import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      projectId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      active: true,
      title: data.title,
      description: data.description,
      category: [1, 2, 3],
      status: data.status,
      sponsor: "USF",
      startDate: Date.parse("2018-10-10"),
      endDate: Date.parse("2019-2-22"),
      location: {},
      files: ["file1.csv","file2.csv","file3.csv"],
      image: data.image,
      createdAt: Date.now()
    }
  };

  // add project members: projectId, userId, name?, email?, role

  await dynamoDb.put(params);

  return params.Item;
});
