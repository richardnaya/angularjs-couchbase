/**
 * Created by julianghionoiu on 16/09/2014.
 */

/**
 * A basic utility method that doubles the value of a number.
 * Used only for testing purposes
 * @param num
 * @returns {number}
 */
exports.calculate = function (num) {
    if (typeof num === 'number') {
        return num * 2;
    }
    else {
        throw new Error('Expected a number');
    }
};