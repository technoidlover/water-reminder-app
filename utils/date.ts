export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };
  
  export const getTodayDate = (): string => {
    return formatDate(new Date());
  };
  
  export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  export const isConsecutiveDay = (lastDate: string, currentDate: string): boolean => {
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    
    // Set hours to 0 to compare just the dates
    last.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    
    // Calculate the difference in days
    const diffTime = current.getTime() - last.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays === 1;
  };