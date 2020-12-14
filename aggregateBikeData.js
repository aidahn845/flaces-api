require('es6-promise').polyfill();
import fetch from "isomorphic-fetch";
import handler from "./libs/handler-lib";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const gbfs = [
  {
    "city": "Aventura",
    "operator": "BCycle",
    "latitude": 0,
    "longitude": 0,
    "gbfs": "https://gbfs.bcycle.com/bcycle_aventura/gbfs.json"
  },
  {
    "city": "Fort Lauderdale",
    "operator": "BCycle",
    "latitude": 0,
    "longitude": 0,
    "gbfs": "https://gbfs.bcycle.com/bcycle_broward/gbfs.json"
  },
  {
    "city": "St. Petersburg",
    "operator": "Coast",
    "latitude": 0,
    "longitude": 0,
    "gbfs": "http://coast.socialbicycles.com/opendata/gbfs.json"
  },
  {
    "city": "Miami",
    "operator": "HOPR",
    "latitude": 0,
    "longitude": 0,
    "gbfs": "https://gbfs.hopr.city/api/gbfs/11/"
  },
  {
    "city": "Orlando",
    "operator": "HOPR",
    "latitude": 0,
    "longitude": 0,
    "gbfs": "https://gbfs.hopr.city/api/gbfs/12/"
  },
  {
    "city": "Tampa",
    "operator": "HOPR",
    "latitude": 0,
    "longitude": 0,
    "gbfs": "https://gbfs.hopr.city/api/gbfs/8/"
  }
];

//https://citibikemiami.com/downtown-miami-locations2.xml


export const main = handler(async (event, context) => {
  var networks;
  try {
    const response = await fetch('https://api.citybik.es/v2/networks');
    const json = await response.json();
    networks = json.networks;
  } catch (e) {
    console.log(e);
    return e;
  }

  try {
    const params = {
      Bucket: "aces-uploads",
      Key: "public/api/data.json",
      Body: JSON.stringify(networks)
    };

    const res = await s3.putObject(params).promise();

    console.log('complete:', res);
  } catch (e) {
    console.log('error:', e);
    return e;
  }

  //return networks;
});
