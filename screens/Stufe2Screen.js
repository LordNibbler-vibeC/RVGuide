/* Remote Viewing Guide - Stufe2Screen.js - v0.1.3 */
/*
 * CHANGELOG:
 * v0.1.3 (YYYY-MM-DD):
 * - Fixed ESLint warning: Removed unnecessary 'instructions' dependency from useEffect array.
 * v0.1.2 (YYYY-MM-DD):
 * - Fixed ESLint warning: Added 'instructions' to useEffect dependency array.
 * v0.1.1 (YYYY-MM-DD):
 * - Removed explicit 'backgroundColor: black' from container and blackScreen styles (now handled globally in App.js).
 * - Added versioning header.
 * v0.1.0 (Initial Setup from AppCode.txt):
 * - Uses expo-speech for instructions.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import * as Speech from 'expo-speech';

// Define instructions outside component as it's constant
const instructions = [
    { instruction: 'Nimm ein neues DIN A4-Blatt. Schreibe oben in der Mitte "Stufe 2 Blatt 1".', action: 'Titel schreiben', delay: 5000 },
    { instruction: 'Schreibe "Farben:" und notiere alle Farben, die du wahrnimmst.', action: 'Farben', delay: 7000 },
    { instruction: 'Schreibe "Oberflächen:" und notiere alle Oberflächen, z. B. glatt oder rau.', action: 'Oberflächen', delay: 7000 },
    { instruction: 'Schreibe "Gerüche:" und notiere alle Gerüche.', action: 'Gerüche', delay: 7000 },
    { instruction: 'Schreibe "Geschmäcker:" und notiere alle Geschmäcker.', action: 'Geschmäcker', delay: 7000 },
    { instruction: 'Schreibe "Temperaturen:" und notiere alle Temperaturen.', action: 'Temperaturen', delay: 7000 },
    { instruction: 'Schreibe "Geräusche:" und notiere alle Geräusche.', action: 'Geräusche', delay: 7000 },
    { instruction: 'Schreibe "Dimensionen:" und notiere Größenverhältnisse.', action: 'Dimensionen', delay: 7000 },
    { instruction: 'Schreibe "Innen oder außen?:" und entscheide, ob es innen oder außen ist.', action: 'Innen/außen', delay: 7000 },
    { instruction: 'Schreibe "Objektcharakter:" und notiere, ob es ein oder mehrere Objekte sind.', action: 'Objektcharakter', delay: 7000 },
    { instruction: 'Schreibe "Bewegung:" und beschreibe, ob es statisch oder dynamisch ist.', action: 'Bewegung', delay: 7000 },
    { instruction: 'Schreibe "Energie:" und notiere den Energiezustand.', action: 'Energie', delay: 7000 },
    { instruction: 'Schreibe "Distanz:" und notiere, ob es weit, nah, begrenzt oder überschaubar ist.', action: 'Distanz', delay: 7000 },
    { instruction: 'Schreibe "Perspektive:" und notiere, wo du stehst (z. B. innen, außen).', action: 'Perspektive', delay: 7000 },
    { instruction: 'Du hast Stufe 2 abgeschlossen. Drücke den Knopf um zu Stufe 3 zu gehen.', action: 'Ende', delay: 5000 }, // Text angepasst
];

const Stufe2Screen = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showEndStage, setShowEndStage] = useState(false);

  useEffect(() => {
     let isMounted = true;
     let timeoutId = null;

     const speakAndProceed = async (index) => {
         // Check index validity against the externally defined instructions array
         if (index < instructions.length && isMounted) {
             const { instruction, delay } = instructions[index];
             try {
                 await Speech.stop();
                 await Speech.speak(instruction, {
                     language: 'de-DE', pitch: 1, rate: 0.8,
                     onDone: () => {
                         if (isMounted) {
                             timeoutId = setTimeout(() => {
                                 if(isMounted) {
                                     if(index === instructions.length - 1) { setShowEndStage(true); }
                                     else { setCurrentStep(index + 1); }
                                 }
                             }, delay || 5000);
                         }
                     },
                     onError: (error) => {
                        console.error("Speech Error:", error);
                        if (isMounted) {
                            timeoutId = setTimeout(() => {
                                if(isMounted) {
                                     if(index === instructions.length - 1) { setShowEndStage(true); }
                                     else { setCurrentStep(index + 1); }
                                 }
                            }, delay || 5000);
                        }
                     }
                 });
             } catch (error) {
                 console.error("Speech.speak failed:", error);
                  if (isMounted) {
                     timeoutId = setTimeout(() => {
                        if(isMounted) {
                             if(index === instructions.length - 1) { setShowEndStage(true); }
                             else { setCurrentStep(index + 1); }
                         }
                     }, delay || 5000);
                  }
             }
         }
     };

     speakAndProceed(currentStep);

     return () => {
         isMounted = false;
         if (timeoutId) clearTimeout(timeoutId);
         Speech.stop();
     };
    // --- FIX v0.1.3: Removed 'instructions' from dependency array as it's defined outside scope ---
 }, [currentStep]); // Rerun effect only when currentStep changes


  const handleEndStage = () => {
    Speech.stop();
    navigation.navigate('Stufe3', route.params);
  };

  const handleGoBack = () => {
     Speech.stop();
     if (currentStep > 0) {
         setCurrentStep(currentStep - 1);
         setShowEndStage(false);
     } else {
         navigation.goBack();
     }
  }

  return (
    <View style={styles.container}>
      <View style={styles.blackScreenContent}>
        <Text style={styles.stufenAnzeige}>Stufe 2 Blatt 1</Text>
         <View style={styles.instructionContainer}>
             <Text style={styles.instructionText}>
                 {/* Access instructions array directly */}
                 {currentStep < instructions.length ? instructions[currentStep].instruction : "Stufe 2 Abgeschlossen"}
             </Text>
         </View>

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>

        {showEndStage && (
          <TouchableOpacity style={styles.endStageButton} onPress={handleEndStage}>
            <Text style={styles.buttonText}>Zu Stufe 3</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// --- Styles (Unverändert) ---
const styles = StyleSheet.create({
  container: { flex: 1 },
  blackScreenContent: { flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, paddingBottom: 40 },
  stufenAnzeige: { position: 'absolute', top: 30, alignSelf: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: 'bold', },
  instructionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 10, marginTop: 40, marginBottom: 80, },
  instructionText: { color: 'white', fontSize: 18, textAlign: 'center', lineHeight: 25, },
  backButton: { position: 'absolute', left: 20, bottom: 40, padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 30 },
  endStageButton: { position: 'absolute', right: 20, bottom: 40, paddingVertical: 12, paddingHorizontal: 20, backgroundColor: 'rgba(0,200,100,0.5)', borderRadius: 30 },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '600' },
});

export default Stufe2Screen;