import { useEffect, useState } from 'react';

type PointProps = {
  cx: number;
  cy: number;
  r: number;
  fillColor: string;
  hoverColor: string;
  unselectedColor?: string;
  onClick: () => void;
  selected?: boolean;
  editable?: boolean;
};

export const Point = ({
  cx,
  cy,
  r,
  fillColor,
  hoverColor,
  unselectedColor = 'transparent',
  selected,
  onClick,
  editable = false,
}: PointProps) => {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(selected ? fillColor : unselectedColor);

  useEffect(() => {
    if (selected) {
      setColor(fillColor);
      return;
    }
    setColor(hover ? hoverColor : unselectedColor);
  }, [selected, hover, setColor, fillColor, hoverColor, unselectedColor]);

  return (
    <circle
      aria-label="finger"
      tabIndex={editable ? 0 : undefined}
      cx={cx}
      cy={cy}
      r={r}
      stroke={color}
      fill={color}
      onMouseEnter={() => editable && setHover(true)}
      onMouseLeave={() => editable && setHover(false)}
      onClick={onClick}
      onKeyUp={(e) => {
        if (['Enter', ' '].includes(e.key)) {
          onClick();
        }
      }}
    />
  );
};
