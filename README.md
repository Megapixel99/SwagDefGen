# Built on top of: [SwagDefGen](https://github.com/Roger13/SwagDefGen)
This is a NPM module to help build Swagger documents. It converts JSON requests and responses to Swagger definitions.
* Supports all swagger types
* Detects int32 and int64 formats
  * Added unsafe format to integers that use more than 64 bits
* Detects date and date-time formats according to [ISO 8601](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14)
* Allows nested objects and arrays
* Supports nullable fields
* Allows mock values to be added as example in description

Example Usage:
```javascript
const { convert } = require('swag-def-gen');

const myData = [{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/1/1.jpg",
    "https://cdn.dummyjson.com/product-images/1/2.jpg",
    "https://cdn.dummyjson.com/product-images/1/3.jpg",
    "https://cdn.dummyjson.com/product-images/1/4.jpg",
    "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
  ]
}, {
  "id": 2,
  "title": "iPhone X",
  "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
  "price": 899,
  "discountPercentage": 17.94,
  "rating": 4.44,
  "stock": 34,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/2/1.jpg",
    "https://cdn.dummyjson.com/product-images/2/2.jpg",
    "https://cdn.dummyjson.com/product-images/2/3.jpg",
    "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
  ]
}, {
  "id": 3,
  "title": "Samsung Universe 9",
  "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
  "price": 1249,
  "discountPercentage": 15.46,
  "rating": 4.09,
  "stock": 36,
  "brand": "Samsung",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/3/1.jpg"
  ]
}, {
  "id": 4,
  "title": "OPPOF19",
  "description": "OPPO F19 is officially announced on April 2021.",
  "price": 280,
  "discountPercentage": 17.91,
  "rating": 4.3,
  "stock": 123,
  "brand": "OPPO",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/4/1.jpg",
    "https://cdn.dummyjson.com/product-images/4/2.jpg",
    "https://cdn.dummyjson.com/product-images/4/3.jpg",
    "https://cdn.dummyjson.com/product-images/4/4.jpg",
    "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
  ]
}];

const addExamples = true; // defaults to true if nothing is passed in.
const nullType = 'null'; // defaults to 'null' if nothing is passed in.

console.log(convert, addExamples, nullType);
```

Running the above example should output:
```json
{
  "0": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "format": "int32", "example": 1 },
      "title": { "type": "string", "example": "iPhone 9" },
      "description": {
        "type": "string",
        "example": "An apple mobile which is nothing like apple"
      },
      "price": { "type": "integer", "format": "int32", "example": 549 },
      "discountPercentage": { "type": "number", "format": "float", "example": 12.96 },
      "rating": { "type": "number", "format": "float", "example": 4.69 },
      "stock": { "type": "integer", "format": "int32", "example": 94 },
      "brand": { "type": "string", "example": "Apple" },
      "category": { "type": "string", "example": "smartphones" },
      "thumbnail": {
        "type": "string",
        "example": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "string",
          "example": "https://cdn.dummyjson.com/product-images/1/1.jpg"
        }
      }
    },
    "example": {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      "images": [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
      ]
    }
  },
  "1": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "format": "int32", "example": 2 },
      "title": { "type": "string", "example": "iPhone X" },
      "description": {
        "type": "string",
        "example": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ..."
      },
      "price": { "type": "integer", "format": "int32", "example": 899 },
      "discountPercentage": { "type": "number", "format": "float", "example": 17.94 },
      "rating": { "type": "number", "format": "float", "example": 4.44 },
      "stock": { "type": "integer", "format": "int32", "example": 34 },
      "brand": { "type": "string", "example": "Apple" },
      "category": { "type": "string", "example": "smartphones" },
      "thumbnail": {
        "type": "string",
        "example": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "string",
          "example": "https://cdn.dummyjson.com/product-images/2/1.jpg"
        }
      }
    },
    "example": {
      "id": 2,
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      "images": [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
      ]
    }
  },
  "2": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "format": "int32", "example": 3 },
      "title": { "type": "string", "example": "Samsung Universe 9" },
      "description": {
        "type": "string",
        "example": "Samsung's new variant which goes beyond Galaxy to the Universe"
      },
      "price": { "type": "integer", "format": "int32", "example": 1249 },
      "discountPercentage": { "type": "number", "format": "float", "example": 15.46 },
      "rating": { "type": "number", "format": "float", "example": 4.09 },
      "stock": { "type": "integer", "format": "int32", "example": 36 },
      "brand": { "type": "string", "example": "Samsung" },
      "category": { "type": "string", "example": "smartphones" },
      "thumbnail": {
        "type": "string",
        "example": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "string",
          "example": "https://cdn.dummyjson.com/product-images/3/1.jpg"
        }
      }
    },
    "example": {
      "id": 3,
      "title": "Samsung Universe 9",
      "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
      "price": 1249,
      "discountPercentage": 15.46,
      "rating": 4.09,
      "stock": 36,
      "brand": "Samsung",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      "images": [ "https://cdn.dummyjson.com/product-images/3/1.jpg" ]
    }
  },
  "3": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "format": "int32", "example": 4 },
      "title": { "type": "string", "example": "OPPOF19" },
      "description": {
        "type": "string",
        "example": "OPPO F19 is officially announced on April 2021."
      },
      "price": { "type": "integer", "format": "int32", "example": 280 },
      "discountPercentage": { "type": "number", "format": "float", "example": 17.91 },
      "rating": { "type": "number", "format": "float", "example": 4.3 },
      "stock": { "type": "integer", "format": "int32", "example": 123 },
      "brand": { "type": "string", "example": "OPPO" },
      "category": { "type": "string", "example": "smartphones" },
      "thumbnail": {
        "type": "string",
        "example": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "string",
          "example": "https://cdn.dummyjson.com/product-images/4/1.jpg"
        }
      }
    },
    "example": {
      "id": 4,
      "title": "OPPOF19",
      "description": "OPPO F19 is officially announced on April 2021.",
      "price": 280,
      "discountPercentage": 17.91,
      "rating": 4.3,
      "stock": 123,
      "brand": "OPPO",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      "images": [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
      ]
    }
  }
}
```
