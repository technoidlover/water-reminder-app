import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { REMINDER_INTERVALS } from '@/constants/config';

interface ReminderSettingsProps {
  enabled: boolean;
  interval: number;
  onToggle: (enabled: boolean) => void;
  onIntervalChange: (interval: number) => void;
}

export default function ReminderSettings({ 
  enabled, 
  interval, 
  onToggle, 
  onIntervalChange 
}: ReminderSettingsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Clock size={20} color={Colors.primary} />
          <Text style={styles.title}>Reminders</Text>
        </View>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: Colors.border, true: Colors.primaryLight }}
          thumbColor={enabled ? Colors.primary : '#f4f3f4'}
        />
      </View>
      
      {enabled && (
        <View style={styles.intervalContainer}>
          <Text style={styles.intervalLabel}>Remind me every:</Text>
          <View style={styles.intervalButtons}>
            {REMINDER_INTERVALS.map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={[
                  styles.intervalButton,
                  interval === minutes && styles.intervalButtonActive,
                ]}
                onPress={() => onIntervalChange(minutes)}
              >
                <Text
                  style={[
                    styles.intervalButtonText,
                    interval === minutes && styles.intervalButtonTextActive,
                  ]}
                >
                  {minutes < 60 
                    ? `${minutes}m` 
                    : `${minutes / 60}h${minutes % 60 ? `${minutes % 60}m` : ''}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: Colors.text,
  },
  intervalContainer: {
    marginTop: 16,
  },
  intervalLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  intervalButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  intervalButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  intervalButtonActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  intervalButtonText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  intervalButtonTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});