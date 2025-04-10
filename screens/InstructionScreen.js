/* Remote Viewing Guide - InstructionScreen.js - v0.2.0 */
/*
 * CHANGELOG:
 * v0.2.2 (YYYY-MM-DD):
 * - Corrected SafeAreaView background color. (Zurückgenommen)
 * v0.2.1 (YYYY-MM-DD):
 * - Wrapped content in SafeAreaView. (Zurückgenommen)
 * v0.2.0 (YYYY-MM-DD):
 * - Transformed screen into a menu linking to various info sections.
 * (Previous logs omitted)
 */
import React from 'react';
// --- KEINE SafeAreaView mehr ---
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from './GlobalStyles'; // Nutzt v0.2.3
import { ArrowLeft } from 'lucide-react-native';

const InstructionScreen = ({ navigation }) => {

  const menuItems = [
    { label: 'Allgemeiner Prozess', screen: 'GeneralProcess' },
    { label: 'Hemisphären-Synchronisation', screen: 'HemisphericSync' },
    { label: 'Correct Target Info', screen: 'CorrectTarget' },
    { label: 'Archetypen', screen: 'Archetypes' },
    { label: 'AOL Erklärung', screen: 'AOLExplanation' },
  ];

  return (
    // --- KEINE SafeAreaView mehr ---
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={[globalStyles.header, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity
          style={globalStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[globalStyles.headerText, { marginLeft: 15 }]}>Anleitung & Info</Text>
      </View>

      {/* Scrollbarer Bereich für die Menü-Buttons */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {menuItems.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={[globalStyles.menuItem, globalStyles.secondary, styles.menuButton]}
              onPress={() => {
                  navigation.navigate(item.screen);
                  console.log(`Navigating to ${item.screen}`);
              }}
            >
              <Text style={globalStyles.menuText}>{item.label}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    // --- KEINE SafeAreaView mehr ---
  );
};

// Lokale Styles (wie in v0.2.0)
const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  menuButton: {
    width: '98%',
    marginBottom: 15,
  },
});

export default InstructionScreen;