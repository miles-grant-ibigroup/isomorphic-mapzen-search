import type { LonLatInput, LonLatOutput } from '@conveyal/lonlat';
declare type Rect = {
    maxLat: number;
    maxLon: number;
    minLat: number;
    minLon: number;
};
declare type Boundary = {
    country: string;
    rect: Rect;
};
declare type Query = {
    api_key: string;
    apiKey?: string;
    boundary?: Boundary;
    focusPoint?: LonLatInput;
    format?: boolean;
    layers?: string;
    options?: RequestInit;
    point?: GeoJSON.Point | LonLatOutput;
    size?: number;
    sources?: string;
    text?: string;
    url?: string;
};
declare type JSONArrayPromise = Promise<Array<JSON>>;
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
export declare function autocomplete({ apiKey, boundary, focusPoint, format, layers, options, sources, text, url }: Query): JSONArrayPromise;
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
export declare function search({ apiKey, boundary, focusPoint, format, options, size, sources, text, url }: Query): JSONArrayPromise;
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
export declare function reverse({ apiKey, format, options, point, url }: Query): JSONArrayPromise;
declare const toExport: {
    autocomplete: typeof autocomplete;
    reverse: typeof reverse;
    search: typeof search;
};
export default toExport;
