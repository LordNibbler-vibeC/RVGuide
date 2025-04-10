/* Remote Viewing Guide - Stufe4Screen.js - v0.1.0 */
/*
 * CHANGELOG:
 * v0.1.0 (YYYY-MM-DD):
 * - Initial placeholder screen for Stufe 4.
 * - Uses global styles for appearance (black background via App.js).
 * - Added standard back button.
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { globalStyles } from './GlobalStyles'; // Import global styles

const Stufe4Screen = ({ navigation }) => {
  return (
    <View style={globalStyles.placeholderContainer}>
      <TouchableOpacity
        style={globalStyles.placeholderButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={globalStyles.stufePlaceholderText}>Stufe 4</Text>
      <Text style={[globalStyles.placeholderText, { color: '#ccc' }]}>Wird noch erstellt</Text>
    </View>
  );
};

export default Stufe4Screen;