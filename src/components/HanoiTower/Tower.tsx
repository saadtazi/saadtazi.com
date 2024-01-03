import { Droppable } from './Droppable';
import { useDroppable } from '@dnd-kit/core';
import {
  DISK_HEIGHT,
  DISK_MIN_WIDTH,
  DISK_SIZE_STEP,
  STRUCTURE_WIDTH,
} from './constant';

type TowerProps = {
  id: string;
  nbDisks: number;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Tower = ({
  id,
  nbDisks,
  disabled,
  children,
  ...htmlAttributes
}: TowerProps) => {
  const { style: htmlStyle } = htmlAttributes;

  const droppable = useDroppable({
    id,
    disabled,
  });
  const { isOver, setNodeRef, active } = droppable;

  return (
    <div
      style={{
        position: 'relative',
        height: nbDisks * DISK_HEIGHT + STRUCTURE_WIDTH,
      }}
    >
      {/* structure */}
      <div
        style={{
          zIndex: -1,
          backgroundColor: `rgba(140,68,18, ${!disabled || !active ? 1 : 0.5})`,
          width: STRUCTURE_WIDTH,
          height: nbDisks * DISK_HEIGHT,
          top: 0,
          right: 'calc(50% - 10px)', // width / 2
          margin: 0,
          position: 'absolute',
        }}
      ></div>
      <div
        ref={setNodeRef}
        id={id}
        style={{
          zIndex: 20,
          display: 'grid',
          justifyItems: 'center',
          gridTemplateRows: `repeat(${nbDisks}, 1fr)`,
          alignItems: 'center',
          rowGap: 0,

          height: nbDisks * DISK_HEIGHT,
          width: DISK_MIN_WIDTH + nbDisks * DISK_SIZE_STEP,
          ...htmlStyle,
        }}
      >
        {children}
        {/* more structure */}
        <div
          style={{
            width: DISK_MIN_WIDTH + nbDisks * DISK_SIZE_STEP,
            height: STRUCTURE_WIDTH,
            backgroundColor: `rgba(140,68,18, ${
              !disabled || !active ? 1 : 0.5
            })`,
            position: 'absolute',
            bottom: 0,
          }}
        ></div>
      </div>
    </div>
  );
};
