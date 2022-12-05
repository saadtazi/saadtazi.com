import { MessageDescriptor, useIntl } from 'react-intl';
import { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat';

export default function useTranslate() {
  const { formatMessage } = useIntl();
  return (
    id: string,
    options?: Omit<MessageDescriptor, 'id'>,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  ) => formatMessage({ id, ...options }, values);
}
