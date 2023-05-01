import jsonStringify from 'json-stable-stringify';

const fromUrlQueryParams = (urlParams: URLSearchParams) => {
  const keys = Array.from(urlParams.keys());
  const results = keys.reduce(
    (acc: Record<string, string | string[]>, key: string) => {
      const value = urlParams.getAll(key);
      acc[key] = value.length === 1 ? value[0] : value.sort();
      return acc;
    },
    {}
  );

  return results;
};

export const processQueryParams = (
  value: string
): [processedValue: string, error?: Error] => {
  const urlParams = new URLSearchParams(value.replace(/^\?/, ''));
  return [jsonStringify(fromUrlQueryParams(urlParams), { space: 2 })];
};

export const processUrl = (
  value: string
): [processedValue: string, error?: Error] => {
  let queryParams: URLSearchParams;
  try {
    const url = new URL(value);
    return [
      jsonStringify(
        {
          origin: url.origin,
          pathname: url.pathname,
          hash: url.hash,
          queryParams: fromUrlQueryParams(url.searchParams),
        },
        { space: 2 }
      ),
    ];
  } catch (e) {
    return [value, new Error('please enter a valid url or query string')];
  }
};
