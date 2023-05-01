import jsonStringify from 'json-stable-stringify';

const fromUrlQueryParams = (urlParams: URLSearchParams): [string] => {
  const keys = Array.from(urlParams.keys());
  const results = keys.reduce(
    (acc: Record<string, string | string[]>, key: string) => {
      const value = urlParams.getAll(key);
      acc[key] = value.length === 1 ? value[0] : value.sort();
      return acc;
    },
    {}
  );

  return [jsonStringify(results, { space: 2 })];
};

const processQueryParams = (
  value: string
): [processedValue: string, error?: Error] => {
  const urlParams = new URLSearchParams(value.replace(/^\?/, ''));
  return fromUrlQueryParams(urlParams);
};

export const processUrl = (
  value: string
): [processedValue: string, error?: Error] => {
  let queryParams: URLSearchParams;
  try {
    const url = new URL(value);
    return fromUrlQueryParams(url.searchParams);
  } catch (e) {
    try {
      return processQueryParams(value);
    } catch (e) {
      return [value, new Error('please enter a valid url or query string')];
    }
  }
};
