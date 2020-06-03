import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,

    Item: {
      projectId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      active: true,
      title: data.title,
      description: data.description,
      status: data.status,
      category: data.category,
      mode: data.mode,
      district: data.district,
      lead: data.lead,
      organization: data.organization,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
      geom: data.geom,
      dataFiles: data.dataFiles,
      imageFiles: data.imageFiles,
      createdAt: Date.now()
    }
  };

  // add project members: projectId, userId, name?, email?, role

  await dynamoDb.put(params);

  return params.Item;
});
