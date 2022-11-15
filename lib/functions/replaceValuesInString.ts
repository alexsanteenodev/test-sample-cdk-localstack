/**
 * Accepts a string and an object with key value pairs. Example:
 *    string:   "https://<subdomain>.example.com"
 *    obj:      {"subdomain": "mysub"}
 *    result:   "https://mysub.example.com
 * @param dataString
 * @param obj
 */
const replaceValuesInString = (dataString: string, obj: object): string => {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue
    }

    dataString = dataString.replace(`<${key}>`, obj[key as keyof typeof obj])
  }
  return dataString
}

export default replaceValuesInString
