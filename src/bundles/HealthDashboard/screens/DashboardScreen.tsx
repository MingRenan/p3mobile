import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

import HealthCard from "../components/HealthCard";
import SummaryItem from "../components/SummaryItem";
import {
  mockHealthData,
  healthGoals,
  healthMetrics,
  summaryItems,
} from "../utils/mockData";
import { HealthData } from "../types";

const screenWidth = Dimensions.get("window").width;

const DashboardScreen: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData>({
    steps: 0,
    sleep: 0,
    hydration: 0,
    heartRate: 0,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setHealthData(mockHealthData);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const calculateProgress = (
    metricId: keyof HealthData,
    value: number
  ): number | null => {
    switch (metricId) {
      case "steps":
        return Math.min((value / healthGoals.steps) * 100, 100);
      case "sleep":
        return Math.min((value / healthGoals.sleep) * 100, 100);
      case "hydration":
        return Math.min(value, 100);
      default:
        return null;
    }
  };

  const formatValue = (metricId: keyof HealthData, value: number): string => {
    return metricId === "steps" ? value.toLocaleString() : value.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Painel de Saúde</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString("pt-BR")}</Text>
        </View>

        {/* Cards em 2 colunas */}
        <View style={styles.cardGrid}>
          {healthMetrics.map((metric) => (
            <HealthCard
              key={metric.id}
              title={metric.title}
              value={formatValue(metric.id, healthData[metric.id])}
              unit={metric.unit}
              icon={metric.icon}
              color={metric.color}
              progress={
                metric.hasProgress
                  ? calculateProgress(metric.id, healthData[metric.id])
                  : null
              }
            />
          ))}
        </View>

        {/* Resumo do Dia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Dia</Text>
          <View style={styles.summaryGrid}>
            {summaryItems.map((item, index) => (
              <SummaryItem key={index} label={item.label} value={item.value} />
            ))}
          </View>
        </View>

        {/* Botão do Ministério */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL("https://www.saude.gov.br")}
        >
          <Text style={styles.linkText}>Ministério da Saúde</Text>
          <Text style={styles.linkSubtext}>Informações oficiais de saúde</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  section: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#111",
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  linkButton: {
    marginTop: 30,
    backgroundColor: "#e74c3c",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  linkSubtext: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
  },
});

export default DashboardScreen;
