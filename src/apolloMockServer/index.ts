import { gql } from '@apollo/client';

export const SCORES = gql`
  query getScores {
    x @client
    o @client
  }
`;

export const GAMEBOARD = gql`
  query getGameboard {
    data @client
  }
`;

export const GAME_STATUS = gql`
  query getGameStatus {
    status @client
  }
`;

export const TURN = gql`
  query getTurn {
    turn @client
  }
`;

export const initializeState = (cache: any) => {
  cache.writeQuery({
    query: SCORES,
    data: {
      x: Number(localStorage.getItem('xScore')) || 0,
      o: Number(localStorage.getItem('oScore')) || 0,
    },
  });

  cache.writeQuery({
    query: GAMEBOARD,
    data: {
      data: localStorage.getItem('gameboard')
        ? JSON.parse(localStorage.getItem('gameboard') || '[]')
        : [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
    },
  });

  cache.writeQuery({
    query: GAME_STATUS,
    data: {
      status: localStorage.getItem('status')
        ? JSON.parse(localStorage.getItem('status') || '{}')
        : {
            status: 'IN_PROGRESS',
            winner: '',
          },
    },
  });

  cache.writeQuery({
    query: TURN,
    data: {
      turn: localStorage.getItem('turn') || 'X',
    },
  });
};

export const setScores = (client: any, incoming: any) => {
  client.cache.writeQuery({
    query: SCORES,
    data: {
      x: incoming.x,
      o: incoming.o,
    },
  });
  localStorage.setItem('xScore', incoming.x);
  localStorage.setItem('oScore', incoming.o);
};

export const setGameboard = (client: any, incoming: any) => {
  client.cache.writeQuery({
    query: GAMEBOARD,
    data: {
      data: incoming,
    },
  });
  localStorage.setItem('gameboard', JSON.stringify(incoming));
};

export const setGameStatus = (client: any, incoming: any) => {
  client.cache.writeQuery({
    query: GAME_STATUS,
    data: {
      status: incoming,
    },
  });
  localStorage.setItem('status', JSON.stringify(incoming));
};

export const setTurn = (client: any, incoming: any) => {
  client.cache.writeQuery({
    query: TURN,
    data: {
      turn: incoming,
    },
  });
  localStorage.setItem('turn', incoming);
};
