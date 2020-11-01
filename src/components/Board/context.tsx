import { createContext } from 'react';

import { List } from '../../services/api';

interface BoardContext {
  lists?: List[];
  move?: (fromList: number, toList: number, from: number, to: number) => void;
}

export default createContext<BoardContext>({});
