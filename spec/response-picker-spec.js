describe("Response Picker", function() {
  var ResponsePicker = require('../index').ResponsePicker;

  it("should not repeat responses when triggered the same amount of times as the list of elements",
    function() {
     let trackingObject = {};
     let responsePool = [`Hello world`, `what is the color`, `computer`,
         `meltdown`, `spectre`, `computer chips`, `processor`,
         `virus`, `hacker`, `vulnerability`];
     let responsePicker = new ResponsePicker(trackingObject);
     let responses = [];
     
     for(let i = 0;i < 10;i++) {
        responses.push(responsePicker.pickResponse(responsePool));
     }

     expect(countMaxDuplicates(responses)).toEqual(0);
  });
  
  it("should not produce word consecutively",
    function() {
     let trackingObject = {};
     let responsePool = [`Hello world`, `what is the color`, `computer`,
         `meltdown`, `spectre`, `computer chips`, `processor`,
         `virus`, `hacker`, `vulnerability`];
     let responsePicker = new ResponsePicker(trackingObject);
     let responses = [];
     
     for(let i = 0;i < 100;i++) {
        responses.push(responsePicker.pickResponse(responsePool));
     }

     expect(hasDuplicatesNextToEachOther(responses)).toEqual(false);
  });
  
  function hasDuplicatesNextToEachOther(responses) {
      for (let i = 1;i < responses.length;i++) {
          if (responses[i] === responses[i - 1]) {
              return true;
          }
      }
      return false;
  }
  
  it("should repeat all responses at most 5 times with a 4 element array and invoked 20 times",
    function() {
     let trackingObject = {};
     let responsePool = [`Hello world`, `what is the color`, `computer`,
         `meltdown`];
     let responsePicker = new ResponsePicker(trackingObject);
     let responses = [];
     
     for(let i = 0;i < 100;i++) {
        responses.push(responsePicker.pickResponse(responsePool));
     }
     expect(countMaxDuplicates(responses)).toEqual(24);
  });
  
  it("should keep track of two response lists and not repeat responses from both list",
    function() {
     let trackingObject = {};
     let responsePoolHello = [`Hello there`, `Hello`, `Hi`, `Howdy`, `Hey`];
     let responsePoolGoodbye = [`Goodbye`, `Bye`, `Bye Bye`, `See you later!`,
         `Chao`];
     let responsePicker = new ResponsePicker(trackingObject);
     let helloResponses = [];
     let goodbyeResponses = [];
     
     for(let i = 0;i < 5;i++) {
        helloResponses.push(responsePicker.pickResponse(responsePoolHello));
        goodbyeResponses.push(responsePicker.pickResponse(responsePoolGoodbye));
     }
     expect(countMaxDuplicates(helloResponses)).toEqual(0);
     expect(countMaxDuplicates(goodbyeResponses)).toEqual(0);
  });
  
  it("should keep track of responses in different languages",
    function() {
     let trackingObject = {};
     let responsePoolChinese = [`雜碎`, `炒`, `圍棋`, `茄汁`, `唔可以`];
     let responsePicker = new ResponsePicker(trackingObject);
     let chineseResponses = [];
     
     for(let i = 0;i < 5;i++) {
        chineseResponses.push(responsePicker.pickResponse(responsePoolChinese));
     }
     expect(countMaxDuplicates(chineseResponses)).toEqual(0);
  });
  
  it("should give the tracking object and be able to use the same object in another ResponsePicker instance",
    function() {
     let trackingObject = {};
     let responsePoolHello = [`Hello there`, `Hello`, `Hi`, `Howdy`, `Hey`];
     let responsePicker = new ResponsePicker(trackingObject);
     let helloResponses = [];
     
     for(let i = 0;i < 4;i++) {
        helloResponses.push(responsePicker.pickResponse(responsePoolHello));
     }
     let newTrackingOjbect = JSON.parse(JSON.stringify(trackingObject));
     let newResponsePicker = new ResponsePicker(newTrackingOjbect);
     
     let responseFromNewResponsePicker = newResponsePicker.pickResponse(responsePoolHello);
     let resposneFromOldResponsePicker = responsePicker.pickResponse(responsePoolHello);
     
     expect(responseFromNewResponsePicker).toEqual(resposneFromOldResponsePicker);
  });
  
  it("should behave in a sensible way when there are only two responses in the list",
    function() {
     let trackingObject = {};
     let responsePool = [`Hello world`, `what is the color`];
     let responsePicker = new ResponsePicker(trackingObject);
     let responses = [];
     
     for(let i = 0;i < 8;i++) {
        responses.push(responsePicker.pickResponse(responsePool));
     }
     expect(countMaxDuplicates(responses)).toEqual(3);
  });
  
  it("should behave in a sensible way when there are only one response in the list",
    function() {
     let trackingObject = {};
     let responsePool = [`Hello world`];
     let responsePicker = new ResponsePicker(trackingObject);
     let responses = [];
     
     for(let i = 0;i < 8;i++) {
        responses.push(responsePicker.pickResponse(responsePool));
     }
     expect(countMaxDuplicates(responses)).toEqual(7);
  });
    
  it("should throw an exception with an empty list",
    function() {
     let responsePicker = new ResponsePicker({});
     expect(() => responsePicker.pickResponse([])).toThrow();
  });
  
  it("should throw an exception with an array",
    function() {
     let responsePicker = new ResponsePicker({});
     expect(() => responsePicker.pickResponse("house")).toThrow();
  });
});

function countMaxDuplicates(listOfStrings) {
    listOfStrings.sort();
    let maxNumDuplicates = 0;
    let lastElement = undefined;
    listOfStrings.reduce((accumulator, currentValue) => {
        let reVal = 0;
        if (lastElement === currentValue) {
            reVal = accumulator + 1;
            maxNumDuplicates = Math.max(maxNumDuplicates, reVal);
            lastElement = currentValue;
            return reVal;
        }
        lastElement = currentValue;
        return reVal;
    }, 0);
    return maxNumDuplicates;
}

