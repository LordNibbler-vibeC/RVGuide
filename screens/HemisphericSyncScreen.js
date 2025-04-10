/* Remote Viewing Guide - HemisphericSyncScreen.js - v0.1.0 */
/*
 * CHANGELOG:
 * v0.1.1 (YYYY-MM-DD):
 * - Added SafeAreaView wrapper. (Zurückgenommen)
 * v0.1.0 (YYYY-MM-DD):
 * - Initial version with header. Structure reverted to this version.
 */
import React from 'react';
// --- KEINE SafeAreaView ---
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from './GlobalStyles'; // Nutzt v0.2.3 Farben
import { ArrowLeft } from 'lucide-react-native';

const HemisphericSyncScreen = ({ navigation }) => {
  return (
    // --- KEINE SafeAreaView ---
    // Hauptcontainer mit Flex
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={[globalStyles.header, { justifyContent: 'flex-start' }]}>
         <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
           <ArrowLeft size={24} color="#fff" />
         </TouchableOpacity>
         <Text style={[globalStyles.headerText, { marginLeft: 15 }]}>Hemisphärensync.</Text>
      </View>

      {/* ScrollView für den Textinhalt */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Textinhalt */}
        <Text style={[styles.content, { color: globalStyles.colors?.textPrimary }]}>
          Hemisphärensynchronisation ist eine Technik, um die Aktivität zwischen der linken und rechten Gehirnhälfte auszugleichen. Dies kann kognitive Funktionen verbessern und einen Zustand der Entspannung und Konzentration fördern, was für Remote Viewing nützlich ist.
        </Text>
      </ScrollView>
    </View>
    // --- KEINE SafeAreaView ---
  );
};

// Lokale Styles (nur für Padding und Text-Styling)
const styles = StyleSheet.create({
  scrollContent: {
      padding: 20, // Padding für den ScrollView-Inhalt
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // Verbessert Lesbarkeit
  },
});

export default HemisphericSyncScreen;