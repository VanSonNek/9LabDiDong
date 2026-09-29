import React from 'react';
import { StyleSheet, Text, View, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('./assets/images/avatar.png')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>Hồ Văn Sơn</Text>
        <Text style={styles.role}>IT STUDENT</Text>
        <View style={styles.divider} />
      </View>

      {/* Contact Cards Section */}
      <View style={styles.cardsSection}>
        {/* Phone Card */}
        <View style={styles.card}>
          <Image
            source={require('./assets/images/phone.png')}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>0123 456 789</Text>
        </View>

        {/* Email Card */}
        <View style={styles.card}>
          <Image
            source={require('./assets/images/email.png')}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>hovanson@example.com</Text>
        </View>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>LAB 2 • MICARD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep modern slate navy
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 20 : 0,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#38BDF8',
    backgroundColor: '#1E293B',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
    textAlign: 'center',
  },
  role: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  divider: {
    width: 150,
    height: 2,
    backgroundColor: '#334155',
    marginTop: 18,
    borderRadius: 1,
  },
  cardsSection: {
    width: '100%',
    maxWidth: 340,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cardText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    marginTop: 36,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
