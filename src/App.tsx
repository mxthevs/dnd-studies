import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from './components/Header';
import Board from './components/Board';

import GlobalStyles from './styles/GlobalStyle';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Board />
      <GlobalStyles />
    </DndProvider>
  );
};

export default App;
