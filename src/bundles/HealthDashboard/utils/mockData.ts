import { HealthData, HealthGoals, HealthMetric, SummaryItem } from "../types";

export const mockHealthData: HealthData = {
  steps: 8427,
  sleep: 7.5,
  hydration: 85,
  heartRate: 72,
};

export const healthGoals: HealthGoals = {
  steps: 10000,
  sleep: 8,
  hydration: 100,
  heartRateMin: 60,
  heartRateMax: 100,
};

export const healthMetrics: HealthMetric[] = [
  {
    id: "steps",
    title: "Passos",
    icon: "footsteps",
    color: "#4CAF50",
    unit: "",
    hasProgress: true,
  },
  {
    id: "sleep",
    title: "Horas de Sono",
    icon: "moon",
    color: "#2196F3",
    unit: "h",
    hasProgress: true,
  },
  {
    id: "hydration",
    title: "Hidratação",
    icon: "water",
    color: "#00BCD4",
    unit: "%",
    hasProgress: true,
  },
  {
    id: "heartRate",
    title: "Frequência Cardíaca",
    icon: "heart",
    color: "#F44336",
    unit: " bpm",
    hasProgress: false,
  },
];

export const summaryItems: SummaryItem[] = [
  { label: "Meta de Passos", value: "10.000" },
  { label: "Meta de Sono", value: "8h" },
  { label: "Meta de Água", value: "2L" },
  { label: "Freq. Normal", value: "60-100" },
];
