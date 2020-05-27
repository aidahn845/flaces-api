import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.userTableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: uuid.v1(),
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: "111-222-3333",
      title: data.title,
      organization: "USF",
      image: "",
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});
