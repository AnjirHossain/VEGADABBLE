'use strict';

// run array.prototype.filter function to return matching county details for provided county name
let countyCursor = (allCounties, countyToFind) => {
  return allCounties.filter((currentValue) => {
    return currentValue.county_name === countyToFind;
  });
}

module.exports = countyCursor;
