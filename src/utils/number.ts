export class NumberUtils {
  /**
   * Convert number to string with leading by zeros
   * @param num {number} Number need convert
   * @param places {number} String length
   * @returns {string}
   */
  static ZeroPad(num: number, places: number = 1): string {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

  /**
   * Check veriable is valid number
   * @param {*} num - Number need check
   * @returns {boolean}
   */
  static IsValidNumber(num: any) {
    return typeof num === 'number';
  }
}
