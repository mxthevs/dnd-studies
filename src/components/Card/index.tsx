/* eslint @typescript-eslint/no-non-null-assertion: off */

import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';
import { Card as CardInterface } from '../../services/api';

import { Container, Label } from './styles';

interface CardProps {
  index: number;
  listIndex: number;
  data: CardInterface;
}

interface DropItem {
  type: string;
  id: number;
  index: number;
  content: string;
  listIndex: number;
}

const Card: React.FC<CardProps> = ({ index, listIndex, data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'CARD',
      index,
      listIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: DropItem, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();
      const targetCenter = (targetSize!.bottom - targetSize!.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset!.y - targetSize!.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move!(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map((label) => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="Usuário" />}
    </Container>
  );
};

export default Card;
