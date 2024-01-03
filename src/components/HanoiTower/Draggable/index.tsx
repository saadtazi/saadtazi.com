'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';

type DraggableProps = {
  id: string;
  scale?: number;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Draggable = ({
  id,
  disabled,
  children,
  scale = 1,
  ...htmlAttributes
}: DraggableProps) => {
  const { style: htmlStyle, ...otherHtmlAttributes } = htmlAttributes;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x / scale}px, ${transform.y / scale}px, 0)`
      : undefined,
    ...htmlStyle,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      {...otherHtmlAttributes}
    >
      {children}
    </div>
  );
};
