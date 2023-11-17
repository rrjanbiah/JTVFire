import fetch from "node-fetch";
import jdebug from "../debug.mjs";

let catche = {};

const getProgramId = async (id, start, end) => {
  jdebug("getProgramId", id, start, end);
  if (catche[`${id}-${start}-${end}`]) {
    return catche[`${id}-${start}-${end}`];
  }
  try {
    let day = getDayOffset(start);
    let r = await fetch(
      `https://jiotv.data.cdn.jio.com/apis/v1.3/getepg/get?channel_id=${id}&offset=${day}&langId=6`
    );
    const { epg } = await r.json();
    for (let i = 0; i < epg.length; i++) {
      const element = epg[i];
      if (
        element["startEpoch"] >= start &&
        element["endEpoch"] >= end &&
        !element["endEpoch"] > start
      ) {
        catche[`${id}-${start}-${end}`] = element["srno"];

        return element["srno"];
      }
    }
    return "231110144020"; // dummy value
  } catch (error) {
    return "231110144020"; // dummy value
  }
};

function getDate(ep = Date.now()) {
  const d = new Date(ep);
  return d.getDate();
}

// Returns 0 for current day, -1 for previous day and so on
function getDayOffset(epochTimestamp) {
  epochTimestamp = Number(epochTimestamp);
  const currentTimestamp = Date.now();
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const currentDay = Math.floor(currentTimestamp / millisecondsPerDay);
  const targetDay = Math.floor(epochTimestamp / millisecondsPerDay);

  const dayOffset = targetDay - currentDay;
  jdebug(`Day offset: ${dayOffset}`);
  return dayOffset;
}

export default getProgramId;
