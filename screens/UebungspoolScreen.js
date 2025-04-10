/* Remote Viewing Guide - UebungspoolScreen.js - v0.1.0 */
/*
 * CHANGELOG:
 * v0.1.1 (YYYY-MM-DD):
 * - Added SafeAreaView wrapper. (Zurückgenommen)
 * v0.1.0 (YYYY-MM-DD):
 * - Initial placeholder screen.
 */
import React from 'react';
// --- KEINE SafeAreaView mehr ---
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { globalStyles } from './GlobalStyles'; // Nutzt v0.2.3

const UebungspoolScreen = ({ navigation }) => {
  return (
    // --- KEINE SafeAreaView mehr ---
    <View style={globalStyles.placeholderContainer}>
      <TouchableOpacity style={globalStyles.placeholderButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={24} color={globalStyles.colors?.textPrimary || "#3a506b"} />
      </TouchableOpacity>
      <Text style={globalStyles.placeholderText}>Übungspool Screen - Wird noch erstellt</Text>
    </View>
    // --- KEINE SafeAreaView mehr ---
  );
};

// --- KEINE lokalen Styles mehr nötig ---

export default UebungspoolScreen;