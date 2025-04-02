import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '@/constants/colors';
import { MAX_DAILY_GOAL, MIN_DAILY_GOAL } from '@/constants/config';

interface DailyGoalSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function DailyGoalSlider({ value, onChange }: DailyGoalSliderProps) {
  const [localValue, setLocalValue] = useState(value);
  
  const handleValueChange = (newValue: number) => {
    // Round to nearest 50ml
    const rounded = Math.round(newValue / 50) * 50;
    setLocalValue(rounded);
  };
  
  const handleComplete = () => {
    onChange(localValue);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Daily Goal</Text>
      <Text style={styles.value}>{localValue} ml</Text>
      
      <Slider
        style={styles.slider}
        minimumValue={MIN_DAILY_GOAL}
        maximumValue={MAX_DAILY_GOAL}
        step={50}
        value={value}
        onValueChange={handleValueChange}
        onSlidingComplete={handleComplete}
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.border}
        thumbTintColor={Colors.primary}
      />
      
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>{MIN_DAILY_GOAL} ml</Text>
        <Text style={styles.rangeText}>{MAX_DAILY_GOAL} ml</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  rangeText: {
    fontSize: 12,
    color: Colors.textLight,
  },
});