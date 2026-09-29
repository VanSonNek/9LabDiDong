import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar as RNStatusBar,
  ImageSourcePropType,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const diceImages: Record<number, ImageSourcePropType> = {
  1: require('./assets/images/dice1.png'),
  2: require('./assets/images/dice2.png'),
  3: require('./assets/images/dice3.png'),
  4: require('./assets/images/dice4.png'),
  5: require('./assets/images/dice5.png'),
  6: require('./assets/images/dice6.png'),
};

export default function App() {
  const [leftDice, setLeftDice] = useState<number>(1);
  const [rightDice, setRightDice] = useState<number>(2);

  const rollDice = () => {
    const newLeft = Math.floor(Math.random() * 6) + 1;
    const newRight = Math.floor(Math.random() * 6) + 1;
    setLeftDice(newLeft);
    setRightDice(newRight);
  };

  const total = leftDice + rightDice;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>LAB 3</Text>
        <Text style={styles.title}>Dice Game</Text>
        <Text style={styles.subtitle}>Tap the button or dice to roll</Text>
      </View>

      {/* Dice Arena */}
      <View style={styles.diceSection}>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>TOTAL: {total}</Text>
        </View>

        <View style={styles.diceRow}>
          {/* Left Die */}
          <Pressable
            onPress={rollDice}
            style={({ pressed }) => [
              styles.diceWrapper,
              pressed && styles.dicePressed,
            ]}
          >
            <Image
              source={diceImages[leftDice]}
              style={styles.diceImage}
              resizeMode="contain"
            />
          </Pressable>

          {/* Right Die */}
          <Pressable
            onPress={rollDice}
            style={({ pressed }) => [
              styles.diceWrapper,
              pressed && styles.dicePressed,
            ]}
          >
            <Image
              source={diceImages[rightDice]}
              style={styles.diceImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      {/* Action Button & Footer */}
      <View style={styles.actionSection}>
        <Pressable
          onPress={rollDice}
          style={({ pressed }) => [
            styles.rollButton,
            pressed && styles.rollButtonPressed,
          ]}
        >
          <Text style={styles.rollButtonText}>ROLL DICE</Text>
        </Pressable>

        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>Hồ Văn Sơn</Text>
          <Text style={styles.courseName}>Lập trình đa nền tảng</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 44,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 20) + 20 : 44,
  },
  header: {
    alignItems: 'center',
  },
  badge: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  diceSection: {
    alignItems: 'center',
    width: '100%',
  },
  totalBadge: {
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  totalText: {
    color: '#F59E0B',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  diceWrapper: {
    backgroundColor: '#1E293B',
    padding: 8,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dicePressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.85,
  },
  diceImage: {
    width: 120,
    height: 120,
  },
  actionSection: {
    alignItems: 'center',
    width: '100%',
  },
  rollButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 24,
  },
  rollButtonPressed: {
    backgroundColor: '#BE123C',
    transform: [{ scale: 0.96 }],
  },
  rollButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },
  studentInfo: {
    alignItems: 'center',
  },
  studentName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  courseName: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
