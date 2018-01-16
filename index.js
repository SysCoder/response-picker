'use strict';
var hashGen = require("shorthash");

class RepsonsePicker {
  constructor(trackingObject) {
    this.trackingObject = trackingObject;
  }
  
  pickResponse(prompts) {
    if (prompts.length === 1) {
      return prompts[0];
    }
    let promptHash = hashGen.unique(prompts.toString());
    
    // Initialize data object for list of prompts.
    if (this.trackingObject[promptHash] === undefined) {
      let promptTrackingData = new Array(prompts.length).fill(0);
      this.trackingObject[promptHash] = {
        promptTrackingData: promptTrackingData,
        lastPromptLocation: promptTrackingData,
      };
    }
    
    let promptTrackingData = this.trackingObject[promptHash]["promptTrackingData"];
    let lastPromptLocation = this.trackingObject[promptHash]["lastPromptLocation"];
    
    let filterFromPrompt = undefined;
    let prompt = undefined;
    // Reset tracking data once all prompts have been used.
    // Exclude the last prompt index so repeats will not happen.
    if (promptTrackingData.indexOf(0) === -1) {
      // Pick any element except the one that was picked last
      prompt = getRandomPromptUsingFilter(prompts, lastPromptLocation);
      filterFromPrompt = addPromptIndexToNewFilter(prompt, prompts);
      promptTrackingData.fill(0);
      promptTrackingData = unionFilters(promptTrackingData, filterFromPrompt);
    } else {
      prompt = getRandomPromptUsingFilter(prompts, promptTrackingData);
      filterFromPrompt = addPromptIndexToNewFilter(prompt, prompts);
      promptTrackingData = unionFilters(promptTrackingData, filterFromPrompt);
    }
    
    this.trackingObject[promptHash] = {
      promptTrackingData: promptTrackingData,
      lastPromptLocation: filterFromPrompt,
    };
    return prompt;
  }

  getTrackingObject() {
    return this.trackingObject;
  }
}

function getRandomPromptUsingFilter(prompts, filter) {
  let filteredPrompts = prompts.filter((x, i) => !filter[i]);
  return filteredPrompts[Math.floor(Math.random() * (filteredPrompts.length))];
}

function addPromptIndexToNewFilter(prompt, prompts) {
  return prompts.map(x => (x === prompt) ? 1 : 0);
}

function unionFilters(firstFilter, secondFilter) {
  return firstFilter.map((x, i) => (x || secondFilter[i]) ? 1 : 0);
}

exports.RepsonsePicker = RepsonsePicker;