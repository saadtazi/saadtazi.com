import { useIntl } from 'react-intl';

export default function useTranslate() {
  const { formatMessage } = useIntl();
  return (id: string) => formatMessage({ id });
}
