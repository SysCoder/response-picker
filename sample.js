var ResponsePicker = require("./index.js").ResponsePicker;

let responses = ["Hi", "Hello", "Hey"];
let trackerObject = {};
let responsePicker = new ResponsePicker(trackerObject);

for (let i = 0;i < 15;i++) {
    console.log(responsePicker.pickResponse(responses));
}

console.log("Tracker object: " + JSON.stringify(trackerObject));