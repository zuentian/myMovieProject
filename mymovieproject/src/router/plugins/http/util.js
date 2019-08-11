export const isArray = Array.isArray;

export function isString(val) {
  return typeof val === 'string';
}

export function isBoolean(val) {
  return val === true || val === false;
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export function isBlob(obj) {
  return typeof Blob !== 'undefined' && obj instanceof Blob;
}

export function isFormData(obj) {
  return typeof FormData !== 'undefined' && obj instanceof FormData;
}

export function each(obj, iterator) {

  var i, key;

  if (isArray(obj)) {
      for (i = 0; i < obj.length; i++) {
          iterator.call(obj[i], obj[i], i);
      }
  } else if (isObject(obj)) {
      for (key in obj) {
          if (hasOwnProperty.call(obj, key)) {
              iterator.call(obj[key], obj[key], key);
          }
      }
  }

  return obj;
}

export function trim(str) {
  return str ? str.replace(/^\s*|\s*$/g, '') : '';
}
