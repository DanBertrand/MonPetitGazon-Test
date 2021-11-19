import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TPlayer } from '../types';
import useFetch from '../hooks/useFetch';
import MyTable from '../components/Table';
import PositionsCheckBox from '../components/PositionCheckBox';
import { filterPlayersListByPosition, filterPlayersByName } from '../utils';

export default function Home() {
  const { state, getPlayers, players } = useFetch();
  const [searchResult, setSearchResult] = useState([] as TPlayer[]);
  const [text, onChangeText] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [checkBoxState, setCheckBoxState] = React.useState<string[]>([]);

  const handleCheckBoxPress = (position: string[]) => {
    setCheckBoxState(position);
  };

  useEffect(() => {
    //  Handle all the search logic in this useEffect which follow changes on input and position filter

    if (text.length === 0 && checkBoxState.length === 0) {
      // If no input and no checkbox selected we admit the user is not searching
      setSearching(false);
      setSearchResult([]);
    } else {
      // Otherwise, the user is searching.
      // Filter first all players depending on the positions selected with the checkboxes to reduce the list of players
      setSearching(true);
      const filteredArrayByPosition = filterPlayersListByPosition(
        players,
        checkBoxState
      );
      if (text.length) {
        // If input, filtered again the filteredArray to match what the user search into the input (name + family name)
        setSearchResult(filterPlayersByName(filteredArrayByPosition, text));
      } else {
        // If no input, render only the list filtered by position
        setSearchResult(filteredArrayByPosition);
      }
    }
  }, [text, checkBoxState]);

  useEffect(() => {
    // Get all players when component is mounted only
    getPlayers();
  }, []);

  // Show loading while waiting for Promises from useFetch()
  if (state.loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text style={styles.loading}>Loading ....</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        selectionColor={'black'}
        autoCapitalize="none"
        onChangeText={onChangeText}
        value={text}
        placeholder="Cherche ton joueur ..."
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
        }}
      >
        <PositionsCheckBox handleCheckBoxPress={handleCheckBoxPress} />
      </View>

      {/* If searchingMode = false and searchResult empty, we tell the user that nothing has been found  */}
      {searching && searchResult.length === 0 ? (
        <Text style={styles.loading}>Aucun joueur trouvé</Text>
      ) : (
        /* We toggle the data passed to the table component. If user is searching, we pass searchResult, else the full players list  */
        <MyTable players={searching ? searchResult : players} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    fontSize: 24,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  input: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 20,
    height: 40,
    fontSize: 12,
    borderRadius: 15,
    backgroundColor: '#d6d6d6',
  },
});
