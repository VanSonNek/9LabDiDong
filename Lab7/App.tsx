import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar as RNStatusBar,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { STORIES, StoryNode } from './data/stories';

export default function App() {
  const [currentId, setCurrentId] = useState<number>(1);
  const [historySteps, setHistorySteps] = useState<number>(1);

  const currentNode: StoryNode = STORIES[currentId] || STORIES[1];

  const handleChoice = (nextId: number) => {
    setCurrentId(nextId);
    setHistorySteps((prev) => prev + 1);
  };

  const restartStory = () => {
    setCurrentId(1);
    setHistorySteps(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>LAB 7</Text>
        <Text style={styles.title}>DESTINI</Text>
        <Text style={styles.studentName}>Hồ Văn Sơn • Lập trình đa nền tảng</Text>
      </View>

      {/* Story Chapter Indicator */}
      <View style={styles.chapterBar}>
        <View style={styles.chapterTag}>
          <Text style={styles.chapterTagText}>
            {currentNode.isEnding ? 'KẾT THÚC' : `CHƯƠNG ${historySteps}`}
          </Text>
        </View>
        <Text style={styles.nodeTitle}>{currentNode.title}</Text>
      </View>

      {/* Main Story Card */}
      <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardContent}
        >
          {currentNode.isEnding && (
            <View style={styles.endingHeader}>
              <Text style={styles.endingEmoji}>{currentNode.endingEmoji || '✨'}</Text>
              <Text style={styles.theEndTitle}>THE END</Text>
              <Text style={styles.endingSubtitle}>
                {currentNode.endingTitle}
              </Text>
            </View>
          )}

          <Text style={styles.storyText}>{currentNode.text}</Text>
        </ScrollView>
      </View>

      {/* Action / Choices Section */}
      <View style={styles.actionSection}>
        {!currentNode.isEnding ? (
          <>
            {/* Choice 1 */}
            {currentNode.choice1 && (
              <Pressable
                onPress={() => handleChoice(currentNode.choice1!.nextId)}
                style={({ pressed }) => [
                  styles.choiceButton,
                  styles.choice1Button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.choiceNumber}>LỰA CHỌN 1</Text>
                <Text style={styles.choiceText}>{currentNode.choice1.text}</Text>
              </Pressable>
            )}

            {/* Choice 2 */}
            {currentNode.choice2 && (
              <Pressable
                onPress={() => handleChoice(currentNode.choice2!.nextId)}
                style={({ pressed }) => [
                  styles.choiceButton,
                  styles.choice2Button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.choiceNumber}>LỰA CHỌN 2</Text>
                <Text style={styles.choiceText}>{currentNode.choice2.text}</Text>
              </Pressable>
            )}
          </>
        ) : (
          /* Restart Button for Ending Screen */
          <Pressable
            onPress={restartStory}
            style={({ pressed }) => [
              styles.restartButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.restartButtonText}>🔄 RESTART STORY</Text>
          </Pressable>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Interactive Branching Story</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 20) + 12 : 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 4,
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
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2.5,
  },
  studentName: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  chapterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 10,
  },
  chapterTag: {
    backgroundColor: '#1E293B',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  chapterTagText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  nodeTitle: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  endingHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  endingEmoji: {
    fontSize: 48,
    marginBottom: 6,
  },
  theEndTitle: {
    color: '#F59E0B',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 4,
  },
  endingSubtitle: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  storyText: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'justify',
  },
  actionSection: {
    gap: 12,
    marginVertical: 10,
  },
  choiceButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  choice1Button: {
    backgroundColor: '#E11D48', // Crimson rose
  },
  choice2Button: {
    backgroundColor: '#0284C7', // Sky ocean
  },
  choiceNumber: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  choiceText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  restartButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  footer: {
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
