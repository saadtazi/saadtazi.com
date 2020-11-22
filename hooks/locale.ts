import { useRouter } from 'next/router';

export default function useTranslate() {
  const { locale } = useRouter();
  return locale || 'en';
}
