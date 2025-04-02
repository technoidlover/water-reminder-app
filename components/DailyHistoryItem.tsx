import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyWaterData } from '@/types/water';
import Colors from '@/constants/colors';

interface DailyHistoryItemProps {
  data: DailyWaterData;
}

export default function DailyHistoryItem({ data }: DailyHistoryItemProps) {
  const totalAmount = data.entries.reduce((sum, entry) => sum + entry.amount, 0);
  const percentage = Math.min(totalAmount / data.goal, 1) * 100;
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    weekday: 'short'
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${percentage}%` },
              percentage >= 100 ? styles.progressComplete : null,
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {totalAmount} / {data.goal} ml
        </Text>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator,
          percentage >= 100 ? styles.statusComplete : styles.statusIncomplete
        ]}>
          <Text style={styles.statusText}>
            {percentage >= 100 ? '✓' : `${Math.round(percentage)}%`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  dateContainer: {
    width: 80,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressComplete: {
    backgroundColor: Colors.success,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  statusContainer: {
    width: 40,
    alignItems: 'center',
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusComplete: {
    backgroundColor: Colors.success,
  },
  statusIncomplete: {
    backgroundColor: Colors.primaryLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.background,
  },
});