import React, { useState } from 'react';
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
} from 'react-native';

type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

interface BMIResult {
  bmi: number;
  category: BMICategory;
  title: string;
  color: string;
  interpretation: string;
  range: string;
}

export default function App() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightText, setHeightText] = useState('175');
  const [weightText, setWeightText] = useState('70');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateBMI = () => {
    setErrorMessage(null);

    const height = parseFloat(heightText);
    const weight = parseFloat(weightText);

    if (isNaN(height) || isNaN(weight)) {
      setErrorMessage('Vui lòng nhập số hợp lệ cho chiều cao và cân nặng.');
      setResult(null);
      return;
    }

    if (height <= 0 || weight <= 0) {
      setErrorMessage('Chiều cao và cân nặng phải lớn hơn 0.');
      setResult(null);
      return;
    }

    if (height < 50 || height > 260) {
      setErrorMessage('Chiều cao phải từ 50 cm đến 260 cm.');
      setResult(null);
      return;
    }

    if (weight < 10 || weight > 350) {
      setErrorMessage('Cân nặng phải từ 10 kg đến 350 kg.');
      setResult(null);
      return;
    }

    const heightInMeters = height / 100;
    const bmiVal = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmiVal * 10) / 10;

    let category: BMICategory;
    let title: string;
    let color: string;
    let interpretation: string;
    let range: string;

    if (roundedBMI < 18.5) {
      category = 'underweight';
      title = 'THIẾU CÂN (UNDERWEIGHT)';
      color = '#38BDF8'; // Sky blue
      interpretation =
        'Chỉ số BMI của bạn thấp hơn mức bình thường. Bạn nên bổ sung dinh dưỡng hợp lý và tập luyện để tăng cân.';
      range = 'BMI < 18.5 kg/m²';
    } else if (roundedBMI < 25.0) {
      category = 'normal';
      title = 'BÌNH THƯỜNG (NORMAL)';
      color = '#22C55E'; // Green
      interpretation =
        'Tuyệt vời! Bạn có chỉ số cơ thể cân đối và khỏe mạnh. Hãy tiếp tục duy trì chế độ ăn và vận động này!';
      range = '18.5 - 24.9 kg/m²';
    } else if (roundedBMI < 30.0) {
      category = 'overweight';
      title = 'THỪA CÂN (OVERWEIGHT)';
      color = '#F59E0B'; // Amber
      interpretation =
        'Chỉ số BMI cao hơn mức bình thường. Bạn nên tăng cường vận động thể thao và giảm calo nạp vào.';
      range = '25.0 - 29.9 kg/m²';
    } else {
      category = 'obese';
      title = 'BÉO PHÌ (OBESE)';
      color = '#EF4444'; // Red
      interpretation =
        'Bạn đang trong nhóm béo phì. Cần điều chỉnh chế độ ăn uống khoa học và tham khảo ý kiến chuyên gia y tế.';
      range = 'BMI ≥ 30.0 kg/m²';
    }

    setResult({
      bmi: roundedBMI,
      category,
      title,
      color,
      interpretation,
      range,
    });
  };

  const adjustValue = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    currentVal: string,
    delta: number,
    min: number,
    max: number
  ) => {
    const num = parseFloat(currentVal);
    if (isNaN(num)) {
      setter(delta > 0 ? `${min}` : `${max}`);
      return;
    }
    const nextVal = Math.min(max, Math.max(min, Math.round(num + delta)));
    setter(`${nextVal}`);
    setErrorMessage(null);
  };

  const resetAll = () => {
    setHeightText('175');
    setWeightText('70');
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E21" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BMI CALCULATOR</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Hồ Văn Sơn • Lập trình đa nền tảng</Text>
            </View>
          </View>

          {/* Gender Selector */}
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderCard,
                gender === 'male' && styles.genderCardActive,
              ]}
              onPress={() => setGender('male')}
              activeOpacity={0.8}
            >
              <Text style={styles.genderIcon}>♂</Text>
              <Text
                style={[
                  styles.genderText,
                  gender === 'male' && styles.genderTextActive,
                ]}
              >
                NAM / MALE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderCard,
                gender === 'female' && styles.genderCardActive,
              ]}
              onPress={() => setGender('female')}
              activeOpacity={0.8}
            >
              <Text style={styles.genderIcon}>♀</Text>
              <Text
                style={[
                  styles.genderText,
                  gender === 'female' && styles.genderTextActive,
                ]}
              >
                NỮ / FEMALE
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Cards */}
          <View style={styles.inputsRow}>
            {/* Height Card */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>CHIỀU CAO (CM)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={heightText}
                  onChangeText={(val) => {
                    setHeightText(val);
                    setErrorMessage(null);
                  }}
                  keyboardType="numeric"
                  placeholder="175"
                  placeholderTextColor="#64748B"
                  maxLength={4}
                />
              </View>
              <View style={styles.stepperRow}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => adjustValue(setHeightText, heightText, -1, 50, 250)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepperText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => adjustValue(setHeightText, heightText, 1, 50, 250)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepperText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Weight Card */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>CÂN NẶNG (KG)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={weightText}
                  onChangeText={(val) => {
                    setWeightText(val);
                    setErrorMessage(null);
                  }}
                  keyboardType="numeric"
                  placeholder="70"
                  placeholderTextColor="#64748B"
                  maxLength={4}
                />
              </View>
              <View style={styles.stepperRow}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => adjustValue(setWeightText, weightText, -1, 10, 300)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepperText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => adjustValue(setWeightText, weightText, 1, 10, 300)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepperText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Error Message */}
          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Calculate Button */}
          <TouchableOpacity
            style={styles.calcButton}
            onPress={calculateBMI}
            activeOpacity={0.85}
          >
            <Text style={styles.calcButtonText}>TÍNH TOÁN BMI (CALCULATE)</Text>
          </TouchableOpacity>

          {/* Result Section */}
          {result && (
            <View style={styles.resultCard}>
              <Text style={[styles.resultCategory, { color: result.color }]}>
                {result.title}
              </Text>
              <Text style={styles.resultBMI}>{result.bmi.toFixed(1)}</Text>
              <View
                style={[
                  styles.resultBadge,
                  { backgroundColor: `${result.color}22`, borderColor: result.color },
                ]}
              >
                <Text style={[styles.resultRange, { color: result.color }]}>
                  Khoảng chuẩn: {result.range}
                </Text>
              </View>
              <Text style={styles.resultInterpretation}>
                {result.interpretation}
              </Text>

              <TouchableOpacity
                style={styles.resetBtn}
                onPress={resetAll}
                activeOpacity={0.8}
              >
                <Text style={styles.resetBtnText}>↺ ĐẶT LẠI / RESET</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Reference Scale */}
          <View style={styles.scaleContainer}>
            <Text style={styles.scaleHeader}>BẢNG TIÊU CHUẨN WHO</Text>
            <View style={styles.scaleRow}>
              <View style={[styles.scaleDot, { backgroundColor: '#38BDF8' }]} />
              <Text style={styles.scaleLabel}>Thiếu cân (&lt; 18.5)</Text>
              <Text style={styles.scaleStatus}>Gầy</Text>
            </View>
            <View style={styles.scaleRow}>
              <View style={[styles.scaleDot, { backgroundColor: '#22C55E' }]} />
              <Text style={styles.scaleLabel}>Bình thường (18.5 – 24.9)</Text>
              <Text style={styles.scaleStatus}>Lý tưởng</Text>
            </View>
            <View style={styles.scaleRow}>
              <View style={[styles.scaleDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.scaleLabel}>Thừa cân (25.0 – 29.9)</Text>
              <Text style={styles.scaleStatus}>Nguy cơ</Text>
            </View>
            <View style={styles.scaleRow}>
              <View style={[styles.scaleDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.scaleLabel}>Béo phì (≥ 30.0)</Text>
              <Text style={styles.scaleStatus}>Cảnh báo</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              LAB 8 • BMI CALCULATOR • REACT NATIVE & EXPO
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
    backgroundColor: '#0A0E21',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 12,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  badge: {
    backgroundColor: 'rgba(235, 21, 85, 0.15)',
    borderWidth: 1,
    borderColor: '#EB1555',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: 6,
  },
  badgeText: {
    color: '#EB1555',
    fontSize: 12,
    fontWeight: '600',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  genderCard: {
    flex: 1,
    backgroundColor: '#1D1E33',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderCardActive: {
    backgroundColor: '#1D1E33',
    borderColor: '#EB1555',
  },
  genderIcon: {
    fontSize: 34,
    color: '#8D8E98',
    marginBottom: 4,
  },
  genderText: {
    color: '#8D8E98',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  genderTextActive: {
    color: '#FFFFFF',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1D1E33',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  cardLabel: {
    color: '#8D8E98',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 4,
  },
  textInput: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    minWidth: 90,
    paddingVertical: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: '#2C2D4A',
  },
  stepperRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  stepperBtn: {
    backgroundColor: '#4C4F5E',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 24,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#EF4444',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  calcButton: {
    backgroundColor: '#EB1555',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#EB1555',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  calcButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  resultCard: {
    backgroundColor: '#1D1E33',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2C46',
  },
  resultCategory: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  resultBMI: {
    fontSize: 56,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 10,
  },
  resultRange: {
    fontSize: 12,
    fontWeight: '700',
  },
  resultInterpretation: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 16,
  },
  resetBtn: {
    backgroundColor: '#2A2C46',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetBtnText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  scaleContainer: {
    backgroundColor: '#14172C',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1D213F',
  },
  scaleHeader: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  scaleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  scaleLabel: {
    color: '#E2E8F0',
    fontSize: 13,
    flex: 1,
  },
  scaleStatus: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footerAuthor: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
});
