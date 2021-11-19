import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TPlayer } from '../types';
import { useNavigation } from '@react-navigation/native';
import { ultraPositionToPosition } from '../utils';

type Props = {
  player: TPlayer;
  style: StyleProp<ViewStyle>;
};

const Row = ({ player, style }: Props) => {
  const navigation = useNavigation();

  const { averageRating, totalGoals, totalMatches, totalPlayedMatches } =
    player.stats;

  const position = ultraPositionToPosition(player.ultraPosition);

  const cells = (
    <>
      <Text style={{ ...styles.cellHeader, flex: 0.4 }}>
        {[player.lastName, player.firstName].join(' ')}
      </Text>
      <Text style={styles.cell}>
        {averageRating ? parseFloat(averageRating.toFixed(2)) : 'NaN'}
      </Text>
      <Text style={styles.cell}>{totalGoals}</Text>
      <Text style={styles.cell}>{totalMatches}</Text>
      <Text style={styles.cell}>{totalPlayedMatches}</Text>
      <Text style={styles.cell}>{player.quotation}</Text>
      <Text style={styles.cell}>{position?.short}</Text>
    </>
  );

  return (
    // Render all player in a touchable row which redirect to the player detail screen
    <TouchableOpacity
      key={player.id}
      style={style}
      onPress={() =>
        navigation.navigate('Player', {
          player: player,
        })
      }
    >
      {cells}
    </TouchableOpacity>
  );
};

export default Row;

const styles = StyleSheet.create({
  cellHeader: {
    flex: 0.2,
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  cell: {
    flex: 0.2,
    textAlign: 'center',
  },
});
