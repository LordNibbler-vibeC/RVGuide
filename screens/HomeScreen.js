/* Remote Viewing Guide - HomeScreen.js - v0.2.2 */
/* (Bestätigt korrekte Button-Zuweisung und keine SafeAreaView) */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';
import { globalStyles } from './GlobalStyles'; // Nutzt v0.2.3

const HomeScreen = ({ navigation }) => {
  return (
    // Haupt-View nutzt globalStyles.container für flex: 1
    // Hintergrund kommt von App.js cardStyle
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerText}>Remote View</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Einstellungen')}>
          <Settings size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={globalStyles.mainContent}>
        {/* Welcome Message */}
        <View style={globalStyles.welcome}>
          <Text style={globalStyles.title}>Willkommen zurück</Text>
          <Text style={globalStyles.subtitle}>Bereit für eine neue Session?</Text>
        </View>

        {/* Main Menu - Buttons mit korrekten Styles */}
        <View style={globalStyles.grid}>
          <TouchableOpacity
            style={[globalStyles.menuItem, globalStyles.primary]} // Medium Teal
            onPress={() => navigation.navigate('NeueSession')}
          >
            <Text style={globalStyles.menuText}>Neue Session</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.menuItem, globalStyles.secondary]} // Dark Teal
            onPress={() => navigation.navigate('Übungspool')}
          >
            <Text style={globalStyles.menuText}>Übungspool</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.menuItem, globalStyles.secondary]} // Dark Teal
            onPress={() => navigation.navigate('MeineSessions')}
          >
            <Text style={globalStyles.menuText}>Meine Sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.menuItem, globalStyles.secondary]} // Dark Teal
            onPress={() => navigation.navigate('Community')}
          >
            <Text style={globalStyles.menuText}>Community</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Sessions */}
        <View>
          <Text style={globalStyles.sectionTitle}>Letzte Sessions</Text>
          {/* Beispiel Items */}
          <TouchableOpacity style={globalStyles.sessionItem}>
            <Text style={globalStyles.sessionText}>Berglandschaft - 12.02.2025</Text>
            <Text style={globalStyles.sessionScore}>84%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.sessionItem}>
            <Text style={globalStyles.sessionText}>Unbekanntes Objekt - 10.02.2025</Text>
            <Text style={globalStyles.sessionScore}>67%</Text>
          </TouchableOpacity>
        </View>

        {/* Instruction Button */}
        <View style={{ marginTop: 20, alignItems: 'center', paddingBottom: 20 }}>
          <TouchableOpacity
            style={[globalStyles.menuItem, globalStyles.accent, { width: '98%' }]} // Red-Orange
            onPress={() => navigation.navigate('Instruction')}
          >
            <Text style={globalStyles.menuText}>Anleitung</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Keine lokalen Styles mehr nötig

export default HomeScreen;