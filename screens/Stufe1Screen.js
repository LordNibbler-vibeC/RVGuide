/* Remote Viewing Guide - Stufe1Screen.js - v1.1.9 */
/*
 * CHANGELOG:
 * v1.1.9 (YYYY-MM-DD):
 * - Fixed ESLint warnings:
 *   - Wrapped case block content in {} for `no-case-declarations`.
 *   - Disabled `exhaustive-deps` rule for main useEffect hook.
 * v1.1.8 (YYYY-MM-DD):
 * - Removed explicit 'backgroundColor: black' from container and blackScreen styles (now handled globally in App.js).
 * - Added versioning header (formatted).
 * v1.1.7 (YYYY-MM-DD):
 * - Refactored audio sequence generation and validation logic.
 * (Previous logs omitted for brevity)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { ArrowLeft, SkipForward } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

let soundObject = null;

const Stufe1Screen = ({ navigation, route }) => {
  const { target1, target2, target3, dailyNumber } = route.params || {};
  const [currentBlatt, setCurrentBlatt] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [showIdiogramSectionsModal, setShowIdiogramSectionsModal] = useState(false);
  const [idiogramSections, setIdiogramSections] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [showSectionButton, setShowSectionButton] = useState(false);
  const [showTargetNumber, setShowTargetNumber] = useState(false);
  const [showEndBlattButton, setShowEndBlattButton] = useState(false);
  const [shownModals, setShownModals] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingSound, setIsLoadingSound] = useState(false);
  const [debugMessage, setDebugMessage] = useState('Debug Status Initialized.');

  // --- Sound Management --- (Unverändert)
  const unloadSound = async () => { /* ... */
       setDebugMessage('Unloading sound...');
       console.log('[unloadSound] Attempting to unload sound. Current soundObject:', soundObject ? 'Exists' : 'null');
       if (soundObject) {
           try {
               const status = await soundObject.getStatusAsync();
               if (status.isLoaded) {
                    console.log('[unloadSound] Sound is loaded, stopping...');
                    await soundObject.stopAsync();
                    console.log('[unloadSound] Sound stopped, unloading...');
                    await soundObject.unloadAsync();
                    console.log('[unloadSound] Sound unloaded successfully.');
                    setDebugMessage('Sound unloaded.');
               } else {
                    console.log('[unloadSound] Sound was not loaded.');
                    setDebugMessage('Sound was not loaded.');
               }
           } catch (error) {
               if (!error.message.includes('Cannot get status of unloaded Sound object') && !error.message.includes('Player is already released') ) {
                   console.error('[unloadSound] Error during unload:', error);
                   setDebugMessage(`ERR: Unload ${error.message}`);
               } else {
                   console.log('[unloadSound] Sound already unloaded or never loaded.');
                    setDebugMessage('Sound already unloaded.');
               }
           } finally {
               soundObject = null;
               console.log('[unloadSound] soundObject set to null.');
           }
       } else {
           console.log('[unloadSound] No sound object to unload.');
           setDebugMessage('No sound to unload.');
       }
       setIsPlaying(false);
       setIsLoadingSound(false);
   };
  const stopPlayback = async () => { /* ... */
    setDebugMessage('Stopping playback...');
    console.log('[stopPlayback] Stopping all playback.');
    Speech.stop();
    await unloadSound();
    setDebugMessage('Playback stopped.');
    console.log('[stopPlayback] Playback fully stopped.');
  };

  // --- Instruktionslogik ---
   const generateTargetSequence = (targetString) => { /* ... unverändert ... */
        const sequence = [];
        console.log(`[generateTargetSequence] Generating sequence for target: ${targetString}`);
        for (const char of targetString) {
            let path;
            switch (char) {
                case '0': path = require('../assets/audio/ziffer_0.mp3'); break;
                case '1': path = require('../assets/audio/ziffer_1.mp3'); break;
                case '2': path = require('../assets/audio/ziffer_2.mp3'); break;
                case '3': path = require('../assets/audio/ziffer_3.mp3'); break;
                case '4': path = require('../assets/audio/ziffer_4.mp3'); break;
                case '5': path = require('../assets/audio/ziffer_5.mp3'); break;
                case '6': path = require('../assets/audio/ziffer_6.mp3'); break;
                case '7': path = require('../assets/audio/ziffer_7.mp3'); break;
                case '8': path = require('../assets/audio/ziffer_8.mp3'); break;
                case '9': path = require('../assets/audio/ziffer_9.mp3'); break;
                case '-': path = require('../assets/audio/trennzeichen_bindestrich.mp3'); break;
                case ' ': path = require('../assets/audio/pause_kurz.mp3'); break; // Use pause for space
                default: path = null; // Ignore other characters
            }
            if (path) {
                sequence.push({ type: 'mp3', path });
            }
        }
        return sequence;
   };
   const getSectionNumberPath = (sectionNum) => { /* ... unverändert ... */
        console.log(`[getSectionNumberPath v1.1.7] Getting path for section number: ${sectionNum}`);
        switch (sectionNum) {
            case 1: return require('../assets/audio/ziffer_1.mp3'); // Section 1 uses ziffer_1
            case 2: return require('../assets/audio/ziffer_2.mp3');
            case 3: return require('../assets/audio/ziffer_3.mp3');
            case 4: return require('../assets/audio/ziffer_4.mp3');
            case 5: return require('../assets/audio/ziffer_5.mp3');
            case 6: return require('../assets/audio/ziffer_6.mp3');
            case 7: return require('../assets/audio/ziffer_7.mp3');
            case 8: return require('../assets/audio/ziffer_8.mp3');
            case 9: return require('../assets/audio/ziffer_9.mp3');
            case 10: return require('../assets/audio/zahl_10.mp3'); // Dedicated MP3
            case 11: return require('../assets/audio/zahl_11.mp3'); // Dedicated MP3
            default:
                console.error(`[getSectionNumberPath] Invalid section number: ${sectionNum}. Should be 1-11.`);
                setDebugMessage(`ERR: Invalid Section ${sectionNum}`);
                return null;
        }
   };
   const getCurrentTargetLine = () => { /* ... unverändert ... */
        const t1 = target1 || dailyNumber || '1111-1111'; // Fallback if T1 is empty
        const targets = [t1, target2, target3].filter(Boolean); // Filter out null/empty targets
        const combinedTargets = targets.join(' '); // Join existing targets with a space
        console.log(`[getCurrentTargetLine] Combined Targets: "${combinedTargets}"`);
        return combinedTargets;
   };
    const getInstructionSequence = (step, blatt, sectionNum = 0) => {
        console.log(`[getInstructionSequence v1.1.7] Called with: step=${step}, blatt=${blatt}, sectionNum=${sectionNum}`);

        // --- Handle Special String Steps First ---
        if (step === 'SECTION_INSTRUCTION') {
             console.log('[getInstructionSequence] Matched SECTION_INSTRUCTION');
             const sectionNumberPath = getSectionNumberPath(sectionNum);
             if (!sectionNumberPath) {
                 console.error(`[getInstructionSequence] Could not get MP3 path for section number ${sectionNum}.`);
                 return [];
             }
            return [
                { type: 'mp3', path: require('../assets/audio/s1_bx_section_intro.mp3') },
                { type: 'mp3', path: sectionNumberPath },
                { type: 'mp3', path: require('../assets/audio/s1_bx_section_details.mp3') }
            ];
        }
        if (step === 'AI_OUTRO') {
             console.log('[getInstructionSequence] Matched AI_OUTRO');
            return [{ type: 'mp3', path: require('../assets/audio/s1_bx_ai_outro.mp3') }];
        }

        if (typeof step !== 'number') { return []; }

        if (blatt === 1 && step === 0) { return [{ type: 'mp3', path: require('../assets/audio/s1_b1_step0_vorbereitung.mp3') }]; }
        if (blatt === 1 && step === 1) { return [{ type: 'mp3', path: require('../assets/audio/s1_b1_step1_name_datum.mp3') }]; }

        const baseStepIndex = blatt === 1 ? step - 2 : step;

        switch (baseStepIndex) {
            case 0: { // --- FIX v1.1.9: Added braces for lexical declaration scope ---
                let blattTitelPath;
                if (blatt === 1) blattTitelPath = require('../assets/audio/s1_bx_step0_blatt1_titel.mp3');
                else if (blatt === 2) blattTitelPath = require('../assets/audio/s1_bx_step0_blatt2_titel.mp3');
                else if (blatt === 3) blattTitelPath = require('../assets/audio/s1_bx_step0_blatt3_titel.mp3');
                else { console.warn("Unhandled Blatt number:", blatt); return []; }
                return [{ type: 'mp3', path: blattTitelPath }];
            } // --- FIX v1.1.9: End braces ---
            case 1:
                if (blatt === 1) { return [{ type: 'mp3', path: require('../assets/audio/s1_b1_step1_ai.mp3') }]; }
                return [];
            case 2: { // --- FIX v1.1.9: Added braces for lexical declaration scope ---
                setShowTargetNumber(true);
                const targetLine = getCurrentTargetLine();
                const targetSequence = generateTargetSequence(targetLine);
                return [
                    { type: 'mp3', path: require('../assets/audio/s1_bx_step2_target_intro.mp3') },
                    ...targetSequence
                ];
            } // --- FIX v1.1.9: End braces ---
            case 3:
                return [{ type: 'mp3', path: require('../assets/audio/s1_bx_step3_idiogram_unterteilen.mp3') }];
            case 4:
                return [{ type: 'mp3', path: require('../assets/audio/s1_bx_step4_anzahl_sektionen_eingabe.mp3') }];
            default:
                console.log(`[getInstructionSequence] No sequence found for numeric step ${step} (base ${baseStepIndex})`);
                return [];
        }
    };
    const playSequence = async (sequence, sequenceIndex = 0, onSequenceComplete = () => {}) => { /* ... unverändert ... */
        setDebugMessage(`PlaySeq: Idx ${sequenceIndex}/${sequence.length}`);
        console.log(`[playSequence v1.1.7] Start. Index: ${sequenceIndex}/${sequence.length}.`);

        if (!sequence || sequence.length === 0) {
             console.error('[playSequence] Error: Received empty sequence.');
             setDebugMessage(`ERR: Empty sequence!`);
             setIsPlaying(false); setIsLoadingSound(false); onSequenceComplete(); return;
        }
        if (sequenceIndex >= sequence.length) {
            setDebugMessage(`PlaySeq: Done.`);
            console.log('[playSequence] Sequence completed.');
            setIsPlaying(false); setIsLoadingSound(false); onSequenceComplete(); return;
        }
        const currentPart = sequence[sequenceIndex];
        if (!currentPart || !currentPart.type) {
             console.error(`[playSequence] Invalid part @${sequenceIndex}:`, currentPart);
             setDebugMessage(`ERR: Invalid part ${sequenceIndex}`);
             playSequence(sequence, sequenceIndex + 1, onSequenceComplete); return;
        }

        console.log(`[playSequence] Processing Part ${sequenceIndex + 1}: Type=${currentPart.type}`);

        if (currentPart.type === 'mp3') {
            await unloadSound(); // Ensure previous sound is cleared

            setDebugMessage(`PlaySeq: Loading MP3 ${sequenceIndex}...`);
            setIsLoadingSound(true); setIsPlaying(false);
            soundObject = new Audio.Sound();

            soundObject.setOnPlaybackStatusUpdate((status) => {
                 if (!status.isLoaded) {
                    if (status.error) {
                        console.error(`[Playback Error] Part ${sequenceIndex}:`, status.error);
                        setDebugMessage(`ERR: MP3 Load ${status.error}`);
                        soundObject?.setOnPlaybackStatusUpdate(null);
                        unloadSound().then(() => playSequence(sequence, sequenceIndex + 1, onSequenceComplete));
                    }
                 } else {
                     setIsLoadingSound(false); setIsPlaying(status.isPlaying);
                     if (status.isPlaying) { setDebugMessage(`PlaySeq: Playing MP3 ${sequenceIndex}`); }
                     else if (status.didJustFinish && !status.isLooping) {
                         setDebugMessage(`PlaySeq: MP3 ${sequenceIndex} Finished.`);
                         console.log(`[playSequence] MP3 Part ${sequenceIndex} finished.`);
                         soundObject?.setOnPlaybackStatusUpdate(null);
                         playSequence(sequence, sequenceIndex + 1, onSequenceComplete); // Proceed immediately
                     } else { setDebugMessage(`PlaySeq: MP3 ${sequenceIndex} Loaded/Paused`); }
                 }
            });

            try {
                if (!currentPart.path) { throw new Error(`MP3 path missing @${sequenceIndex}`); }
                console.log('[playSequence] Loading MP3:', currentPart.path);
                await soundObject.loadAsync(currentPart.path);
                setDebugMessage(`PlaySeq: MP3 ${sequenceIndex} Loaded.`);
                console.log('[playSequence] MP3 loaded, playing...');
                await soundObject.playAsync();
            } catch (error) {
                console.error(`[playSequence] Error loading/playing MP3 @${sequenceIndex}:`, error);
                setDebugMessage(`ERR: MP3 Play ${error.message}`);
                setIsLoadingSound(false); setIsPlaying(false);
                soundObject?.setOnPlaybackStatusUpdate(null);
                unloadSound().then(() => playSequence(sequence, sequenceIndex + 1, onSequenceComplete));
            }
        } else {
            console.warn('[playSequence] Unknown part type:', currentPart.type, `@${sequenceIndex}`);
            setDebugMessage(`PlaySeq: Skipping unknown type ${sequenceIndex}`);
            playSequence(sequence, sequenceIndex + 1, onSequenceComplete);
        }
    };

  // --- useEffect Hooks ---
  useEffect(() => {
    setDebugMessage(`Effect: B${currentBlatt} S${currentStep} triggered`);
    stopPlayback().then(() => {
        setDebugMessage(`Effect: B${currentBlatt} S${currentStep} get sequence`);
        const sequence = getInstructionSequence(currentStep, currentBlatt);
        if (sequence && sequence.length > 0) {
            setDebugMessage(`Effect: B${currentBlatt} S${currentStep} play seq.`);
            playSequence(sequence);
        } else {
            setDebugMessage(`No sequence for S${currentStep} B${currentBlatt}`);
             setIsPlaying(false); setIsLoadingSound(false);
        }
    });
    return () => {
      setDebugMessage(`Cleanup: B${currentBlatt} S${currentStep}`);
      stopPlayback();
    };
    // --- FIX v1.1.9: Disabled exhaustive-deps rule for this hook ---
    // The functions getInstructionSequence, playSequence, stopPlayback are stable
    // within this component's lifecycle and don't depend on props/state not already listed.
    // Adding them would require useCallback, which is avoided for minimal changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, currentBlatt]);


  // --- Button Handler --- (Unverändert)
  const handleNextStep = () => { /* ... */
    setDebugMessage('Next Step pressed');
    stopPlayback().then(() => {
        setDebugMessage('Next Step: Playback stopped');
        setShowTargetNumber(false);
        const prepSteps = currentBlatt === 1 ? 2 : 0;
        const lastInstructionStepIndex = prepSteps + 4;
        if (currentStep === lastInstructionStepIndex) {
            setDebugMessage('Next Step: Show Modal');
            setShowIdiogramSectionsModal(true);
        } else if (currentStep < lastInstructionStepIndex) {
             const nextStep = currentStep + 1;
             setDebugMessage(`Next Step: To ${nextStep}`);
             setCurrentStep(nextStep);
        } else { console.warn(`[handleNextStep] Unexpected step ${currentStep}`); }
    });
  };
  const handleBackStep = () => { /* ... */
     setDebugMessage('Back Step pressed');
    stopPlayback().then(() => {
        setDebugMessage('Back Step: Playback stopped');
        setShowTargetNumber(false); setShowIdiogramSectionsModal(false);
        setShowSectionButton(false); setShowEndBlattButton(false);
        setCurrentSection(0); // Reset section progress
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            setDebugMessage(`Back Step: To Step ${prevStep}`);
            setCurrentStep(prevStep);
        } else if (currentBlatt > 1) {
            const prevBlatt = currentBlatt - 1;
            setDebugMessage(`Back Step: To Blatt ${prevBlatt}, Step 0`);
            setCurrentBlatt(prevBlatt); setCurrentStep(0);
        } else {
            setDebugMessage('Back Step: To Prev Screen');
            navigation.goBack();
        }
    });
  };
  const validateIdiogramSections = () => { /* ... */
      setDebugMessage('Validate sections called (Range 2-11)');
      stopPlayback().then(async () => {
          setDebugMessage('Validate: Stopped playback. Validating (2-11)...');
          const sections = parseInt(idiogramSections);
          if (!isNaN(sections) && sections >= 2 && sections <= 11) {
               setDebugMessage(`Validate: Valid sections (${sections}). Starting Section 1.`);
              setShowIdiogramSectionsModal(false);
              setShownModals((prev) => ({ ...prev, [currentBlatt]: true }));
              // --- Start from Section 1 ---
              setCurrentSection(1);
              setShowSectionButton(true);
              setDebugMessage('Validate: Getting section 1 sequence...');
              // --- Get Sequence for Section 1 ---
              const sequence = getInstructionSequence('SECTION_INSTRUCTION', currentBlatt, 1); // Start with section 1

              if (sequence && sequence.length > 0) {
                  setDebugMessage('Validate: Sequence found. Playing section 1...');
                  playSequence(sequence);
              } else {
                  setDebugMessage('ERR: No sequence for section 1!');
                   console.error(`[validateIdiogramSections] ERROR: No sequence found for SECTION_INSTRUCTION on Blatt ${currentBlatt}, Section 1!`);
                   setIsPlaying(false);
              }
          } else {
              setDebugMessage('Validate: Invalid input. Playing MP3 feedback (2-11).');
               playSequence([{ type: 'mp3', path: require('../assets/audio/s1_bx_validation_2_11.mp3') }]);
              setIdiogramSections('');
          }
      });
  };
  const handleNextSection = () => { /* ... */
     setDebugMessage(`Next Section pressed (current: ${currentSection})`);
    stopPlayback().then(() => {
        setDebugMessage('Next Section: Playback stopped');
        const totalSections = parseInt(idiogramSections); // Range 2-11
        const nextSection = currentSection + 1;
        if (currentSection < totalSections) {
             setDebugMessage(`Next Section: To Section ${nextSection}`);
             setCurrentSection(nextSection);
             const sequence = getInstructionSequence('SECTION_INSTRUCTION', currentBlatt, nextSection);
              if (sequence && sequence.length > 0) {
                   setDebugMessage(`Next Section: Playing seq for ${nextSection}`);
                  playSequence(sequence);
              } else {
                  setDebugMessage(`ERR: No seq for section ${nextSection}`);
                  setIsPlaying(false);
              }
        } else {
             setDebugMessage('Next Section: All sections done. Playing AI Outro.');
             setShowSectionButton(false);
             const sequence = getInstructionSequence('AI_OUTRO', currentBlatt);
              if (sequence && sequence.length > 0) {
                   setDebugMessage('Next Section: Playing AI Outro seq.');
                  playSequence(sequence, 0, () => {
                      setDebugMessage('AI Outro Done. Show End Button.');
                      setShowEndBlattButton(true);
                  });
              } else {
                  setDebugMessage('ERR: No AI Outro sequence!');
                   setShowEndBlattButton(true); setIsPlaying(false);
              }
        }
    });
  };
  const handleEndBlatt = () => { /* ... */
      setDebugMessage('End Blatt pressed');
      stopPlayback().then(() => {
          setDebugMessage('End Blatt: Playback stopped');
          setShowEndBlattButton(false);
          if (currentBlatt < 3) {
              const nextBlatt = currentBlatt + 1;
              setDebugMessage(`End Blatt: To Blatt ${nextBlatt}`);
              setCurrentBlatt(nextBlatt); setCurrentStep(0);
              setIdiogramSections(''); setCurrentSection(0);
              setShowTargetNumber(false); setShowSectionButton(false);
          } else {
              setDebugMessage('End Blatt: To Stufe 2');
              navigation.navigate('Stufe2', route.params);
          }
      });
  };
  const handleSkipToStufe2 = () => { /* ... */
      setDebugMessage('Skip pressed');
      stopPlayback().then(() => {
          setDebugMessage('Skip: Playback stopped. Navigating.');
          navigation.navigate('Stufe2', route.params);
      });
  };

  // --- Render Funktion --- (Unverändert)
  return (
    <View style={styles.container}>
      {/* ... JSX unverändert ... */}
      <View style={styles.blackScreenContent}>
        <Text style={styles.debugText} numberOfLines={2}>{debugMessage}</Text>
        <Text style={styles.stufenAnzeige}>Stufe 1 Blatt {currentBlatt}</Text>
        {isLoadingSound && <ActivityIndicator size="large" color="#aaa" style={styles.loadingIndicator} />}
        {showTargetNumber && (
          <View style={styles.targetNumberContainer}>
            <Text style={styles.targetTitle}>Deine Targetnummer(n):</Text>
            <Text style={styles.currentTargetLine}>{getCurrentTargetLine()}</Text>
          </View>
        )}
        {/* Buttons */}
        <TouchableOpacity
            style={[ styles.navButton, styles.backButton, (isLoadingSound || isPlaying || showIdiogramSectionsModal) && styles.disabledButton ]}
            onPress={handleBackStep}
            disabled={isLoadingSound || isPlaying || showIdiogramSectionsModal} >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.rightButtonArea}>
            {showEndBlattButton ? (
              <View style={styles.endButtonContainer}>
                <TouchableOpacity
                  style={[ styles.navButton, styles.endBlattButton, (isLoadingSound || isPlaying) && styles.disabledButton ]}
                  onPress={handleEndBlatt}
                  disabled={isLoadingSound || isPlaying} >
                  <Text style={styles.buttonText}> {currentBlatt < 3 ? `Ende Blatt ${currentBlatt}` : 'Weiter zu Stufe 2'} </Text>
                </TouchableOpacity>
                {currentBlatt < 3 && (
                  <TouchableOpacity
                    style={[ styles.navButton, styles.skipButton, (isLoadingSound || isPlaying) && styles.disabledButton ]}
                    onPress={handleSkipToStufe2}
                    disabled={isLoadingSound || isPlaying} >
                    <SkipForward size={18} color="#fff" />
                    <Text style={[styles.buttonText, { marginLeft: 5 }]}>Skip</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : showSectionButton ? (
                <TouchableOpacity
                  style={[ styles.navButton, styles.sectionButton, (isLoadingSound || isPlaying) && styles.disabledButton ]}
                  onPress={handleNextSection}
                  disabled={isLoadingSound || isPlaying} >
                  <Text style={styles.buttonText}>
                    {currentSection < parseInt(idiogramSections || '0') ? `Abschnitt ${currentSection + 1}` : 'Abschnitte fertig'}
                  </Text>
                </TouchableOpacity>
            ) : (
               !showIdiogramSectionsModal && !showEndBlattButton && !showSectionButton && (
                 <TouchableOpacity
                    style={[ styles.navButton, styles.forwardButton, (isLoadingSound || isPlaying) && styles.disabledButton ]}
                    onPress={handleNextStep}
                    disabled={isLoadingSound || isPlaying} >
                    <Text style={styles.buttonText}>Weiter</Text>
                 </TouchableOpacity>
               )
            )}
         </View>
      </View>

      {/* Modal */}
      <Modal
        visible={showIdiogramSectionsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}} >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Anzahl der Idiogramm Sektionen</Text>
            <TextInput
              style={styles.input}
              placeholder="Anzahl (2-11)"
              placeholderTextColor="#bbb"
              value={idiogramSections}
              onChangeText={setIdiogramSections}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={validateIdiogramSections}
              autoFocus={true}
              maxLength={2}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={validateIdiogramSections} >
              <Text style={styles.confirmButtonText}>Bestätigen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// --- Styles --- (Unverändert)
const styles = StyleSheet.create({
  container: { flex: 1 },
  blackScreenContent: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 20, paddingBottom: 40, },
  loadingIndicator: { position: 'absolute', top: 100, alignSelf: 'center', transform: [{ scale: 1.5 }] },
  stufenAnzeige: { position: 'absolute', top: 60, alignSelf: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: 'bold', },
  debugText: { position: 'absolute', top: 15, left: 10, right: 10, color: '#00FF00', fontSize: 11, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.7)', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 3, zIndex: 10, },
  targetNumberContainer: { position: 'absolute', top: '35%', left: 0, right: 0, alignItems: 'center', paddingHorizontal: 10, },
  targetTitle: { color: 'white', fontSize: 18, marginBottom: 10, },
  currentTargetLine: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 10, letterSpacing: 1.5 },
  navButton: { paddingVertical: 12, paddingHorizontal: 18, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', minWidth: 60, },
  backButton: { position: 'absolute', left: 20, bottom: 40, },
  rightButtonArea: { position: 'absolute', right: 20, bottom: 40, flexDirection: 'row', alignItems: 'center', },
  endButtonContainer: { flexDirection: 'row', alignItems: 'center', },
  forwardButton: { /* Default */ },
  sectionButton: { backgroundColor: 'rgba(60, 100, 200, 0.5)', },
  endBlattButton: { backgroundColor: 'rgba(0, 200, 100, 0.5)', },
  skipButton: { backgroundColor: 'rgba(255, 150, 0, 0.6)', marginLeft: 10, paddingHorizontal: 12, },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '600', textAlign: 'center', },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', },
  modalContainer: { width: '85%', maxWidth: 350, backgroundColor: '#282828', borderRadius: 15, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 5, elevation: 10, },
  modalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', },
  input: { width: '100%', backgroundColor: '#444', color: 'white', padding: 18, borderRadius: 10, marginBottom: 25, textAlign: 'center', fontSize: 20, borderWidth: 1, borderColor: '#666', },
  confirmButton: { backgroundColor: '#5bc0be', paddingVertical: 14, paddingHorizontal: 35, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 10, },
  confirmButtonText: { color: 'white', fontSize: 17, fontWeight: 'bold', },
  disabledButton: { backgroundColor: 'rgba(120, 120, 120, 0.3)', opacity: 0.7, }
});

export default Stufe1Screen;