/**
 * @callback wipeIndex
 * @param {number} i
 * @returns {undefined}
 * @description Given an index will remove it's content from the AsyncArray
 */
/**
 * @callback wipe
 * @returns {undefined}
 * @description Will remove all content from the AsyncArray
 */
/**
 * @callback clone
 * @returns {AsyncArray}
 * @description Will return a new AsyncArray with the same content as the current one
 */

/**
 * @typedef {Object} AsyncArray
 * @property {wipeIndex} wipeIndex
 * @property {wipe} wipe
 * @property {clone} clone
 * @property {function} map
 * @property {function} filter
 * @property {function} reduce
 * @property {function} forEach
 * @property {function} find
 * @property {function} findIndex
 * @property {number} length
 */
