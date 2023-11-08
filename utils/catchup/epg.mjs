import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import fs from "fs";

import jdebug from "../debug.mjs";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new JsonDB(new Config("channel-epg.db", true, false, "/"));

// Returns 0 for current day, -1 for previous day and so on
function getDayOffset(epochTimestamp) {
  epochTimestamp = Number(epochTimestamp);

  // const epochTimestamp = 1698517800000;
  const date = new Date(epochTimestamp);
  const dateTimeString = date.toLocaleString();

  jdebug(`${epochTimestamp} in IST ${dateTimeString}`);
  // Get the current date in the local time zone (IST)
  const currentDate = new Date();
  const currentOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() + currentOffset);

  // Set the date to the beginning of the day for both the provided date and the current date
  date.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the time difference in milliseconds
  const timeDifference = date - currentDate;

  // Calculate the day offset by dividing the time difference by the number of milliseconds in a day
  const dayOffset = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  jdebug(`Day offset: ${dayOffset}`);
  return dayOffset;
}

export function getEpgLookupKey(id, epochTimestamp) {
    const yyymmddString = epochTS2yyyymmdd(epochTimestamp);
    return `${id}-${yyymmddString}`;
}

// return date from the timestamp for lookup key
export function epochTS2yyyymmdd(epochTimestamp) {
  epochTimestamp = Number(epochTimestamp);

  jdebug(`epochTS2yyyymmdd(${epochTimestamp})`);
  // const epochTimestamp = 1698517800000;
  const date = new Date(epochTimestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const yyymmddString = `${year}${month}${day}`;

  jdebug("yyymmddString", yyymmddString);
  return yyymmddString;
}

export async function getEpg(id, start) {
  id = Number(id);
  start = Number(start);

  let data = (await db.getData("/epg")) || {};
  const lookupKey = getEpgLookupKey(id, start);
  jdebug(`data[lookupKey -> ${lookupKey}]`, data[lookupKey]);
  if (data[lookupKey] != undefined) {
    data = data[lookupKey];
  } else {
    const dayOffset = getDayOffset(start);
    const url = `https://jiotv.data.cdn.jio.com/apis/v1.3/getepg/get?channel_id=${id}&offset=${dayOffset}&langId=6`;
    var options = {
      method: "GET",
      headers: {
        Accept: "*/*",
        "User-Agent": "plaYtv/7.0.8 (Linux;Android 9) ExoPlayerLib/2.11.7",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
      },
    };
    let response = await fetch(url, options);
    jdebug("url", url, "options", options, "response", response);
    if (response.status != 200) {
      return {
        status: false,
        data: `Status ${response.status}`,
      };
    }
    data = JSON.parse(await response.text());
    data = data.epg;
    await db.push("/epg/" + lookupKey, data);
    // jdebug("data (from Url)", data);
  }

  const epgData = data.find((epg) => epg.startEpoch == start) || {};
  jdebug("epgData", epgData);
  return {
    status: true,
    data: epgData,
  };
}
