import { processUrl, processQueryParams } from './process-url';
import { processJson } from './process-json';

export enum Type {
  Auto = 'auto',
  String = 'string',
  Json = 'json',
  Url = 'url',
  QueryString = 'qs',
}

const queryStringRegex = /[\\?&]*[^&=]+=[^&=]+/;

export const detectType = (left: string, right: string): Type => {
  const [, jsonError1] = processJson(left);
  const [, jsonError2] = processJson(right);
  if (!jsonError1 && !jsonError2) {
    return Type.Json;
  }

  const [, urlError1] = processUrl(left);
  const [, urlError2] = processUrl(right);
  if (!urlError1 && !urlError2) {
    return Type.Url;
  }

  // process url will always work because URLSearchParams accepts any string
  if (queryStringRegex.test(left) && queryStringRegex.test(right)) {
    return Type.QueryString;
  }

  return Type.String;
};

export const processValue = (
  value: string,
  type: string
): [processedValue: string, error?: Error] => {
  if (type === Type.Json) {
    return processJson(value);
  }

  if (type === Type.Url) {
    return processUrl(value);
  }

  if (type === Type.QueryString) {
    return processQueryParams(value);
  }

  // no processing needed: string
  return [value];
};
