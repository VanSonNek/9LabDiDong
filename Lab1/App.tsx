import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.appBadge}>LAB 1</Text>
          <Text style={styles.title}>I Am Rich</Text>
        </View>

        {/* Diamond Centerpiece */}
        <View style={styles.imageContainer}>
          <View style={styles.glowCircle} />
          <Image
            source={require('./assets/images/diamond.png')}
            style={styles.diamondImage}
            resizeMode="contain"
          />
        </View>

        {/* Student Info Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.studentName}>Hồ Văn Sơn</Text>
          <Text style={styles.subtitle}>Student Project</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#070D1E',
  },
  container: {
    flex: 1,
    backgroundColor: '#070D1E',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  appBadge: {
    color: '#00B4D8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: 260,
  },
  glowCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#0077B6',
    opacity: 0.15,
  },
  diamondImage: {
    width: 260,
    height: 190,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  studentName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subtitle: {
    color: '#8E9AAF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
