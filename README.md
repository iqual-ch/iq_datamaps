

# iq_datamaps
  
A basic wrapper for Map Integrations using [DataMaps](http://datamaps.github.io/).
  

## Background

Every now and then, we need to implement some sort of map functionality that cannot be achieved using Google maps. DataMaps provides a powerfull, highly customizable framework for any kind of map functionalities. The purpous of this module is to provide a basic wrapper to easily integrate DataMaps into web projects. 

## Usage

The modul provides a Drupal library containing all necessary assets:

    iq_datamaps/datamaps_base
It can be attached like any other drupal library. Besided the DataMaps distribution it contains very basic map and tooltip styling and a JS class to interact with DataMaps JS: `iqDataMapsWrapper`.
  
### The iqDataMapsWrapper Class
Create a new JS object from the iqDataMapsWrapper class:

    let mapObject = new iqDataMapsWrapper(element);
element: DOM Container element that will hold the map.

The `iqDataMapsWrapper` provides a set of base settings for DataMaps to print a basic world map and the following methods:


##  clearSettings() 
Removes all base settings. DataMap's defaults are now applied.

**Kind**: public function


##  clearSettings() 
Removes all base settings. DataMap's defaults are now applied.

**Kind**: public function

##  restoreBaseSettings() 
Restores base settings.

**Kind**: public function

##  setScope(scope) 
Restores base settings.

**Kind**: public function
| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| scope  | <code>string</code> | 3-digit country code of scope. |


##  initMap(scope) ⇒ <code>DataMaps Object</code>
Prints a map with a given set of custom settings.

**Kind**: public function
| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| settings  | <code>Object</code> | Custom DataMaps settings. |


##  initMap(scope) ⇒ <code>DataMaps Object</code>
Uses `initMap()` to print a responsive map with a given set of custom settings.

**Kind**: public function
| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| settings  | <code>Object</code> | Custom DataMaps settings. |


## Use-cases / examples

Print a (responsive) world map:

    let element = document.getElementById('map-wrapper');
    let dataMap = new  iqDataMapsWrapper(element);
    dataMap.initResponsiveMap();

Highlight countries on world map:

    let element = document.getElementById('map-wrapper');
    let dataMap = new  iqDataMapsWrapper(element);
    let highlights = {
      'CHE': {fillKey:  'active'},
    }
    dataMap.initResponsiveMap({data:  highlights});

Print a swiss map

    let element = document.getElementById('map-wrapper');
    let dataMap = new  iqDataMapsWrapper(element);
    dataMap.setScope('che');
    dataMap.initResponsiveMap({
      setProjection:  function (element) {
        let  scaleFactor = element.offsetWidth * 12.5;
        var  projection = d3.geo.mercator()
          .center([8.2, 46.8182])
          .scale(scaleFactor)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var  path = d3.geo.path().projection(projection);
        return { path:  path, projection:  projection };
      }
    });

Print a swiss map with markers

    let element = document.getElementById('map-wrapper');
    let dataMap = new  iqDataMapsWrapper(element);
    let mapMarkers = [
      {
        'radius': 5,
        'latitude': 46.9376,
        'longitude': 7.3950,
        'tooltip_content':  "<strong>Oh, hi Marc!</strong>",
        'fillKey': 'active'
      }
    ];
    dataMap.setScope('che');
    dataMap.initResponsiveMap({
      setProjection:  function (element) {
        let  scaleFactor = element.offsetWidth * 12.5;
        var  projection = d3.geo.mercator()
          .center([8.2, 46.8182])
          .scale(scaleFactor)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var  path = d3.geo.path().projection(projection);
        return { path:  path, projection:  projection };
      }
    }).bubbles(mapMarkers, {
      popupTemplate:  function (geo, data) {
        return  '<div class="map-tooltip">' + data.tooltip_content + '</div>';
      },
      highlightFillColor:  'var(--map-color-active)',
      highlightBorderColor:  'var(--map-color-active)',
    });
