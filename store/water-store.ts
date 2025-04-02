import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WaterStore } from '@/types/water';
import { getTodayDate, isConsecutiveDay } from '@/utils/date';
import { DEFAULT_DAILY_GOAL, DEFAULT_CUP_SIZES, REMINDER_INTERVALS } from '@/constants/config';
import { scheduleWaterReminder, cancelWaterReminders } from '@/utils/notifications';

const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      dailyData: {},
      currentGoal: DEFAULT_DAILY_GOAL,
      cupSizes: DEFAULT_CUP_SIZES,
      reminderEnabled: false,
      reminderInterval: REMINDER_INTERVALS[1], // Default to 60 minutes
      streak: 0,
      lastActive: null,
      
      addWater: (amount) => {
        const today = getTodayDate();
        const { dailyData, currentGoal, lastActive, streak } = get();
        
        // Create today's entry if it doesn't exist
        const todayData = dailyData[today] || {
          date: today,
          entries: [],
          goal: currentGoal,
        };
        
        // Add new entry
        const newEntry = {
          id: Date.now().toString(),
          amount,
          timestamp: Date.now(),
        };
        
        // Update streak logic
        let newStreak = streak;
        if (lastActive) {
          if (today === lastActive) {
            // Same day, streak unchanged
          } else if (isConsecutiveDay(lastActive, today)) {
            // Consecutive day, increment streak
            newStreak += 1;
          } else {
            // Non-consecutive day, reset streak
            newStreak = 1;
          }
        } else {
          // First time using the app
          newStreak = 1;
        }
        
        set({
          dailyData: {
            ...dailyData,
            [today]: {
              ...todayData,
              entries: [...todayData.entries, newEntry],
            },
          },
          lastActive: today,
          streak: newStreak,
        });
      },
      
      removeEntry: (entryId) => {
        const today = getTodayDate();
        const { dailyData } = get();
        
        if (!dailyData[today]) return;
        
        set({
          dailyData: {
            ...dailyData,
            [today]: {
              ...dailyData[today],
              entries: dailyData[today].entries.filter(entry => entry.id !== entryId),
            },
          },
        });
      },
      
      setGoal: (goal) => {
        const today = getTodayDate();
        const { dailyData } = get();
        
        // Update today's goal if it exists
        if (dailyData[today]) {
          set({
            dailyData: {
              ...dailyData,
              [today]: {
                ...dailyData[today],
                goal,
              },
            },
            currentGoal: goal,
          });
        } else {
          set({ currentGoal: goal });
        }
      },
      
      setCupSizes: (sizes) => {
        set({ cupSizes: sizes });
      },
      
      setReminderEnabled: async (enabled) => {
        const { reminderInterval } = get();
        
        if (enabled) {
          await scheduleWaterReminder(reminderInterval);
        } else {
          await cancelWaterReminders();
        }
        
        set({ reminderEnabled: enabled });
      },
      
      setReminderInterval: async (interval) => {
        const { reminderEnabled } = get();
        
        set({ reminderInterval: interval });
        
        if (reminderEnabled) {
          await scheduleWaterReminder(interval);
        }
      },
      
      resetToday: () => {
        const today = getTodayDate();
        const { dailyData } = get();
        
        if (!dailyData[today]) return;
        
        const newDailyData = { ...dailyData };
        delete newDailyData[today];
        
        set({ dailyData: newDailyData });
      },
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useWaterStore;