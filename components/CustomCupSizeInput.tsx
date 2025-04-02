import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CustomCupSizeInputProps {
  cupSizes: number[];
  onChange: (sizes: number[]) => void;
}

export default function CustomCupSizeInput({ cupSizes, onChange }: CustomCupSizeInputProps) {
  const [newSize, setNewSize] = useState('');
  
  const handleAddSize = () => {
    const size = parseInt(newSize, 10);
    if (isNaN(size) || size <= 0 || size > 2000) return;
    
    const updatedSizes = [...cupSizes, size].sort((a, b) => a - b);
    onChange(updatedSizes);
    setNewSize('');
  };
  
  const handleRemoveSize = (index: number) => {
    const updatedSizes = cupSizes.filter((_, i) => i !== index);
    onChange(updatedSizes);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Custom Cup Sizes</Text>
      
      <View style={styles.sizesContainer}>
        {cupSizes.map((size, index) => (
          <View key={index} style={styles.sizeTag}>
            <Text style={styles.sizeText}>{size} ml</Text>
            <TouchableOpacity
              onPress={() => handleRemoveSize(index)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={16} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add cup size (ml)"
          value={newSize}
          onChangeText={setNewSize}
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddSize}
          disabled={!newSize}
        >
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
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
    marginBottom: 12,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  sizeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  sizeText: {
    fontSize: 14,
    color: Colors.text,
    marginRight: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
