export interface WaterEntry {
    id: string;
    amount: number; // in ml
    timestamp: number;
  }
  
  export interface DailyWaterData {
    date: string; // YYYY-MM-DD format
    entries: WaterEntry[];
    goal: number; // in ml
  }
  
  export interface WaterState {
    dailyData: Record<string, DailyWaterData>;
    currentGoal: number; // in ml
    cupSizes: number[]; // in ml
    reminderEnabled: boolean;
    reminderInterval: number; // in minutes
    streak: number;
    lastActive: string | null; // YYYY-MM-DD format
  }
  
  export interface WaterStore extends WaterState {
    addWater: (amount: number) => void;
    removeEntry: (entryId: string) => void;
    setGoal: (goal: number) => void;
    setCupSizes: (sizes: number[]) => void;
    setReminderEnabled: (enabled: boolean) => void;
    setReminderInterval: (interval: number) => void;
    resetToday: () => void;
  }