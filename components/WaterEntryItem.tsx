import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Droplet, Trash2 } from 'lucide-react-native';
import { WaterEntry } from '@/types/water';
import { formatTime } from '@/utils/date';
import Colors from '@/constants/colors';

interface WaterEntryItemProps {
  entry: WaterEntry;
  onDelete: (id: string) => void;
}

export default function WaterEntryItem({ entry, onDelete }: WaterEntryItemProps) {
  const time = formatTime(new Date(entry.timestamp));
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Droplet size={20} color={Colors.primary} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.amountText}>{entry.amount} ml</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => onDelete(entry.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Trash2 size={18} color={Colors.danger} />
      </TouchableOpacity>
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
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  timeText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
});