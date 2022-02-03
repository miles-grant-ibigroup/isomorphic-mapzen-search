import { stringify } from 'qs';
import { normalize, fromCoordinates } from '@conveyal/lonlat';

if (typeof fetch === 'undefined') {
  require('isomorphic-fetch');
}

const mapzenUrl = 'https://search.mapzen.com/v1';
const autocompleteUrl = `${mapzenUrl}/autocomplete`;
const reverseUrl = `${mapzenUrl}/reverse`;
const searchUrl = `${mapzenUrl}/search`;
/**
 * Search for and address using
 * Mapzen's {@link https://mapzen.com/documentation/search/autocomplete/|Autocomplete}
 * service.
 *
 * @param {Object} $0
 * @param  {string} $0.apiKey                     The Mapzen API key
 * @param  {Object} $0.boundary
 * @param  {Object} $0.focusPoint
 * @param  {boolean} $0.format
 * @param  {string} $0.layers                     a comma-separated list of
 *   {@link https://mapzen.com/documentation/search/autocomplete/#layers|layer types}
 * @param  {Object} $0.options                    options to pass to fetch (e.g., custom headers)
 * @param  {string} [$0.sources='gn,oa,osm,wof']
 * @param  {string} $0.text                       query text
 * @param {string} [$0.url='https://search.mapzen.com/v1/autocomplete']                       optional URL to override Mapzen autocomplete endpoint
 * @return {Promise}                              A Promise that'll get resolved with the autocomplete result
 */

function autocomplete({
  apiKey,
  boundary,
  focusPoint,
  format,
  layers,
  options,
  sources = 'gn,oa,osm,wof',
  text,
  url = autocompleteUrl
}) {
  // build query
  const query = {
    api_key: apiKey,
    text
  };
  if (sources && sources.length > 0) query.sources = sources;

  if (layers) {
    query.layers = layers;
  }

  if (focusPoint) {
    const {
      lat,
      lon
    } = normalize(focusPoint);
    query['focus.point.lat'] = lat;
    query['focus.point.lon'] = lon;
  }

  if (boundary) {
    if (boundary.country) query['boundary.country'] = boundary.country;

    if (boundary.rect) {
      query['boundary.rect.min_lat'] = boundary.rect.minLat;
      query['boundary.rect.min_lon'] = boundary.rect.minLon;
      query['boundary.rect.max_lat'] = boundary.rect.maxLat;
      query['boundary.rect.max_lon'] = boundary.rect.maxLon;
    }
  }

  return run({
    format,
    options,
    query,
    url
  });
}
/**
 * Search for an address using
 * Mapzen's {@link https://mapzen.com/documentation/search/search/|Search}
 * service.
 *
 * @param {Object} $0
 * @param {string} $0.apiKey                    The Mapzen API key
 * @param {Object} $0.boundary
 * @param {Object} $0.focusPoint
 * @param {boolean} $0.format
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param {number} [$0.size=10]
 * @param {string} [$0.sources='gn,oa,osm,wof']
 * @param {string} $0.text                      The address text to query for
 * @param {string} [$0.url='https://search.mapzen.com/v1/search']                     optional URL to override Mapzen search endpoint
 * @return {Promise}                            A Promise that'll get resolved with search result
 */

function search({
  apiKey,
  boundary,
  focusPoint,
  format,
  options,
  size = 10,
  sources = 'gn,oa,osm,wof',
  text,
  url = searchUrl
}) {
  if (!text) return Promise.resolve([]);
  const query = {
    api_key: apiKey,
    size,
    text
  };
  if (sources && sources.length > 0) query.sources = sources;

  if (focusPoint) {
    const {
      lat,
      lon
    } = normalize(focusPoint);
    query['focus.point.lat'] = lat;
    query['focus.point.lon'] = lon;
  }

  if (boundary) {
    if (boundary.country) query['boundary.country'] = boundary.country;

    if (boundary.rect) {
      query['boundary.rect.min_lat'] = boundary.rect.minLat;
      query['boundary.rect.min_lon'] = boundary.rect.minLon;
      query['boundary.rect.max_lat'] = boundary.rect.maxLat;
      query['boundary.rect.max_lon'] = boundary.rect.maxLon;
    }
  }

  return run({
    format,
    options,
    query,
    url
  });
}
/**
 * Reverse geocode using
 * Mapzen's {@link https://mapzen.com/documentation/search/reverse/|Reverse geocoding}
 * service.
 *
 * @param {Object} $0
 * @param {string} $0.apiKey                    The Mapzen API key
 * @param {boolean} $0.format
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param {{lat: number, lon: number}} $0.point Point to reverse geocode
 * @param {string} [$0.url='https://search.mapzen.com/v1/reverse']                     optional URL to override Mapzen reverse endpoint
 * @return {Promise}                            A Promise that'll get resolved with reverse geocode result
 */

function reverse({
  apiKey,
  format,
  options,
  point,
  url = reverseUrl
}) {
  const {
    lat,
    lon
  } = normalize(point);
  return run({
    format,
    options,
    query: {
      api_key: apiKey,
      point: {
        lat,
        lon
      }
    },
    url
  });
} // TODO: turn this into one large async function?
// TODO: replace Array<Object> with more specific output once tests work

function run({
  format = false,
  options,
  query,
  url = searchUrl
}) {
  return fetch(`${url}?${stringify(query, {
    allowDots: true
  })}`, options).then(res => res.json()).then(json => {
    let jsonResponse = json;

    if (json && json.features && format) {
      jsonResponse = json.features.map(split);
    }

    jsonResponse.isomorphicMapzenSearchQuery = query;
    return jsonResponse;
  });
}

function split({
  geometry,
  properties
}) {
  return Object.assign({}, properties, {
    address: `${properties.label}${properties.postalcode ? ' ' + properties.postalcode : ''}`,
    latlng: fromCoordinates(geometry.coordinates)
  });
}

const toExport = {
  autocomplete,
  reverse,
  search
};

export default toExport;
export { autocomplete, reverse, search };
//# sourceMappingURL=isomorphic-mapzen-search.esm.js.map
