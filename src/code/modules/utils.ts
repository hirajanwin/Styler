import { Config } from './config';

// make the first string Uppercase
export const ucFirst = (word: string): string => word[0].toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();

// add addfix to the string
export const addAffixTo = (word: string, prefix = '', suffix = ''): string => prefix + word + suffix;

// check if array is empty
export const isArrayEmpty = (array) => (array || []).length === 0;

// Arrays utils
// split array in multiple parts
export const chunk = (array, size = 1) => {
  return isArrayEmpty(array) ? [] : [array.slice(0, size)].concat(chunk(array.slice(size), size));
};

// groupBy(array, key): group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);

    return result;
  }, {});
};

// get unique value from an array
export const uniq = (array, sort = false) => {
  return isArrayEmpty(array) ? [] : !sort ? [...new Set(array)] : [...new Set(array)].sort();
};

//this function returns clone the object
export function clone(val) {
  const type = typeof val;

  if (
    type === 'undefined' ||
    type === 'number' ||
    type === 'string' ||
    type === 'boolean' ||
    type === 'symbol' ||
    val === null
  ) {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(clone);
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      const o = {};
      for (const key in val) {
        o[key] = clone(val[key]);
      }
      return o;
    }
  }

  throw 'unknown';
}

export const checkStyleType = (style: BaseStyle, config: Config) => {
  let styleType: any = style.type;

  if (style.type === 'PAINT') {
    styleType = 'FILL';

    const { filler, strokeer } = config;
    [filler, strokeer].map((styler) => {
      if ((styler.prefix !== '' || styler.suffix !== '') && styler.checkAffix(style)) {
        styleType = styler.layerPropType;
      }
    });
  }
  return styleType;
};
