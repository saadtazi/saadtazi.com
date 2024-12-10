import useTranslate from 'hooks/translate';
import { useEffect, useRef, useState } from 'react';

type TimerProps = {
  action: 'start' | 'stop' | 'ready';
  onUpdate?: (value: number) => void;
  onStop?: (value: number) => void;
};
export function Timer({ action, onUpdate }: TimerProps) {
  const [value, setValue] = useState(0);
  const timerRef = useRef<NodeJS.Timer | number>(undefined);
  const initRef = useRef(false);
  const t = useTranslate();

  useEffect(() => {
    if (action === 'start' && !timerRef.current) {
      const newStartDate = new Date();

      // setValue(0);
      timerRef.current = setInterval(() => {
        setValue((_) => {
          const newValue = Math.round(
            (new Date().getTime() - newStartDate.getTime()) / 1000
          );
          onUpdate?.(newValue);
          return newValue;
        });
      }, 1000);
    }
    if (action === 'stop') {
      clearInterval(timerRef.current);
      timerRef.current = 0;
    }
    if (action === 'ready') {
      setValue(0);
    }
  }, [action, onUpdate, setValue]);

  useEffect(() => {
    return () => {
      // hack... :(
      if (!initRef.current) {
        initRef.current = true;
        return;
      }
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <h3>
      {t('minesweeper.time')}: {value}
    </h3>
  );
}
