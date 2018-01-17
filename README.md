# Response Picker

## Summary
Response Picker picks and keeps track of previous responses given to the user from a list.
When building a VUI, some responses you may want to vary like greetings and exits.

## Example
With the following list: ["Hello", "Hi", "Hey", "Howdy"]

Without Response Picker - Random:
* Response 1: "Hi"
* Response 2: "Hi",
* Response 3: "Hello",
* Response 4: "Howdy",
* Response 5: "Hello",

Response Picker - Random with memory:
* Response 1: "Hi",
* Response 2: "Howdy",
* Response 3: "Hello"
* Response 4: "Hey",
* Response 5: "Howdy"

Just using random, you have a 1 in 4 chance of following up a subsequent response with the same response.
Response Picker prevents this by keeping track of the last response and exausting the list of responses before repeating a response.  

## Usage
### Install using NPM:

```npm install --save response-picker```

### Add Response Picker to your code:
```
var RepsonsePicker = require('response-picker').RepsonsePicker;

let responses = ["Hi", "Hello", "Hey"];
let trackerObject = {};
let responsePicker = new RepsonsePicker(trackerObject);

for (let i = 0;i < 15;i++) {
    console.log(responsePicker.pickResponse(responses));
}

console.log("Tracker object: " + JSON.stringify(trackerObject));
```
