import { useRouter } from 'next/router';

export default function useLocale() {
  const { locale } = useRouter();
  return locale || 'en';
}
