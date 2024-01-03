"use client";

import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  id: string;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Droppable = ({
  id,
  disabled,
  children,
  ...htmlAttributes
}: DroppableProps) => {
  const { style: htmlStyle, ...otherHtmlAttributes } = htmlAttributes;
  const droppable = useDroppable({
    id,
    disabled,
  });
  const { isOver, setNodeRef, active } = droppable;

  const style = {
    zIndex: -1,
    // backgroundColor:
    //   !disabled && (isOver || active)
    //     ? `rgba(100, 255, 100, ${isOver ? 1 : 0.5})`
    //     : undefined,
    border: "1px dashed black",
    ...htmlStyle,
  };

  return (
    <div ref={setNodeRef} style={style} id={id} {...otherHtmlAttributes}>
      {children}
    </div>
  );
};
