'use strict';
var Cesium = require('cesium');

var defined = Cesium.defined;
var DeveloperError = Cesium.DeveloperError;

module.exports = validateB3dm;

/**
 * Checks if provided buffer has valid b3dm tile contents
 *
 * @param {Buffer} content A buffer containing the contents of a b3dm tile.
 * @returns {Object} An object with two parameters - (1) a boolean for whether the tile is a valid b3dm tile
 *                                                   (2) a message to indicate which tile field is invalid, if any
 */
function validateB3dm(content) {
    if (!defined(content)) {
        throw new DeveloperError('b3dm content must be defined');
    }

    if (!Buffer.isBuffer(content)) {
        throw new DeveloperError('content must be of type buffer');
    }

    var magic = content.toString('utf8', 0, 4);
    var version = content.readUInt32LE(4);
    var byteLength = content.readUInt32LE(8);

    if (magic !== 'b3dm') {
        return {
            result : false,
            message: 'Tile has an invalid magic'
        };
    }

    if (version !== 1) {
        return {
            result : false,
            message: 'Tile has an invalid version'
        };
    }

    if (byteLength !== content.length) {
        return {
            result : false,
            message: 'Tile has the wrong byteLength'
        };
    }

    return {
        result : true,
        message: 'Tile is a valid b3dm tile'
    };

}