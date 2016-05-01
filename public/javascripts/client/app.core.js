{
  'use strict';

  // state/variable cache
  let endPoint,
      ajax,
      apiContents,
      vegaView;

  init();

  // wire up API fetching
  function init() {
    endPoint = 'http://mysafeinfo.com/api/data?list=fatalaccidentsbycounty_2013_wa&format=json&select=yr,st,cd,cty,cnt,sp,ttl&alias=yr=year,st=state_code,cd=county_code,cty=county_name,cnt=fatal_accidents,sp=speeding,ttl=total_fatalities';
    ajax = new XMLHttpRequest();
    ajax.onload = mapDataToScreen; // normalizes response text for vega-lite visualization
    ajax.open('GET', endPoint, true);
    ajax.send();
  }

  // maps contents of API to the view via vega-lite general visualizations
  function mapDataToScreen() {
    apiContents = JSON.parse(this.responseText);

    // conduct vega wireup here
    let specs = {
      "data": {
        "values": apiContents // apiContents expected to be in array
      },
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "county_name",
          "type": "nominal",
          "axis": {
            "title": "County"
          }
        },
        "y": {
          "field": "fatal_accidents",
          "type": "quantitative",
          "axis": {
            "title": "Deaths"
          }
        }
      },
      "config": {
        "mark": {
          "filled": true,
          "color": "#23E363"
        }
      }
    }

    let embeddedSpecs = {
      mode: "vega-lite",
      spec: specs
    }

    vg.embed("#vgtarget", embeddedSpecs, (error, result) => {
      // result.views ready for usage
      vegaView = result.view;
    });
  }
}
