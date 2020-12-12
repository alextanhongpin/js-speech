const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

const colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral"
];
const grammar =
  "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";
console.log(grammar);

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onstart = function() {
  console.log("Listening, try speaking into the microphone.");
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function(event) {
  console.log("I didnt recognise that color", event);
};

recognition.onerror = function(event) {
  console.log("An error occurred in recognition", event.error);
};

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  const confidence = event.results[0][0].confidence;
  document.getElementById("output").innerHTML = transcript;
  // Example of using the speech to convert to change background color.
  document.body.style.backgroundColor = transcript;
  console.log({ transcript, confidence });
};

document
  .getElementById("speak")
  .addEventListener("click", () => recognition.start(), false);
