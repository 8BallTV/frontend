import parseTSV from "../parser/index.js";
import scheduleClipLoads from "./schedule_clip_loads.js";
import registerListeners from "./listeners/index.js";

registerListeners();
parseTSV(scheduleClipLoads);
