/* Remote Viewing Guide - GlobalStyles.js - v0.2.3 */
/* (Bestätigt korrekte Button-/Kachelfarben) */
import { StyleSheet } from 'react-native';

const colors = {
  offWhite: '#f5f3e9',
  darkTeal: '#3a506b',
  mediumTeal: '#6fc0ba',
  redOrange: '#e87a7a',
  textPrimary: '#3a506b',
  textSecondary: '#7a8c99',
  white: '#ffffff',
  black: '#000000',
  placeholderGray: '#aaa',
  placeholderWhite: '#ccc',
  mediumGray: '#ccc',
};

export const globalStyles = StyleSheet.create({
  container: { flex: 1 }, // Container füllt verfügbaren Platz
  header: { /* ... darkTeal Hintergrund ... */
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.darkTeal
   },
  headerText: { /* ... weißer Text ... */
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'System',
  },
  mainContent: { padding: 16 }, // Padding für den Scrollbereich
  welcome: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '600', color: colors.textPrimary, fontFamily: 'System', marginBottom: 4, },
  subtitle: { color: colors.textSecondary, fontSize: 16, },
  grid: { // Layout für die 4 Hauptbuttons
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuItem: { // Style für *alle* Menü-Buttons
    width: '48%', // Zwei Buttons pro Zeile
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuText: { // Text *in* den Menü-Buttons
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  // --- Button-Farbzuweisungen ---
  primary: { backgroundColor: colors.mediumTeal },   // Für 'Neue Session'
  secondary: { backgroundColor: colors.darkTeal },    // Für 'Übungspool', 'Meine Sessions', 'Community'
  accent: { backgroundColor: colors.redOrange },     // Für 'Anleitung'
  neutral: { backgroundColor: colors.darkTeal },      // Standard/Fallback
  // --- Restliche Styles ---
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12, },
  sessionItem: { backgroundColor: colors.white, padding: 14, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', elevation: 1, borderWidth: 1, borderColor: colors.mediumGray, },
  sessionText: { color: colors.textPrimary, },
  sessionScore: { color: colors.mediumTeal, fontWeight: 'bold' },
  backButton: { padding: 4, },
  placeholderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, },
  placeholderText: { fontSize: 18, color: colors.placeholderGray, textAlign: 'center', marginBottom: 20, },
  placeholderButton: { position: 'absolute', top: 40, left: 20, padding: 10, backgroundColor: 'rgba(58, 80, 107, 0.2)', borderRadius: 30, zIndex: 1, },
  stufePlaceholderText: { fontSize: 24, color: colors.white, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, },
  stufePlaceholderInfoText: { fontSize: 18, color: colors.placeholderWhite, textAlign: 'center', marginBottom: 20, },
  tileGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', },
  tile: { width: '48%', aspectRatio: 1.2, backgroundColor: colors.darkTeal, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderRadius: 10, padding: 8, borderWidth: 1, borderColor: colors.mediumGray, },
  tileText: { fontSize: 14, textAlign: 'center', color: colors.white, },
  colors: colors,
});