import { convertMinutesToReadableTime } from "../utils/time.js"
/**
 * @author samdealy, bhaviksingh
 * @description Parses tsvObjects and returns them in the correct format, based on parseFormat
 * @param {Array<Array<String>>} tsvParseResults
 * @return {Array<ClipDataObject> or Array<CollectionDataObject} formattedParseData
 */
export default function formatParseData(tsvParseResults, /* optional */ parseFormat = "clip") {
    if (parseFormat == "collections") {
        return formatParseDataAsCollections(tsvParseResults);
    } else if (parseFormat == "clip") {
        return formatParseDataAsClips(tsvParseResults);
    }
}

/**
 * @author samdealy
 * @description transforms a tsvPraseResult into an array of ClipDataObjects the
 * clipDataObject & collectionDataObject keys correspond to the TSV file's column headers.
 * NOTE: If we add columns to the {@link https://docs.google.com/spreadsheets/d/1mFq_t7V6XY60zDM9IT-wQ2hBTGN8pjjs1zKvj7TG79w/edit#gid=845076906|spreadsheet},
 *   then we will need to add keys to this object
 * @param {Array<Array<String>>} tsvParseResults 
 */
function formatParseDataAsClips(tsvParseResults) {
    const clipDataObjectsArrayWithTitle = tsvParseResults.data.map((data, i) => {
        console.log(data);
        return new ClipDataObject(
            /* id= */
            data[1],
            /* partNumber= */
            data[2],
            /* fileName= */
            data[3],
            /* title= */
            data[4],
            /* director= */
            data[5],
            /* modalText = */
            data[6],
            /* duration= */
            data[7],
            /* either time/collectionID */
            data[0]
        );
    });
    /*
     * Slice to get rid of the first entry,
     * which is the TSV's column title
     */
    const formattedParseData = clipDataObjectsArrayWithTitle.slice(1);
    return formattedParseData;
}


/**
 * @author samdealy
 * @description Finds a clipDataObject for a given number of minutes past midnight.
 * @see {@link ./Readme.md} for more information
 * @param {Array<ClipDataObject>} formattedParseData
 * @param {Number} minutesPastMidnight
 * @return {ClipDataObject} clipDataObject
 */
export function findClipDataObject(formattedParseData, minutesPastMidnight) {
    const indexOfClipObject = findCurrentClipIndex(minutesPastMidnight);
    const clipDataObject = formattedParseData[indexOfClipObject];
    return clipDataObject;
}

/**
 * @author samdealy
 * @description Finds the current clip's index in the formattedParseData. The currentClipIndex
 * also represents one less than the number video it is for the day.
 *   E.g. If current clip index is 5, then it's the 6th video of the day.
 * @param {Number} minutesPastMidnight
 * @return {Number} currentClipIndex
 */
export function findCurrentClipIndex(minutesPastMidnight) {
    return Math.floor(minutesPastMidnight / 15);
}

function formatParseDataAsCollections(tsvParseResults) {
    const collectionDataObjectsWithTitle = tsvParseResults.data.map((data, i) => {
        return new CollectionDataObject(
            /* id= */
            data[0],
            /* name= */
            data[1],
            /* details */
            data[2],
            /* time */
            data[3]
        )
    });
    const formattedParseData = collectionDataObjectsWithTitle.slice(1);
    return formattedParseData;
}


/**
 * @author samdealy
 * @description Represents a clip's data fields. We get these fields
 *   from the columns on the {@link https://docs.google.com/spreadsheets/d/1mFq_t7V6XY60zDM9IT-wQ2hBTGN8pjjs1zKvj7TG79w/edit#gid=845076906 | schedule google sheet}
 */
class ClipDataObject {
    /**
     * @param {String} id - the video's unique ID
     * @param {String} partNumber - can be 1,2,3,4. Signifies which 15 minute chunk of the file to seek too when determining playback start time. @see {@link ../video_page/Readme.md|Video Page Readme}
     * @param {String} fileName - the name of the mp3 file
     * @param {String} title - the title name ot be displayed while video plays
     * @param {String} director
     * @param {String} modalText - the text that will appear in the modal
     * @param {String} duration - duration of entire file, not just the 15 min clip. Will also be used in modal.
     * @param {String} collectionID - id of a collection. will be overloaded by time in some cases, but not used then
     */
    constructor(id, partNumber, fileName, title, director, modalText, duration, collectionID) {
        this.id = id;
        this.partNumber = partNumber;
        this.fileName = fileName;
        this.title = title;
        this.director = director;
        this.modalText = modalText;
        this.duration = duration;
        this.collectionID = collectionID; //Note
    }

    getDOMElement() {
        let parentContainer = document.createElement("div");
        parentContainer.innerHTML = this.fileName + " " + this.collectionID + " " + convertMinutesToReadableTime(this.duration);
        return parentContainer;
    }
}




/**
 * @author bhaviksingh
 * @description Represents information for a  collection
 */
class CollectionDataObject {

    /**
     * @param {String} id - the unique ID for the collection
     * @param {String} name - the name for the collection
     * @param {String} details - the details to display about collection
     * @param {String} length - the time in minutes for the collections videos.
     */
    constructor(id, name, details, duration) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.duration = duration;
    }


    getDOMElement() {
        let parentContainer = document.createElement("div");
        parentContainer.innerHTML = this.name + " " + this.details + " " + convertMinutesToReadableTime(this.duration);
        return parentContainer;
    }
}