import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';
import { TGameStats, TClubRecord } from '../types';

type Props = {
  game: TGameStats;
  clubs: TClubRecord;
};

const GameStats = ({ game, clubs }: Props) => {
  const [displayDetails, setDisplayDetails] = useState(false);
  const clubHome = clubs[game.home.clubId];
  const clubAway = clubs[game.away.clubId];

  const formattedDate = game.date.split('T')[0].split('-').reverse().join('-');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setDisplayDetails(!displayDetails)}
    >
      <View style={styles.header}>
        <View style={styles.teams}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: clubHome.defaultJerseyUrl,
            }}
          />
          <Text>{clubHome.name['fr-FR']}</Text>
        </View>

        <Text>
          {game.home.score} - {game.away.score}
        </Text>

        <View style={styles.teams}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: clubAway.defaultJerseyUrl,
            }}
          />
          <Text>{clubAway.name['fr-FR']}</Text>
        </View>
      </View>
      {displayDetails && (
        <View style={styles.block}>
          <Text>Semaine: {game.gameWeekNumber} </Text>
          <Text>Date du match: {formattedDate}</Text>
          <Text>Performance du joueur: {game.playerPerformance.status} </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(GameStats);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#bcffbf',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  teams: {
    flex: 1,
    alignItems: 'center',
  },
  block: {
    backgroundColor: '#d3d3d3',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 15,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
});
