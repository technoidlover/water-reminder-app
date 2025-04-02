import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface WaterProgressProps {
  current: number;
  goal: number;
}

export default function WaterProgress({ current, goal }: WaterProgressProps) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const percentage = Math.min(current / goal, 1);
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);
  
  const height = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBackground, { height }]}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        
        <View style={styles.markersContainer}>
          {[0.25, 0.5, 0.75].map((mark) => (
            <View key={mark} style={[styles.marker, { bottom: `${mark * 100}%` }]} />
          ))}
        </View>
        
        <View style={styles.bubbleContainer}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.bubble,
                {
                  left: `${Math.random() * 80 + 10}%`,
                  bottom: `${Math.random() * 80}%`,
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  opacity: Math.random() * 0.5 + 0.2,
                  display: percentage > 0.1 ? 'flex' : 'none',
                },
              ]}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.currentText}>{current} ml</Text>
        <Text style={styles.goalText}>of {goal} ml</Text>
        <Text style={styles.percentageText}>
          {Math.round(percentage * 100)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 250,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  progressContainer: {
    flex: 1,
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    overflow: 'hidden',
    backgroundColor: 'rgba(240, 248, 255, 0.5)',
    position: 'relative',
  },
  progressBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  markersContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  marker: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  bubbleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
  },
  statsContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  currentText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  goalText: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
});