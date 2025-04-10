/* Remote Viewing Guide - SplashScreen.js - v0.2.0 */
/*
 * CHANGELOG:
 * v0.2.0 (YYYY-MM-DD):
 * - Changed background color to match image (#f5f3e9).
 * v0.1.0 (YYYY-MM-DD):
 * - Added versioning header. Initial code from AppCode.txt.
 */
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Kurze Verzögerung für den Splash Screen
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Use replace to prevent going back to splash
    }, 3000); // Reduced duration slightly

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.PNG')} // Existing logo
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // --- GEÄNDERT v0.2.0: Hintergrundfarbe an Bild angepasst ---
    backgroundColor: '#f5f3e9',
  },
  image: {
    flex: 1,
    width: '90%',
    maxHeight: '80%', // Ensure logo doesn't stretch excessively vertically
  },
});

export default SplashScreen;