import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { TPlayer } from '../types';
import Row from './Row';

type Props = {
  players: TPlayer[];
};

const Table = ({ players }: Props) => {
  // Generate the header's cells
  const cellsHeader = (
    <>
      <Text style={{ ...styles.cellHeader, flex: 0.4 }}>Nom</Text>
      <Text style={styles.cellHeader}>Note</Text>
      <Text style={styles.cellHeader}>Total buts</Text>
      <Text style={styles.cellHeader}>Total Matches</Text>
      <Text style={styles.cellHeader}>Matches joués</Text>
      <Text style={styles.cellHeader}>Quotation</Text>
      <Text style={styles.cellHeader}>Position</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowHeader}>{cellsHeader}</View>
      <ScrollView>
        <View>
          {players.map((player, index) => (
            <Row
              // Switch color every 2nd row for better visualization / Better UX
              style={
                index % 2
                  ? styles.row
                  : { ...styles.row, backgroundColor: '#d3d3d3' }
              }
              key={player.id}
              player={player}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Table);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  rowHeader: {
    height: 60,
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  cellHeader: {
    flex: 0.2,
    color: '#ffffff',
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
