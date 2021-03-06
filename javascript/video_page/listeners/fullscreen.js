/* Div stands for html "div" element. */
const enterFullScreenDivElement = document.getElementById("enter-fullscreen");
const exitFullScreenDivElement = document.getElementById("exit-fullscreen");

/**
 * @author samdealy
 * @description Register both the enter and exit fullscreen listeners
 * @param {null}
 * @return {null}
 */
export default function registerFullScreenListeners() {
  registerEnterFullScreenListener();
  registerExitFullScreenListener();
}

/**
 * @author samdealy
 * @description Register the enter fullscreen listener
 * @listens onClick
 * @param {null}
 * @return {null}
 */
function registerEnterFullScreenListener() {
  enterFullScreenDivElement.addEventListener("click", (e) => {
    toggleFullScreen(
      requestFullscreenCallback,
      enterFullScreenDivElement,
      exitFullScreenDivElement,
      e
    );
  });
}

/**
 * @author samdealy
 * @description Register the exit fullscreen listener
 * @listens onClick
 * @param {null}
 * @return {null}
 */
function registerExitFullScreenListener() {
  exitFullScreenDivElement.addEventListener("click", (e) => {
    toggleFullScreen(
      exitFullscreenCallback,
      exitFullScreenDivElement,
      enterFullScreenDivElement,
      e
    );
  });
}

/**
 * @author samdealy
 * @description Prevent the default action on the event obejct.
 * Call the provided browser callback. For the div that was clicked,
 * change its display to none. Make visible the other
 * div (that wasn't clicked).
 * @param {Function} browserCallback
 * @param {Element<Div>} clickedDivElement
 * @param {Element<Div>} divElementToDisplay
 * @param {Event} eventObject
 */
function toggleFullScreen(
  browserCallback,
  clickedDivElement,
  divElementToDisplay,
  eventObject
) {
  eventObject.preventDefault();
  browserCallback();
  clickedDivElement.style.display = "none";
  divElementToDisplay.style.display = "inline";
}

/**
 * @author giuseppeFurcolo
 * @callback
 * @description Handle DOM enter fullscreen requests for each browswer.
 * @param {null}
 * @return{null}
 */
let requestFullscreenCallback = () => {
  const documentElement = document.documentElement;
  if (documentElement.requestFullscreen) {
    documentElement.requestFullscreen();
  } else if (documentElement.webkitRequestFullscreen) {
    documentElement.webkitRequestFullscreen();
  } else if (documentElement.mozRequestFullScreen) {
    documentElement.mozRequestFullScreen();
  } else if (documentElement.msRequestFullscreen) {
    documentElement.msRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};

/**
 * @author giuseppeFurcolo
 * @callback
 * @description Handle DOM exit fullscreen requests for each browswer
 * @param {null}
 * @return {null}
 */
let exitFullscreenCallback = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};
