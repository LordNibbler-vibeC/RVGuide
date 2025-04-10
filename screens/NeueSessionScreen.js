/* Remote Viewing Guide - NeueSessionScreen.js - v1.0.2 */
/*
 * CHANGELOG:
 * v1.0.3 (YYYY-MM-DD):
 * - Added SafeAreaView wrapper. (Zurückgenommen)
 * v1.0.2 (YYYY-MM-DD):
 * - Versioning header added. Background handled by App.js.
 * v1.0.1 ...
 */
import React, { useState } from 'react';
// --- KEINE SafeAreaView ---
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { globalStyles } from './GlobalStyles'; // Nutzt v0.2.3 Farben

const NeueSessionScreen = ({ navigation }) => {
  const [target1, setTarget1] = useState('');
  const [target2, setTarget2] = useState('');
  const [target3, setTarget3] = useState('');

  const startSession = () => {
    navigation.navigate('Stufe1', {
      target1: target1,
      target2: target2,
      target3: target3,
      dailyNumber: target1 || '1234-5678' // Fallback
    });
  };

  return (
    // KeyboardAvoidingView umschließt alles
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={globalStyles.container} // Stellt flex: 1 sicher
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Ggf. anpassen
    >
      {/* Header */}
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={globalStyles.headerText}>Neue Session</Text>
        <View style={{width: 24}} />{/* Spacer */}
      </View>

      {/* ScrollView für den Inhalt */}
      <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" // Hilft bei Tastaturinteraktion
      >
        {/* Content View innerhalb der ScrollView */}
        <View style={styles.content}>
          <Text style={styles.label}>Gib hier deine Target-Nummern ein:</Text>
          <TextInput
              style={styles.input}
              placeholder="Target 1 eingeben"
              placeholderTextColor={globalStyles.colors?.textSecondary || '#7a8c99'}
              value={target1}
              onChangeText={setTarget1}
              returnKeyType="next"
              keyboardAppearance="dark" // Optional
          />
          <TextInput
              style={styles.input}
              placeholder="Target 2 eingeben"
              placeholderTextColor={globalStyles.colors?.textSecondary || '#7a8c99'}
              value={target2}
              onChangeText={setTarget2}
              returnKeyType="next"
              keyboardAppearance="dark"
          />
          <TextInput
              style={styles.input}
              placeholder="Target 3 eingeben"
              placeholderTextColor={globalStyles.colors?.textSecondary || '#7a8c99'}
              value={target3}
              onChangeText={setTarget3}
              returnKeyType="done"
              keyboardAppearance="dark"
          />
          <TouchableOpacity
              // Nutzt Button-Styles aus GlobalStyles und lokale Anpassungen
              style={[globalStyles.menuItem, globalStyles.primary, styles.button]}
              onPress={startSession}
          >
            <Text style={globalStyles.menuText}>Session starten</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Lokale Styles
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1, // Wichtig, damit ScrollView wachsen kann
    },
    content: {
        // flex: 1, // Flex 1 *kann* hier Probleme machen, versuchen wir es ohne
        justifyContent: 'flex-start', // Oben ausrichten
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 40, // Sicherstellen, dass unter dem Button Platz ist
    },
    label: {
        fontSize: 18,
        marginBottom: 25,
        textAlign: 'center',
        color: globalStyles.colors?.textPrimary // Nutzt Farbe aus GlobalStyles
    },
    input: {
        backgroundColor: globalStyles.colors?.white || '#fff', // Nutzt Farbe aus GlobalStyles
        color: globalStyles.colors?.textPrimary, // Nutzt Farbe aus GlobalStyles
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: globalStyles.colors?.mediumGray || '#ccc', // Nutzt Farbe aus GlobalStyles
        fontSize: 16,
    },
    button: {
        width: '100%', // Button volle Breite
        marginTop: 20
    },
});

export default NeueSessionScreen;