import DEV_CONSTANTS from "./dev_constants.js";
import PROD_CONSTANTS from "./prod_constants.js";
import { DAYS_OF_THE_WEEK } from "./shared_constants.js";

/**
 * @description Is true if you are in a local development environment
 * @type {Boolean}
 */
let areYouInDevelopment = window.location.hostname === "localhost";
// let areYouInDevelopment = false;

/**
 * @author samdealy
 * @description Returns correct url for the current day of the week.
 * @param {String} dayString
 * @return {String} url
 */
export default function determineTSV_URL(dayString) {
  const tsvSheetURLsByDay = createTSVSheetURLsByDay();
  return tsvSheetURLsByDay[dayString];
}

/**
 * @author samdealy
 * @description Creates an object that holds the url for each day's sheet. If in
 * 	development, uses the development schedule's Google Sheet. If in
 * 	production, uses the production schedule's Google Sheet.
 * @param {null}
 * @return {Object} tsvSheetURLsByDay
 */
export function createTSVSheetURLsByDay() {
  let [
    firstPartOfUrl,
    secondPartOfUrl,
    idNumbers,
  ] = determineDevOrProdConstants();
  const tsvSheetURLsByDay = {};
  DAYS_OF_THE_WEEK.forEach((day) => {
    tsvSheetURLsByDay[day] = firstPartOfUrl + idNumbers[day] + secondPartOfUrl;
  });
  return tsvSheetURLsByDay;
}

/**
 * @author samdealy
 * @description Determines which array of constants to use.
 * @param {null}
 * @return {Array<String>} contants
 */
function determineDevOrProdConstants() {
  return areYouInDevelopment ? DEV_CONSTANTS : PROD_CONSTANTS;
}

/**
 * @author bhaviksingh
 * @description Given a collectionTab (either info or videos), return a URL
 * @param {String} collectionTab
 * @return {String} url
 */
function determineCollectionURL(collectionTab) {
  let [
    firstPartOfUrl,
    secondPartOfUrl,
    idNumbers,
  ] = determineDevOrProdConstants();
  let collectionTabID = idNumbers[collectionTab];
  let collectionURL = firstPartOfUrl + collectionTabID + secondPartOfUrl;
  return collectionURL;
}

/**
 * @author bhaviksingh
 * @description Returns correct url for all videos within all collections
 * @param null
 * @return {String} url
 */
export function determineCollectionVideos_URL() {
  return determineCollectionURL("collectionVideos");
}

/**
 * @author bhaviksingh
 * @description Returns correct url for all collection info
 * @param null
 * @return {String} url
 */
export function determineCollectionInfo_URL() {
  return determineCollectionURL("collectionInfo");
}
