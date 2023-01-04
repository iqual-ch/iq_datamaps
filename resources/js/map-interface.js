class iqDataMapsWrapper {

  /**
   * Construct a pagedesigner Effect Manager.
   *
   * @param {Object} element
   *   Container element that will hold the map.
   */
  constructor(element) {
    this.dataMapSettings = this.baseSettings;
    this.dataMapSettings.element = element;
  }

  baseSettings = {
    projection: 'equirectangular',
    scope: 'world',
    fills: {
      defaultFill: 'var(--map-color)',
      active: 'var(--map-color-active)',
    },
    geographyConfig: {
      highlightOnHover: false,
      popupOnHover: true,
      borderColor: 'var(--map-color-border)',
      borderWidth: 0.5,
      popupTemplate: function(geography, data) {
        if (data) {
          return '<div class="map-tooltip"><p><strong>' + Drupal.t(geography.properties.name) + '</strong></p></div>';
        }
      },
    },
  }

  /**
   * Removes all base settings. DataMap's defaults are now applied.
   */
  clearSettings() {
    this.dataMapSettings = {
      element: this.dataMapSettings.element
    };
  }

  /**
   * Restores base settings.
   */
  restoreBaseSettings() {
    let element = this.dataMapSettings.element;
    this.dataMapSettings = this.baseSettings;
    this.baseSettings.element = element;
  }

  /**
   * Sets a scope.
   *
   * @param {String} scope
   *   3-digit country code of scope.
   */
  setScope(scope) {
    this.dataMapSettings.scope = scope;
    this.dataMapSettings.geographyConfig.dataUrl = drupalSettings.iq_datamaps.data_url_base + scope + '.json';
  }

  /**
   * Prints a map with a given set of custom settings.
   *
   * @param {Object} settings
   *   Custom DataMaps settings.
   * @returns {Object}
   */
  initMap(settings) {
    return new Datamap({...this.dataMapSettings, ...settings});
  }

  /**
   * Uses initMap() to print a responsive map with a given set of custom settings.
   *
   * @param {Object} settings
   *   Custom DataMaps settings.
   * @returns {Object}
   */
  initResponsiveMap(settings = {}) {
    settings.responsive = true;
    let datamap = this.initMap(settings);
    window.addEventListener('resize', function(event) {
      datamap.resize();
    });
    return datamap;
  }

}
