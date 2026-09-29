import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createAudioPlayer } from 'expo-audio';

interface XylophoneNote {
  id: number;
  label: string;
  subLabel: string;
  color: string;
  pressedColor: string;
  soundAsset: any;
}

const NOTES: XylophoneNote[] = [
  {
    id: 1,
    label: 'DO',
    subLabel: 'C',
    color: '#EF4444',
    pressedColor: '#DC2626',
    soundAsset: require('./assets/sounds/note1.wav'),
  },
  {
    id: 2,
    label: 'RE',
    subLabel: 'D',
    color: '#F97316',
    pressedColor: '#EA580C',
    soundAsset: require('./assets/sounds/note2.wav'),
  },
  {
    id: 3,
    label: 'MI',
    subLabel: 'E',
    color: '#EAB308',
    pressedColor: '#CA8A04',
    soundAsset: require('./assets/sounds/note3.wav'),
  },
  {
    id: 4,
    label: 'FA',
    subLabel: 'F',
    color: '#10B981',
    pressedColor: '#059669',
    soundAsset: require('./assets/sounds/note4.wav'),
  },
  {
    id: 5,
    label: 'SOL',
    subLabel: 'G',
    color: '#06B6D4',
    pressedColor: '#0891B2',
    soundAsset: require('./assets/sounds/note5.wav'),
  },
  {
    id: 6,
    label: 'LA',
    subLabel: 'A',
    color: '#3B82F6',
    pressedColor: '#2563EB',
    soundAsset: require('./assets/sounds/note6.wav'),
  },
  {
    id: 7,
    label: 'SI',
    subLabel: 'B',
    color: '#8B5CF6',
    pressedColor: '#7C3AED',
    soundAsset: require('./assets/sounds/note7.wav'),
  },
];

// Pre-create players for instant responsive playback
const PLAYERS: Record<number, ReturnType<typeof createAudioPlayer>> = {};
NOTES.forEach((n) => {
  try {
    PLAYERS[n.id] = createAudioPlayer(n.soundAsset);
  } catch (err) {
    console.warn(`Failed to preload note ${n.id}:`, err);
  }
});

export default function App() {
  const playSound = async (noteId: number) => {
    try {
      const player = PLAYERS[noteId];
      if (player) {
        await player.seekTo(0);
        player.play();
      }
    } catch (err) {
      console.warn('Error playing note:', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>LAB 5</Text>
        <Text style={styles.title}>XYLOPHONE</Text>
        <Text style={styles.author}>Hồ Văn Sơn • Lập trình đa nền tảng</Text>
      </View>

      {/* 7 Xylophone Bars */}
      <View style={styles.keysContainer}>
        {NOTES.map((note) => (
          <Pressable
            key={note.id}
            onPress={() => playSound(note.id)}
            style={({ pressed }) => [
              styles.keyBar,
              {
                backgroundColor: pressed ? note.pressedColor : note.color,
                // Natural xylophone bar taper: higher pitch = slightly shorter bar
                width: `${100 - (note.id - 1) * 3}%`,
              },
              pressed && styles.keyPressed,
            ]}
          >
            {/* Bar Pin Left */}
            <View style={styles.pin} />

            {/* Note Labels */}
            <View style={styles.labelWrapper}>
              <Text style={styles.keyText}>{note.label}</Text>
              <Text style={styles.keySubText}>{note.subLabel}</Text>
            </View>

            {/* Bar Pin Right */}
            <View style={styles.pin} />
          </Pressable>
        ))}
      </View>

      {/* Footer Instructions */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap any key to play notes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 20) + 10 : 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 3,
  },
  author: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  keysContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
    gap: 8,
  },
  keyBar: {
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  keyPressed: {
    transform: [{ scale: 0.97 }],
  },
  pin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F172A',
    opacity: 0.4,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  keyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  keySubText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
