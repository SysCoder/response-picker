var RepsonsePicker = require("./index.js").RepsonsePicker;

let responses = ["Hi", "Hello", "Hey"];
let trackerObject = {};
let responsePicker = new RepsonsePicker(trackerObject);

for (let i = 0;i < 15;i++) {
    console.log(responsePicker.pickResponse(responses));
}

console.log("Tracker object: " + JSON.stringify(trackerObject));