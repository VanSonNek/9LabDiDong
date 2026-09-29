import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QUESTIONS } from './data/questions';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;

  const handleAnswer = (selectedAnswer: boolean) => {
    if (quizFinished) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    // Advance to next question or finish
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setQuizFinished(true);
      }
    }, 450);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setQuizFinished(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.badge}>LAB 6</Text>
        <Text style={styles.title}>QUIZZLER</Text>
        <Text style={styles.studentName}>Hồ Văn Sơn • Lập trình đa nền tảng</Text>
      </View>

      {!quizFinished ? (
        <>
          {/* Progress & Score Bar */}
          <View style={styles.statusBar}>
            <View style={styles.badgeContainer}>
              <Text style={styles.progressText}>
                Question {currentIndex + 1} / {totalQuestions}
              </Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
          </View>

          {/* Question Card */}
          <View style={styles.card}>
            <Text style={styles.questionText}>
              {currentQuestion.question}
            </Text>

            {/* Instant Feedback indicator */}
            {feedback && (
              <View
                style={[
                  styles.feedbackBadge,
                  feedback === 'correct'
                    ? styles.feedbackCorrect
                    : styles.feedbackWrong,
                ]}
              >
                <Text style={styles.feedbackText}>
                  {feedback === 'correct' ? '✓ CORRECT' : '✗ WRONG'}
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={() => handleAnswer(true)}
              style={({ pressed }) => [
                styles.answerButton,
                styles.trueButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>TRUE</Text>
            </Pressable>

            <Pressable
              onPress={() => handleAnswer(false)}
              style={({ pressed }) => [
                styles.answerButton,
                styles.falseButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>FALSE</Text>
            </Pressable>
          </View>
        </>
      ) : (
        /* Result Screen */
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>🏆</Text>
            <Text style={styles.resultTitle}>Quiz Completed!</Text>
            <Text style={styles.resultSubtitle}>
              You scored {score} out of {totalQuestions}
            </Text>
            <Text style={styles.resultPercentage}>
              {Math.round((score / totalQuestions) * 100)}%
            </Text>

            <Pressable
              onPress={restartQuiz}
              style={({ pressed }) => [
                styles.restartButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.restartButtonText}>RESTART QUIZ</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>True / False Mobile Quiz App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
    paddingVertical: 36,
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 20) + 16 : 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 2,
  },
  studentName: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeContainer: {
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  progressText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
  scoreContainer: {
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  scoreText: {
    color: '#F59E0B',
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    position: 'relative',
    marginVertical: 10,
  },
  questionText: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
  },
  feedbackBadge: {
    position: 'absolute',
    bottom: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  feedbackCorrect: {
    backgroundColor: '#10B981',
  },
  feedbackWrong: {
    backgroundColor: '#EF4444',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  buttonsContainer: {
    gap: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  answerButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  trueButton: {
    backgroundColor: '#10B981',
  },
  falseButton: {
    backgroundColor: '#EF4444',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  resultCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  resultSubtitle: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 12,
  },
  resultPercentage: {
    color: '#38BDF8',
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 24,
  },
  restartButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 24,
    elevation: 4,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
