export class UrlUtils {
  /**
   * Convert an Object to Query String
   *
   * @param {{ [key: string]: string }} [params={}] Query Params
   * @returns {string}
   */
  static query(
    params: { [key: string]: any },
    includeLoop: boolean = false
  ): string {
    if (params && Object.keys(params).length > 0) {
      return `?${Object.keys(params)
        .filter((key) => {
          return (
            params[key] != null &&
            params[key].toString() != "" &&
            params[key] != undefined &&
            params[key] != "null"
          );
        })
        .map((key: string) => {
          if (includeLoop) {
            if (
              typeof params[key] === "string" &&
              params[key].split("|").length > 1
            ) {
              const arr: Array<string> = [];
              params[key].split("|").forEach((str: string) => {
                arr.push(`${key}=${encodeURIComponent(str)}`);
              });
              return arr.join("&");
            }
          }
          return [key, encodeURIComponent(params[key])].join("=");
        })
        .join("&")}`;
    } else {
      return "";
    }
  }

  /**
   * Merge variables to URL with Query Params
   *
   * @export
   * @param {string} host - API Host
   * @param {string} prefix - API Prefix
   * @param {string} version - API Version
   * @param {string} endpoint - API Endpoint
   * @param {{ [key: string]: any }} [queryParams=null] URL Query Params
   * @returns {string}
   */
  static mergeWithHost(
    host: string,
    prefix: string,
    version: string,
    endpoint: string,
    queryParams: { [key: string]: any } = {}
  ) {
    const array = [
      host,
      prefix,
      version,
      endpoint,
      UrlUtils.query(queryParams),
    ].filter((str) => !!str);

    return array.join("/");
  }

  /**
   * Merge variables to URL with Query Params
   *
   * @export
   * @param {string} prefix - API Prefix
   * @param {string} version - API Version
   * @param {string} endpoint - API Endpoint
   * @param {{ [key: string]: any }} [queryParams=null] URL Query Params
   * @returns {string}
   */
  static merge(
    prefix: string,
    version: string | undefined,
    endpoint: string,
    queryParams: { [key: string]: any } = {}
  ) {
    const array = [prefix, version, endpoint].filter((str) => !!str);
    return `/${array.join("/")}${UrlUtils.query(queryParams)}`;
  }
}

UrlUtils.query({});
