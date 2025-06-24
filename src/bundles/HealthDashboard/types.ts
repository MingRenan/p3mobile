// Tipos centralizados para o Bundle HealthDashboard

export interface HealthData {
  steps: number;
  sleep: number;
  hydration: number;
  heartRate: number;
}

export interface HealthGoals {
  steps: number;
  sleep: number;
  hydration: number;
  heartRateMin: number;
  heartRateMax: number;
}

export interface HealthMetric {
  id: keyof HealthData;
  title: string;
  icon: string;
  color: string;
  unit: string;
  hasProgress: boolean;
}

export interface SummaryItem {
  label: string;
  value: string;
}

export interface HealthCardProps {
  title: string;
  value: string;
  unit: string;
  icon: string;
  color: string;
  progress?: number | null;
}

export interface SummaryItemProps {
  label: string;
  value: string;
}
