import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface StreakIndicatorProps {
  streak: number;
}

export default function StreakIndicator({ streak }: StreakIndicatorProps) {
  if (streak <= 0) return null;
  
  return (
    <View style={styles.container}>
      <Flame size={20} color="#FF9500" />
      <Text style={styles.text}>{streak} day streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9500',
  },
});