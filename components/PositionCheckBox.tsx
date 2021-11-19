import React from 'react';
import { CheckBox } from 'react-native-elements';
import { StyleSheet, Button, View } from 'react-native';

type Props = {
  handleCheckBoxPress: (position: string[]) => void;
};

const PositionsCheckBox = ({ handleCheckBoxPress }: Props) => {
  // Initial state false for all position checkboxes
  const initialState = {
    G: false,
    D: false,
    L: false,
    MD: false,
    MO: false,
    A: false,
  };

  const [checkBoxState, setCheckBoxState] = React.useState(initialState);

  React.useEffect(() => {
    // Send to parent component an array containing the position selected => ex: ['MO', 'G', 'MD']
    const checked = Object.entries(checkBoxState)
      .filter((state) => state[1] === true)
      .map((k) => k[0]);
    handleCheckBoxPress(checked);
  }, [checkBoxState]);

  return (
    <View style={styles.container}>
      <CheckBox
        onPress={() =>
          setCheckBoxState((prevState) => ({
            ...prevState,
            G: !checkBoxState.G,
          }))
        }
        title="G"
        checked={checkBoxState.G}
      />
      <CheckBox
        onPress={() =>
          setCheckBoxState((prevState) => ({
            ...prevState,
            D: !checkBoxState.D,
          }))
        }
        title="D"
        checked={checkBoxState.D}
      />
      <CheckBox
        onPress={() =>
          setCheckBoxState((prevState) => ({
            ...prevState,
            L: !checkBoxState.L,
          }))
        }
        title="L"
        checked={checkBoxState.L}
      />
      <CheckBox
        onPress={() =>
          setCheckBoxState((prevState) => ({
            ...prevState,
            MD: !checkBoxState.MD,
          }))
        }
        title="MD"
        checked={checkBoxState.MD}
      />
      <CheckBox
        onPress={() =>
          setCheckBoxState((prevState) => ({
            ...prevState,
            MO: !checkBoxState.MO,
          }))
        }
        title="MO"
        checked={checkBoxState.MO}
      />
      <CheckBox
        onPress={() =>
          setCheckBoxState((prevState) => ({
            ...prevState,
            A: !checkBoxState.A,
          }))
        }
        title="A"
        checked={checkBoxState.A}
      />

      {/* Add a reset button to allow resetting all checkboxes to false. Better UX instead of uncheck them all one by one */}
      <Button
        onPress={() => setCheckBoxState(initialState)}
        color={'#000000'}
        title="Reset filter"
        accessibilityLabel="Reset filter"
      />
    </View>
  );
};

export default PositionsCheckBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#000000',
  },
});
