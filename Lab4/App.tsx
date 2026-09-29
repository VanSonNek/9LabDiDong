import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const ANSWERS = [
  'Yes, definitely!',
  'It is certain.',
  'Without a doubt.',
  'Most likely.',
  'Outlook good.',
  'Ask again later.',
  'Cannot predict now.',
  'Don’t count on it.',
  'My reply is no.',
  'Very doubtful.',
  'Absolutely!',
  'Better not tell you now.',
];

export default function App() {
  const [answer, setAnswer] = useState<string>('Ask a question & tap ASK!');
  const [shakeCount, setShakeCount] = useState<number>(0);

  const askMagicBall = () => {
    let randomIndex = Math.floor(Math.random() * ANSWERS.length);
    // Ensure variety if same index picked
    if (ANSWERS[randomIndex] === answer && ANSWERS.length > 1) {
      randomIndex = (randomIndex + 1) % ANSWERS.length;
    }
    setAnswer(ANSWERS[randomIndex]);
    setShakeCount((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>LAB 4</Text>
        <Text style={styles.title}>Magic 8 Ball</Text>
        <Text style={styles.subtitle}>Ask a question, then tap the ball or button</Text>
      </View>

      {/* Ball Section */}
      <View style={styles.ballSection}>
        <Pressable
          onPress={askMagicBall}
          style={({ pressed }) => [
            styles.ballWrapper,
            pressed && styles.ballPressed,
          ]}
        >
          <Image
            source={require('./assets/images/magic_8_ball.png')}
            style={styles.ballImage}
            resizeMode="contain"
          />

          {/* Center Text Window */}
          <View style={styles.windowOverlay}>
            <Text style={styles.centerNumber}>8</Text>
          </View>
        </Pressable>

        {/* Answer Display Card */}
        <View style={styles.answerCard}>
          <Text style={styles.answerLabel}>THE ORACLE SAYS</Text>
          <Text style={styles.answerText}>“{answer}”</Text>
        </View>
      </View>

      {/* Action Section */}
      <View style={styles.actionSection}>
        <Pressable
          onPress={askMagicBall}
          style={({ pressed }) => [
            styles.askButton,
            pressed && styles.askButtonPressed,
          ]}
        >
          <Text style={styles.askButtonText}>SHAKE / ASK</Text>
        </Pressable>

        {shakeCount > 0 && (
          <Text style={styles.counterText}>Times asked: {shakeCount}</Text>
        )}

        {/* Student Info */}
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
    backgroundColor: '#090D16',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 36,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 20) + 16 : 36,
  },
  header: {
    alignItems: 'center',
  },
  badge: {
    color: '#818CF8',
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
    marginBottom: 4,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  ballSection: {
    alignItems: 'center',
    width: '100%',
  },
  ballWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ballPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  ballImage: {
    width: 220,
    height: 220,
  },
  windowOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  centerNumber: {
    color: '#E0F2FE',
    fontSize: 24,
    fontWeight: '900',
    opacity: 0.9,
  },
  answerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  answerLabel: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  answerText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    minHeight: 26,
  },
  actionSection: {
    alignItems: 'center',
    width: '100%',
  },
  askButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    paddingHorizontal: 44,
    borderRadius: 28,
    elevation: 6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 10,
  },
  askButtonPressed: {
    backgroundColor: '#4F46E5',
    transform: [{ scale: 0.96 }],
  },
  askButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  counterText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
  },
  studentInfo: {
    alignItems: 'center',
    marginTop: 4,
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
