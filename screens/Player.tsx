import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { RootStackParamList, TClub } from '../types';
import useFetch from '../hooks/useFetch';
import { sortMatchesByDate, ultraPositionToPosition } from '../utils';
import GameStats from '../components/GameStats';

export default function Player() {
  const route = useRoute<RouteProp<RootStackParamList, 'Player'>>();
  const { player } = route.params;
  const { state, getClubs, clubs } = useFetch();
  const [playerClub, setPlayerClub] = useState({} as TClub);

  const position = ultraPositionToPosition(player.ultraPosition);
  const sortedMatchesByDate = sortMatchesByDate(player.stats.matches);

  useEffect(() => {
    // Get all the player when component didMount only
    getClubs();
  }, []);

  useEffect(() => {
    if (clubs) {
      setPlayerClub(clubs[player.clubId]);
    }
  }, [clubs]);

  if (state.loading || !playerClub) {
    return <Text style={styles.title}>Loading ...</Text>;
  }

  return playerClub && playerClub.name ? (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <View style={styles.center}>
          <View style={styles.left}>
            <Text style={styles.title}>
              {[player.firstName, player.lastName].join(' ')}
            </Text>
            <Text style={styles.text}>{position?.full}</Text>
          </View>
        </View>
        <View style={styles.center}>
          <Image
            style={styles.logo}
            source={{
              uri: playerClub.defaultJerseyUrl,
            }}
          />
          <Text style={styles.text}>{playerClub.name['fr-FR']}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Stats Générales</Text>
          <Text style={styles.text}>Quotation: {player.quotation}</Text>
          <Text style={styles.text}>
            Note moyenne:{' '}
            {player.stats.averageRating
              ? parseFloat(player.stats.averageRating.toFixed(2))
              : 'NaN'}
          </Text>
          <Text style={styles.text}>
            Total buts : {player.stats.totalGoals}
          </Text>
          <Text style={styles.text}>
            Total matches: {player.stats.totalMatches}
          </Text>
          <Text style={styles.text}>
            Total des matches joués: {player.stats.totalPlayedMatches}
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Detail par match</Text>
          {sortedMatchesByDate.map((game) => (
            <GameStats key={game.matchId} game={game} clubs={clubs} />
          ))}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Un probleme est survenue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  blockTitle: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  block: {
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
  },
  logo: {
    width: 120,
    height: 110,
  },
});
