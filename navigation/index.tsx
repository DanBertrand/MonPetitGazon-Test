import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootStackParamList } from '../types';
import Home from '../screens/Home';
import Player from '../screens/Player';

// Define the navigation for the all app

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Liste des joueurs', headerShown: true }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={({ route }) => ({
          // Update name of the page with firstName and lastName of the player if it exist, otherwise we call it Player Details
          title:
            [route.params.player.firstName, route.params.player.lastName].join(
              ' '
            ) || 'Player Details',
        })}
      />
    </Stack.Navigator>
  );
}
