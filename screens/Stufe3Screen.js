/* Remote Viewing Guide - Stufe3Screen.js - v0.1.0 */
/*
 * CHANGELOG:
 * v0.1.0 (YYYY-MM-DD):
 * - Initial placeholder screen for Stufe 3.
 * - Uses global styles for appearance (black background via App.js).
 * - Added standard back button.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { globalStyles } from './GlobalStyles'; // Import global styles

const Stufe3Screen = ({ navigation }) => {
  return (
    // --- Verwende globalen Placeholder Container (Hintergrund wird von App.js gesetzt) ---
    <View style={globalStyles.placeholderContainer}>
      {/* --- Standard Back-Button (angepasst für dunklen Hintergrund) --- */}
      <TouchableOpacity
        style={globalStyles.placeholderButton} // Reuse style, color adjusted if needed
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color="#fff" /> {/* White icon */}
      </TouchableOpacity>
      {/* --- Placeholder Text (angepasst für dunklen Hintergrund) --- */}
      <Text style={globalStyles.stufePlaceholderText}>Stufe 3</Text>
      <Text style={[globalStyles.placeholderText, { color: '#ccc' }]}>Wird noch erstellt</Text>
    </View>
  );
};

// Keine lokalen Styles benötigt, da globalStyles verwendet wird.

export default Stufe3Screen;