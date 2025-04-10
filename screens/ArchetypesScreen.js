/* Remote Viewing Guide - ArchetypesScreen.js - v0.1.0 */
/*
 * CHANGELOG:
 * v0.1.1 (YYYY-MM-DD):
 * - Added SafeAreaView wrapper. (Zurückgenommen)
 * v0.1.0 (YYYY-MM-DD):
 * - Initial version using globalStyles. Structure reverted to this version.
 * - Tile background/text color now comes from GlobalStyles v0.2.3 (dark teal/white).
 */
import React, { useState } from 'react';
// --- KEINE SafeAreaView ---
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from './GlobalStyles'; // Nutzt v0.2.3 (mit dunklen Kacheln)
import { ArrowLeft } from 'lucide-react-native';

const ArchetypeTile = ({ name, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsFlipped(!isFlipped)}
      // Nutzt dunkle Kachel-Styles aus GlobalStyles v0.2.3
      style={globalStyles.tile}
      accessible={true}
      accessibilityLabel={isFlipped ? description : name}
    >
      {/* Nutzt weißen Text-Style aus GlobalStyles v0.2.3 */}
      <Text style={globalStyles.tileText}>{isFlipped ? description : name}</Text>
    </TouchableOpacity>
  );
};

const ArchetypesScreen = ({ navigation }) => {
  const archetypes = [
    { name: 'Wasser', description: 'Repräsentiert Flüssigkeit, Emotionen und das Unterbewusstsein.' },
    { name: 'Berg', description: 'Symbolisiert Stabilität, Herausforderungen und persönliches Wachstum.' },
    { name: 'Land', description: 'Bezeichnet Bodenständigkeit, Ressourcen und physische Realität.' },
    { name: 'Struktur', description: 'Zeigt Organisation, Rahmenwerke und Systeme an.' },
    { name: 'Bewegung', description: 'Verkörpert Wandel, Fortschritt und Dynamik.' },
    { name: 'Geschwindigkeit', description: 'Bezieht sich auf Tempo, Timing und Schwung.' },
    { name: 'Energie', description: 'Bedeutet Vitalität, Kraft und Energien.' },
    { name: 'Lebewesen', description: 'Bezieht sich auf Lebensformen, Biologie und Ökosysteme.' },
    { name: 'Geist', description: 'Betrifft den Verstand, Bewusstsein und Spiritualität.' },
    { name: 'Nichts', description: 'Repräsentiert Leere, Potenzial und das Unbekannte.' },
  ];

  return (
    // --- KEINE SafeAreaView ---
    // Hauptcontainer mit Flex
    <View style={globalStyles.container}>
        {/* Header */}
        <View style={[globalStyles.header, { justifyContent: 'flex-start' }]}>
           <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
             <ArrowLeft size={24} color="#fff" />
           </TouchableOpacity>
           <Text style={[globalStyles.headerText, { marginLeft: 15 }]}>Archetypen</Text>
        </View>

        {/* ScrollView für die Kacheln */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Grid-Layout für die Kacheln */}
            <View style={globalStyles.tileGrid}>
              {archetypes.map((archetype, index) => (
                <ArchetypeTile
                  key={index}
                  name={archetype.name}
                  description={archetype.description}
                />
              ))}
            </View>
         </ScrollView>
      </View>
    // --- KEINE SafeAreaView ---
  );
};

// Lokale Styles (nur für Padding des Scroll-Bereichs)
const styles = StyleSheet.create({
  scrollContent: {
      padding: 20, // Padding für den ScrollView-Inhalt
  },
});

export default ArchetypesScreen;