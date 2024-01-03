'use client';

import { useReducer, useRef, useState } from 'react';
import { Element, HanoiTowerId } from './models';

const createElement = (length: number): Element => {
  return {
    id: `value-${length}`,
    length,
  };
};

const createElements = (length: number): Element[] => {
  return Array.from({ length }, (_, i) => i + 1).map(createElement);
};

const isTowerId = (id: string): id is HanoiTowerId => {
  return ['tower-1', 'tower-2', 'tower-3'].includes(id);
};

type State = {
  'tower-1': Element[];
  'tower-2': Element[];
  'tower-3': Element[];
};

type MoveElementAction = {
  type: 'moveToTower';
  sourceTowerId: HanoiTowerId;
  destinationTowerId: HanoiTowerId;
  element: Element;
};

type ResetAction = {
  type: 'reset';
  elements: Element[];
};

type Action = MoveElementAction | ResetAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'moveToTower': {
      const { sourceTowerId, destinationTowerId, element } = action;
      const sourceTower = state[sourceTowerId];
      const destinationTower = state[destinationTowerId];

      return {
        ...state,
        [sourceTowerId]: sourceTower.slice(1),
        [destinationTowerId]: [element, ...destinationTower],
      };
    }
    case 'reset':
      return {
        'tower-1': action.elements,
        'tower-2': [],
        'tower-3': [],
      };
    default:
      return state;
  }
};

export function useHanoiTower(nbElements: number) {
  const [nbDisks, setNbDisks] = useState(nbElements);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);

  const elements = useRef(createElements(nbElements));
  const [towers, dispatch] = useReducer(reducer, {
    'tower-1': elements.current,
    'tower-2': [],
    'tower-3': [],
  });

  const [nbMoves, setNbMoves] = useState(0);

  const getTowerById = (id: string) => {
    if (isTowerId(id)) {
      return towers[id];
    }
    return;
  };

  function resetDraggableElement() {
    setDraggedElement(null);
  }

  function onElementDragStart(elementId: string) {
    const element = getElementById(elementId as string);
    if (element) {
      setDraggedElement(element);
    }
  }

  const getElementById = (id: string) => {
    return elements.current.find((element) => element.id === id);
  };

  const getTowerIdContainingElement = (element: Element) => {
    const towerInfo = Object.entries(towers).find(([towerId, elements]) => {
      return elements.includes(element);
    });

    return towerInfo?.[0] as HanoiTowerId | undefined;
  };

  const canRemoveElement = (towerId: HanoiTowerId, element: Element) => {
    const elements = towers[towerId];
    return elements[0].id === element.id;
  };

  const canAddElement = (towerId: HanoiTowerId, element: Element) => {
    const elements = towers[towerId];
    return elements.length === 0 || element.length < elements[0].length;
  };

  const canAddDraggedElement = (towerId: HanoiTowerId) => {
    return !!draggedElement && canAddElement(towerId, draggedElement);
  };

  const onElementDragEnd = (
    elementId: string,
    destinationTowerId: HanoiTowerId | undefined
  ) => {
    const element = getElementById(elementId);

    if (!element || !destinationTowerId) {
      return;
    }

    const sourceTowerId = getTowerIdContainingElement(element);

    if (!sourceTowerId) {
      // console.log('sourceTower not found', element, sourceTowerId, towers);
      return;
    }

    moveElement(sourceTowerId, destinationTowerId, element);
    resetDraggableElement();
  };

  const moveElement = (
    sourceTowerId: HanoiTowerId,
    destinationTowerId: HanoiTowerId,
    element: Element
  ) => {
    if (
      canRemoveElement(sourceTowerId, element) &&
      canAddElement(destinationTowerId, element)
    ) {
      dispatch({
        type: 'moveToTower',
        sourceTowerId: sourceTowerId,
        destinationTowerId: destinationTowerId,
        element: element,
      });
      setNbMoves((nbMoves) => nbMoves + 1);
    }
  };

  const reset = (nbElements: number) => {
    setNbDisks(nbElements);
    elements.current = createElements(nbElements);
    setNbMoves(0);
    dispatch({
      type: 'reset',
      elements: elements.current,
    });
  };

  return {
    nbDisks,
    nbMoves,
    towers,
    onElementDragStart,
    canRemoveElement,
    canAddElement,
    canAddDraggedElement,
    onElementDragEnd,
    reset,
  };
}
