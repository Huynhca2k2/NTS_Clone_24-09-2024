export class ObjectUtils {
  /**
   * Remove all properties that have empty value like: ```'', null, 'null', undefine```
   * @param obj {any} Object need execute
   * @returns {any} Object after clear empty properties
   */
  static RemoveEmpty(obj: any) {
    Object.keys(obj).forEach((k) => (obj[k] == '' || obj[k] == null || obj[k] == 'null' || obj[k] == undefined) && delete obj[k]);
    return obj;
  }

  static SetQueryParams(obj: any) {
    if (obj && Object.keys(obj).length > 0) {
      return `?${Object.keys(obj)
        .filter((key) => {
          return obj[key] != null && obj[key].toString() != '' && obj[key] != undefined && obj[key] != 'null';
        })
        .map((key) => {
          return [key, encodeURIComponent(obj[key])].join('=');
        })
        .join('&')}`;
    } else {
      return '';
    }
  }
}
