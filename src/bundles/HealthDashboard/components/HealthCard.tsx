import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HealthCardProps } from "../types";

const HealthCard: React.FC<HealthCardProps> = ({
  title,
  value,
  unit,
  icon,
  color,
  progress = null,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedValue, setLoadedValue] = useState<string | number>(0);
  const [loadedProgress, setLoadedProgress] = useState<number | null>(null);

  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedValue(value);
      setLoadedProgress(progress);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [value, progress]);

  const backgroundColor = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#f2f2f2' : '#222';
  const subTextColor = isDark ? '#a1a1a1' : '#555';
  const borderColor = isDark ? '#333' : '#e0e0e0';
  const shadowColor = isDark ? '#000' : '#aaa';

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor, borderLeftColor: color, shadowColor }]}>
        <View style={styles.cardHeader}>
          <Ionicons name={icon as any} size={26} color={color} />
          <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={color} />
          <Text style={[styles.loadingText, { color: subTextColor }]}>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor, borderLeftColor: color, shadowColor }]}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon as any} size={28} color={color} />
        <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardValue, { color }]}>{loadedValue}{unit}</Text>
        {loadedProgress !== null && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: borderColor }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: color,
                    width: `${loadedProgress}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: subTextColor }]}>
              {loadedProgress}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    borderLeftWidth: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  cardContent: {
    alignItems: "flex-start",
  },
  cardValue: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 14,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  progressBar: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 40,
    textAlign: "right",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default HealthCard;
