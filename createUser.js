//import * as uuid from "uuid";
//import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = async (event, context) => {
  console.log(event);

  if (event.request.userAttributes.sub) {

    const params = {
      TableName: process.env.userTableName,
      Item: {
        userId: event.request.userAttributes.sub,
        userName: event.userName,
        lastName: event.request.userAttributes["custom:lastname"],
        firstName: event.request.userAttributes["custom:firstname"],
        email: event.request.userAttributes.email,
        //phone: "111-222-3333",
        //title: data.title,
        //organization: "USF",
        role: "user",
        createdAt: Date.now()
      }
    };

    try {
      await dynamoDb.put(params);
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);

  } else {
    console.log("Error: Nothing was written to DDB or SQS");
    context.done(null, event);
  }
};
