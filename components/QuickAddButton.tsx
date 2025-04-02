import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Droplet } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface QuickAddButtonProps {
  amount: number;
  onPress: () => void;
}

export default function QuickAddButton({ amount, onPress }: QuickAddButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Droplet size={20} color={Colors.primary} />
      <Text style={styles.text}>{amount} ml</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    marginVertical: 8,
    minWidth: 80,
  },
  text: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});