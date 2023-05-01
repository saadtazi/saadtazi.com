import jsonStringify from 'json-stable-stringify';

export const processJson = (value: string): [value: string, error?: Error] => {
  try {
    const newValue = jsonStringify(JSON.parse(value), { space: 2 });
    return [newValue];
  } catch (e) {
    return [value, e as Error];
  }
};
