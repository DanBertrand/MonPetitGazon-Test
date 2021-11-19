import { NativeStackScreenProps } from '@react-navigation/native-stack';
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: {};
  Player: { player: TPlayer };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Player: { player: TPlayer };
};
export interface TClub {
  id: string;
  name: {
    'fr-FR': string;
    'en-GB': string;
    'es-ES': string;
  };
  shortName: string;
  defaultJerseyUrl: string;
}

export type TClubRecord = {
  [key: string]: TClub;
};
export interface TPlayer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  position: number;
  ultraPosition: number;
  quotation: 10;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
    matches: TGameStats[];
  };
}

export type TGameStats = {
  playerClubId: string;
  matchId: string;
  gameWeekNumber: number;
  date: string;
  home: {
    clubId: string;
    score: number;
  };
  away: {
    clubId: string;
    score: number;
  };
  playerPerformance: {
    status: number;
  };
};
