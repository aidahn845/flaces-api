import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  let arr = [];
  let names = {};
  let vals = {};

  if (data.title) {
    arr.push("#title = :v_title");
    names["#title"] = "title";
    vals[":v_title"] = data.title;
  }
  if (data.shortTitle) {
    arr.push("#shortTitle = :v_shortTitle");
    names["#shortTitle"] = "shortTitle";
    vals[":v_shortTitle"] = data.shortTitle;
  }
  if (data.description) {
    arr.push("#description = :v_description");
    names["#description"] = "description";
    vals[":v_description"] = data.description;
  }
  if (data.status) {
    arr.push("#status = :v_status");
    names["#status"] = "status";
    vals[":v_status"] = parseInt(data.status);
  }
  if (data.category) {
    arr.push("#category = :v_category");
    names["#category"] = "category";
    vals[":v_category"] = data.category;
  }
  if (data.mode) {
    arr.push("#mode = :v_mode");
    names["#mode"] = "mode";
    vals[":v_mode"] = data.mode;
  }
  if (data.lead) {
    arr.push("#lead = :v_lead");
    names["#lead"] = "lead";
    vals[":v_lead"] = data.lead;
  }
  if (data.organization) {
    arr.push("#organization = :v_organization");
    names["#organization"] = "organization";
    vals[":v_organization"] = data.organization;
  }
  if (data.startDate) {
    arr.push("#startDate = :v_startDate");
    names["#startDate"] = "startDate";
    vals[":v_startDate"] = data.startDate;
  }
  if (data.endDate) {
    arr.push("#endDate = :v_endDate");
    names["#endDate"] = "endDate";
    vals[":v_endDate"] = data.endDate;
  }
  if (data.location) {
    arr.push("#location = :v_location");
    names["#location"] = "location";
    vals[":v_location"] = data.location;
  }
  if (data.geom) {
    arr.push("#geom = :v_geom");
    names["#geom"] = "geom";
    vals[":v_geom"] = data.geom;
  }
  if (data.dataFiles) {
    arr.push("#dataFiles = :v_dataFiles");
    names["#dataFiles"] = "dataFiles";
    vals[":v_dataFiles"] = data.dataFiles;
  }
  if (data.imageFiles) {
    arr.push("#imageFiles = :v_imageFiles");
    names["#imageFiles"] = "imageFiles";
    vals[":v_imageFiles"] = data.imageFiles;
  }
  if (data.district) {
    arr.push("#district = :v_district");
    names["#district"] = "district";
    vals[":v_district"] = data.district;
  }
  arr.push("#statewide = :v_statewide");
  names["#statewide"] = "statewide";
  vals[":v_statewide"] = data.statewide === true;

  arr.push("#updatedAt = :v_updatedAt");
  names["#updatedAt"] = "updatedAt";
  vals[":v_updatedAt"] = Date.now();

  if (arr.length > 0) {
    const exp = "SET " + arr.join(", ");

    const params = {
      TableName: process.env.tableName,

      Key: {
        projectId: event.pathParameters.id,
        //userId: event.requestContext.identity.cognitoIdentityId
        //userId: data.userId // allow admin user to edit user projects
      },

      UpdateExpression: exp,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: vals,
      // 'ReturnValues' specifies if and how to return the item's attributes,
      // where ALL_NEW returns all attributes of the item after the update; you
      // can inspect 'result' below to see how it works with different settings
      ReturnValues: "ALL_NEW"
    };

    await dynamoDb.update(params);
  }

  return { status: true };
});