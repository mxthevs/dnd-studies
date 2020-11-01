import React, { useState } from 'react';
import produce from 'immer';

import List from '../List';

import { Container } from './styles';

import BoardContext from './context';
import loadLists from '../../services/api';

const data = loadLists();

const Board: React.FC = () => {
  const [lists, setLists] = useState(data);

  const move = (
    fromList: number,
    toList: number,
    from: number,
    to: number,
  ): void => {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      }),
    );
  };

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
