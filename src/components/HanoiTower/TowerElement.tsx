import { ReactNode } from 'react';
import { Draggable } from './Draggable';
import { DISK_HEIGHT, DISK_MIN_WIDTH, DISK_SIZE_STEP } from './constant';

type TowerElementProps = {
  scale?: number;
  disabled?: boolean;
  length: number;
  id: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const TowerElement = ({
  length,
  id,
  scale = 1,
  disabled,
  children,
  ...htmlAttributes
}: TowerElementProps) => {
  const { style: htmlStyle, ...otherHtmlAttributes } = htmlAttributes;

  return (
    <Draggable id={id} disabled={disabled} scale={scale}>
      <div
        style={{
          touchAction: 'none',
          zIndex: 20,
          borderRadius: '15px',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          justifyItems: 'center',

          width: DISK_MIN_WIDTH + DISK_SIZE_STEP * length - 2,
          height: DISK_HEIGHT - 2,
          backgroundColor: disabled ? 'lightgrey ' : 'lightblue',
          border: '1px solid black',
          boxShadow: 'inset 1px 2px 2px 2px rgba(125, 125, 125, 0.2)',
          userSelect: 'none',
          ...htmlStyle,
        }}
        {...otherHtmlAttributes}
      >
        {children}
      </div>
    </Draggable>
  );
};
