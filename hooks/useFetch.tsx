import React from 'react';
import { TClubRecord, TPlayer } from '../types';

// Custom hook to handle fetch request. Return state data plus state ( loading, errors)

const useFetch = () => {
  const [state, setState] = React.useState({
    loading: false,
    error: null,
  });
  const [clubs, setClubs] = React.useState({} as TClubRecord);
  const [players, setPlayers] = React.useState([] as TPlayer[]);

  // The 2 functions use {try catch} block statement to handle error => ex: handle flash alert ...

  async function getClubs(): Promise<void> {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(
        'https://api.mpg.football/api/data/championship-clubs',
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      setClubs(data.championshipClubs as TClubRecord);
    } catch (error) {
      console.log(error);
    }

    setState((prevState) => ({ ...prevState, loading: false }));
  }

  async function getPlayers(): Promise<void> {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const response = await fetch(
        'https://api.mpg.football/api/data/championship-players-pool/1',
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      setPlayers(data.poolPlayers as TPlayer[]);
    } catch (error) {
      console.log(error);
    }
    setState((prevState) => ({ ...prevState, loading: false }));
  }

  return {
    state,
    getPlayers,
    getClubs,
    clubs,
    players,
  };
};

export default useFetch;
