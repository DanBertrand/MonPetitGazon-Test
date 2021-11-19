import { TGameStats, TPlayer } from './types';

// Build object with position to reuse into function
export const playerPositions = [
  { ultraPosition: 10, short: 'G', full: 'Gardien' },
  { ultraPosition: 20, short: 'D', full: 'Defenseur' },
  { ultraPosition: 21, short: 'L', full: 'Lateral' },
  { ultraPosition: 30, short: 'MD', full: 'Milieu défensif' },
  { ultraPosition: 31, short: 'MO', full: 'Milieu offensif ' },
  { ultraPosition: 40, short: 'A', full: 'Attaquant' },
];

export const ultraPositionToPosition = (ultraPosition: number) => {
  return playerPositions.find((pos) => pos.ultraPosition === ultraPosition);
};

// Given an array of players and an array of position (ex: ['M','G', 'MO])
// return a filter array of players playing on those positions
export const filterPlayersListByPosition = (
  players: TPlayer[],
  filter: string[]
) => {
  if (filter.length) {
    const positionArrayToUltraposition = playerPositions
      .filter((position) => filter.includes(position.short))
      .map((filteredPosition) => filteredPosition.ultraPosition);
    return players.filter((player) =>
      positionArrayToUltraposition.includes(player.ultraPosition)
    );
  }
  return players;
};

export const filterPlayersByName = (playersList: TPlayer[], input: string) => {
  return playersList.filter((player) => {
    if (
      // Join firstName and lastName to avoid getting errors on 'undefined'
      [player.firstName, player.lastName]
        .join(' ')
        .toLowerCase()
        .includes(input)
    ) {
      return player;
    }
  });
};

// Sort array of matches form most recent to oldest
export const sortMatchesByDate = (matchesArray: TGameStats[]) =>
  matchesArray.sort(function (first, second) {
    const a = first.date.split('T')[0].split('-').join('');
    const b = second.date.split('T')[0].split('-').join('');
    return a < b ? 1 : a > b ? -1 : 0;
  });
