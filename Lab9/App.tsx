import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { fetchCityWeather, WeatherData } from './services/weather';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (cityName: string) => {
    Keyboard.dismiss();
    const query = cityName.trim();
    if (!query) {
      setError('Vui lòng nhập tên thành phố cần tìm.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCityWeather(query);
      setWeather(data);
      setSearchText('');
    } catch (err: any) {
      setError(err?.message || 'Không thể tải dữ liệu thời tiết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Tải mặc định thời tiết Đà Nẵng khi mở app lần đầu
    loadWeather('Da Nang');
  }, []);

  const quickCities = ['Da Nang', 'Hanoi', 'Ho Chi Minh City'];

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appTitle}>CLIMA</Text>
            <View style={styles.authorBadge}>
              <Text style={styles.authorBadgeText}>
                Hồ Văn Sơn • Lập trình đa nền tảng
              </Text>
            </View>
          </View>

          {/* Search Box */}
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search city..."
                placeholderTextColor="#94A3B8"
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  if (error) setError(null);
                }}
                onSubmitEditing={() => loadWeather(searchText)}
                returnKeyType="search"
                autoCapitalize="words"
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchText('')}
                  style={styles.clearBtn}
                >
                  <Text style={styles.clearBtnText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => loadWeather(searchText)}
              activeOpacity={0.8}
            >
              <Text style={styles.searchBtnText}>SEARCH</Text>
            </TouchableOpacity>
          </View>

          {/* Quick city suggestions */}
          <View style={styles.quickCitiesRow}>
            {quickCities.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.quickChip}
                onPress={() => loadWeather(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.quickChipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorCard}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#38BDF8" />
              <Text style={styles.loadingText}>Đang tải dữ liệu thời tiết...</Text>
            </View>
          )}

          {/* Weather Result Display */}
          {!loading && weather && (
            <View style={styles.weatherCard}>
              {/* City & Country */}
              <View style={styles.locationHeader}>
                <Text style={styles.cityText}>{weather.cityName}</Text>
                {weather.country ? (
                  <Text style={styles.countryText}>{weather.country}</Text>
                ) : null}
              </View>

              {/* Weather Icon & Big Temp */}
              <View style={styles.mainWeatherRow}>
                <Text style={styles.weatherIcon}>{weather.icon}</Text>
                <View style={styles.tempContainer}>
                  <Text style={styles.tempText}>
                    {Math.round(weather.temperature)}
                  </Text>
                  <Text style={styles.degreeUnit}>°C</Text>
                </View>
              </View>

              {/* Description */}
              <View style={styles.descBadge}>
                <Text style={styles.descText}>{weather.description}</Text>
              </View>

              {/* Detail Metrics */}
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>CẢM GIÁC NHƯ</Text>
                  <Text style={styles.metricValue}>
                    {weather.apparentTemperature}°C
                  </Text>
                </View>

                <View style={styles.metricDivider} />

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>ĐỘ ẨM</Text>
                  <Text style={styles.metricValue}>{weather.humidity}%</Text>
                </View>

                <View style={styles.metricDivider} />

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>TỐC ĐỘ GIÓ</Text>
                  <Text style={styles.metricValue}>{weather.windSpeed} km/h</Text>
                </View>
              </View>

              {/* Refresh Action */}
              <TouchableOpacity
                style={styles.refreshBtn}
                onPress={() => loadWeather(weather.cityName)}
                activeOpacity={0.7}
              >
                <Text style={styles.refreshBtnText}>🔄 Cập nhật lại</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              LAB 9 • CLIMA WEATHER APP • REACT NATIVE & EXPO
            </Text>
            <Text style={styles.footerAuthor}>
              Sinh viên thực hiện: Hồ Văn Sơn
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 12,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#38BDF8',
    letterSpacing: 2,
  },
  authorBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  authorBadgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
    paddingVertical: 12,
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchBtn: {
    backgroundColor: '#0284C7',
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  quickCitiesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  quickChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#EF4444',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
  weatherCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  locationHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  cityText: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  countryText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  mainWeatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    gap: 12,
  },
  weatherIcon: {
    fontSize: 60,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tempText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '900',
    lineHeight: 70,
  },
  degreeUnit: {
    color: '#38BDF8',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 4,
  },
  descBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 18,
  },
  descText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
  metricsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#334155',
  },
  metricLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  refreshBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#334155',
  },
  refreshBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footerAuthor: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
});
