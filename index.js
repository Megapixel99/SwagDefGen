exports.convert = (inJSON, examples = true, nullType = 'null') => {
  // ---- Global variables ----
  let outSwagger;
  let tabCount = 0;
  let indentator = '\n';

  // ---- Functions definitions ----
  function changeIndentation(count) {
    /*
  Assign 'indentator' a string beginning with newline and followed by 'count' tabs
  Updates variable 'tabCount' with the number of tabs used
  Global variables updated:
  -identator
  -tabcount
  */

    let i;
    if (count >= tabCount) {
      i = tabCount;
    } else {
      i = 0;
      indentator = '\n';
    }
    for (; i < count; i += 1) {
      indentator += '\t';
    }
    // Update tabCount
    tabCount = count;
  }

  function conversorSelection(obj) {
    /*
    Selects which conversion method to call based on given obj
  Global variables updated:
    -outSwagger
    */

    changeIndentation(tabCount + 1);
    if (typeof obj === 'number') {
      if (obj % 1 === 0) {
        outSwagger += `${indentator}"type": "integer",`;
        if (obj < 2147483647 && obj > -2147483647) {
          outSwagger += `${indentator}"format": "int32"`;
        } else if (Number.isSafeInteger(obj)) {
          outSwagger += `${indentator}"format": "int64"`;
        } else {
          outSwagger += `${indentator}"format": "unsafe"`;
        }
      } else {
        outSwagger += `${indentator}"type": "number",`;
        outSwagger += `${indentator}"format": "float"`;
      }
      if (examples) {
        outSwagger += ',';
        outSwagger += `${indentator}"example": ${obj}`;
      }
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
      outSwagger += `${indentator}"type": "array",`;
      outSwagger += `${indentator}"items": {`;
      if (typeof obj[0] === 'object'
          && !Array.isArray(obj[0])
          && obj[0] !== null) {
        const schema = {};
        obj.forEach((entry) => {
          Object.keys(entry).forEach((key) => {
            if (!Object.keys(schema).includes(key)) {
              schema[key] = entry[key];
            }
          });
        });
        conversorSelection(schema);
      } else if (obj[0]) {
        conversorSelection(obj[0]);
      }
      outSwagger += `${indentator}}`;
    } else if (typeof obj === 'object') {
      if (obj === null) {
        outSwagger += `${indentator}"type": "${nullType}",`;
        outSwagger += `${indentator}"format": "nullable"`;
        return;
      }
      const exampleProps = {};
      // ---- Begin properties scope ----
      outSwagger += `${indentator}"type": "object",`;
      outSwagger += `${indentator}"properties": {`;
      changeIndentation(tabCount + 1);
      // For each attribute inside that object
      Object.keys(obj).forEach((prop) => {
        // ---- Begin property type scope ----
        outSwagger += `${indentator}"${prop}": {`;
        exampleProps[prop] = obj[prop];
        conversorSelection(obj[prop]);
        outSwagger += `${indentator}},`;
        // ---- End property type scope ----
      });

      changeIndentation(tabCount - 1);
      if (Object.keys(obj).length > 0) {
        // At least 1 property inserted
        outSwagger = outSwagger.substring(0, outSwagger.length - 1); // Remove last comma
        outSwagger += `${indentator}}`;
      } else {
        // No property inserted
        outSwagger += ' }';
      }
      if (examples) {
        outSwagger += ',';
        outSwagger += `${indentator}"example": ${JSON.stringify(exampleProps).replaceAll('\n', indentator)}`;
      }
    } else if (typeof obj === 'string') {
      // date is ISO8601 format - https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14
      const regxDate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      const regxDateTime = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]{1,3})?(Z|(\+|-)([0-1][0-9]|2[0-3]):[0-5][0-9])$/;

      outSwagger += `${indentator}"type": "string"`;
      if (regxDateTime.test(obj)) {
        outSwagger += ',';
        outSwagger += `${indentator}"format": "date-time"`;
      } else if (regxDate.test(obj)) {
        outSwagger += ',';
        outSwagger += `${indentator}"format": "date"`;
      }
      if (examples) {
        outSwagger += ',';
        outSwagger += `${indentator}"example": ${JSON.stringify(obj)}`;
      }
    } else if (typeof obj === 'boolean') {
      // attribute is a boolean
      outSwagger += `${indentator}"type": "boolean"`;
      if (examples) {
        outSwagger += ',';
        outSwagger += `${indentator}"example": false`;
      }
    } else {
      // not a valid Swagger type
      throw new Error(`Property type "${typeof obj}" is not valid for Swagger definitions`);
    }
    changeIndentation(tabCount - 1);
  }

  // ---- Execution begins here ----
  // ---- Begin definitions ----
  outSwagger = '{';
  changeIndentation(1);
  // For each object inside the JSON
  Object.keys(inJSON).forEach((obj) => {
    // ---- Begin schema scope ----
    outSwagger += `${indentator}"${obj}": {`;
    conversorSelection(inJSON[obj]);
    outSwagger += `${indentator}},`;
    // ---- End schema scope ----
  });
  // Remove last comma
  outSwagger = outSwagger.substring(0, outSwagger.length - 1);
  // ---- End definitions ----
  changeIndentation(tabCount - 1);
  outSwagger += `${indentator}}`;

  return JSON.parse(outSwagger);
};
