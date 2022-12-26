import { useCallback, useEffect, useState } from 'react';

type PlayedStringProps = {
  cx: number;
  cy: number;
  r: number;
  color: string;
  strokeWidth: number;
};

const PlayedString = ({ cx, cy, r, color, strokeWidth }: PlayedStringProps) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      color={color}
      stroke={color}
      fill="transparent"
      strokeWidth={strokeWidth}
    />
  );
};

type NonPlayedStringProps = {
  x: number;
  y: number;
  size: number;
  color: string;
  strokeWidth: number;
};

const NonPlayedString = ({
  x,
  y,
  size,
  color,
  strokeWidth,
}: NonPlayedStringProps) => {
  return (
    <>
      <line
        x1={x}
        y1={y}
        x2={x + size}
        y2={y + size}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <line
        x1={x}
        y1={y + size}
        x2={x + size}
        y2={y}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

type OpenStringProps = {
  x: number;
  y: number;
  size: number;
  selectedColor: string;
  unselectedColor?: string;
  hoverColor: string;
  strokeWidth: number;
  position?: number;
  selected: number | undefined;
  onChange: (newSelected: number | undefined) => void;
  editable?: boolean;
};

export const OpenString = ({
  x,
  y,
  size,
  selectedColor,
  hoverColor,
  unselectedColor = 'transparent',
  strokeWidth,
  position = 0,
  selected,
  onChange,
  editable = false,
}: OpenStringProps) => {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(selectedColor);
  const showNonPlayed = selected === undefined;

  // change color
  useEffect(() => {
    if (hover) {
      setColor(hoverColor);
      return;
    }
    setColor(selected === 0 || showNonPlayed ? selectedColor : unselectedColor);
  }, [
    hover,
    setColor,
    selected,
    position,
    selectedColor,
    unselectedColor,
    hoverColor,
    showNonPlayed,
    editable,
  ]);

  const el = showNonPlayed ? (
    <NonPlayedString
      x={x}
      y={y}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ) : (
    <PlayedString
      cx={x + size / 2}
      cy={y + size / 2}
      r={size / 2}
      color={color}
      strokeWidth={strokeWidth}
    />
  );

  const onClick = useCallback(() => {
    if (!editable) {
      return;
    }
    if (selected === 0) {
      onChange(undefined);
      return;
    }
    onChange(0);
  }, [selected, onChange]);

  // todo: switch to PlayedString 0 if hovered
  return (
    <>
      {el}
      <rect
        aria-label="open-string"
        tabIndex={editable ? 0 : undefined}
        x={x}
        y={y}
        width={size}
        height={size}
        stroke="transparent"
        fill="transparent"
        onMouseEnter={() => editable && setHover(true)}
        onMouseLeave={() => editable && setHover(false)}
        onClick={onClick}
        onKeyUp={(e) => {
          if (editable && ['Enter', ' '].includes(e.key)) {
            onClick();
          }
        }}
      ></rect>
    </>
  );
};
