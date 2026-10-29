
import { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import HistoryCard from "../../../src/components/historial/HistoryCard";
import HistoryFilters, {
  type HistoryCategory,
} from "../../../src/components/historial/HistoryFilters";
import { historyData } from "../../../src/data/historyData";

export default function HistorialScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<HistoryCategory>("all");

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "all") {
      return historyData;
    }

    return historyData.filter(
      (event) => event.category === selectedCategory
    );
  }, [selectedCategory]);

  const todayEvents = filteredEvents.filter(
    (event) => event.date === "Hoy"
  );

  const yesterdayEvents = filteredEvents.filter(
    (event) => event.date === "Ayer"
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.subtitle}>
          Revisá la actividad reciente de tus dispositivos.
        </Text>

        <HistoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay eventos para esta categoría.
            </Text>
          </View>
        ) : (
          <>
            {todayEvents.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hoy</Text>

                {todayEvents.map((event) => (
                  <HistoryCard key={event.id} {...event} />
                ))}
              </View>
            )}

            {yesterdayEvents.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ayer</Text>

                {yesterdayEvents.map((event) => (
                  <HistoryCard key={event.id} {...event} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFDF2",
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#242424",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#686868",
    marginBottom: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  emptyText: {
    color: "#686868",
    fontSize: 14,
    textAlign: "center",
  },
});
