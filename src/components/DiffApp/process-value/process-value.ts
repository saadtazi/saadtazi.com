import { processUrl } from '../process-url';
import { processJson } from './process-json';

export enum Type {
  Auto = 'auto',
  String = 'string',
  Json = 'json',
  Url = 'url',
}

const queryStringRegex = /[\\?&]*[^&=]+=[^&=]+/;

export const detectType = (left: string, right: string): Type => {
  const [, jsonError1] = processJson(left);
  const [, jsonError2] = processJson(right);
  if (!jsonError1 && !jsonError2) {
    return Type.Json;
  }

  // process url will always work because URLSearchParams accepts any string
  if (queryStringRegex.test(left) && queryStringRegex.test(right)) {
    return Type.Url;
  }
  return Type.String;
};

export const processValue = (
  value: string,
  type: string
): [processedValue: string, error?: Error] => {
  if (type === 'json') {
    return processJson(value);
  }

  if (type === 'url') {
    return processUrl(value);
  }

  // no processing needed: string
  return [value];
};
