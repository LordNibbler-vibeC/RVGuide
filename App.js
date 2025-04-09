/* Remote Viewing Guide - App.js - v0.3.0 */
/* (Keine Änderungen, bestätigt korrekten Hintergrund) */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen-Imports... (alle Screens)
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import NeueSessionScreen from './screens/NeueSessionScreen';
import UebungspoolScreen from './screens/UebungspoolScreen';
import MeineSessionsScreen from './screens/MeineSessionsScreen';
import CommunityScreen from './screens/CommunityScreen';
import EinstellungenScreen from './screens/EinstellungenScreen';
import Stufe1Screen from './screens/Stufe1Screen';
import Stufe2Screen from './screens/Stufe2Screen';
import Stufe3Screen from './screens/Stufe3Screen';
import Stufe4Screen from './screens/Stufe4Screen';
import Stufe5Screen from './screens/Stufe5Screen';
import Stufe6Screen from './screens/Stufe6Screen';
import InstructionScreen from './screens/InstructionScreen';
import ArchetypesScreen from './screens/ArchetypesScreen';
import HemisphericSyncScreen from './screens/HemisphericSyncScreen';
import GeneralProcessScreen from './screens/GeneralProcessScreen';
import CorrectTargetScreen from './screens/CorrectTargetScreen';
import AOLExplanationScreen from './screens/AOLExplanationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={({ route }) => ({
          headerShown: false,
          cardStyle: {
            // --- KORREKTE HINTERGRUNDFARBEN ---
            // Schwarz für Stufe 1-6
            // Off-White (#f5f3e9) für alle anderen Screens (inkl. Home)
            backgroundColor: route.name.startsWith('Stufe') ? 'black' : '#f5f3e9',
          },
        })}
      >
        {/* --- Alle Screens --- */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NeueSession" component={NeueSessionScreen} />
        <Stack.Screen name="Übungspool" component={UebungspoolScreen} />
        <Stack.Screen name="MeineSessions" component={MeineSessionsScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Einstellungen" component={EinstellungenScreen} />
        <Stack.Screen name="Stufe1" component={Stufe1Screen} />
        <Stack.Screen name="Stufe2" component={Stufe2Screen} />
        <Stack.Screen name="Stufe3" component={Stufe3Screen} />
        <Stack.Screen name="Stufe4" component={Stufe4Screen} />
        <Stack.Screen name="Stufe5" component={Stufe5Screen} />
        <Stack.Screen name="Stufe6" component={Stufe6Screen} />
        <Stack.Screen name="Instruction" component={InstructionScreen} />
        <Stack.Screen name="Archetypes" component={ArchetypesScreen} />
        <Stack.Screen name="HemisphericSync" component={HemisphericSyncScreen} />
        <Stack.Screen name="GeneralProcess" component={GeneralProcessScreen} />
        <Stack.Screen name="CorrectTarget" component={CorrectTargetScreen} />
        <Stack.Screen name="AOLExplanation" component={AOLExplanationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
