import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, useColorScheme } from "react-native";
import { SummaryItemProps } from "../types";

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedValue, setLoadedValue] = useState<string | number>("...");

  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedValue(value);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  const backgroundColor = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#f2f2f2' : '#222';
  const subTextColor = isDark ? '#a1a1a1' : '#555';
  const shadowColor = isDark ? '#000' : '#aaa';

  return (
    <View style={[styles.summaryItem, { backgroundColor, shadowColor }]}>
      <Text style={[styles.summaryLabel, { color: subTextColor }]}>{label}</Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={subTextColor} />
      ) : (
        <Text style={[styles.summaryValue, { color: textColor }]}>{loadedValue}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryItem: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flex: 1,
    minWidth: "42%",
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default SummaryItem;
