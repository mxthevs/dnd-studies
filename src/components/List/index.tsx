import React from 'react';
import { MdAdd } from 'react-icons/md';

import { List as ListInterface } from '../../services/api';

import Card from '../Card';

import { Container } from './styles';

interface ListProps {
  index: number;
  data: ListInterface;
}

const List: React.FC<ListProps> = ({ index: listIndex, data }) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} listIndex={listIndex} data={card} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
