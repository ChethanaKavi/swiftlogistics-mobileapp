import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const DriverDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(getCurrentTime());

  const handleRefresh = () => {
    setLastUpdated(getCurrentTime());
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Driver Dashboard</Text>
      <Text style={styles.subHeader}>Manage deliveries and track your route in real-time</Text>
      <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
      <View style={styles.statsRow}>
        <StatCard label="Total Packages" value="1" icon="📦" />
        <StatCard label="Pending" value="1" icon="⏰" />
        <StatCard label="Delivered" value="0" icon="✅" />
        <StatCard label="Failed" value="0" icon="❌" />
      </View>
      <View style={styles.routeBox}>
        <View style={styles.routeHeaderRow}>
          <Text style={styles.routeTitle}>Route RT-frrom30l</Text>
          <TouchableOpacity onPress={handleRefresh}><Text style={styles.refresh}>Refresh</Text></TouchableOpacity>
          <Text style={styles.assigned}>ASSIGNED</Text>
        </View>
        <Text style={styles.routeDesc}>Optimized delivery route with 1 stops</Text>
        <View style={styles.tabRow}>
          <Text style={[styles.tab, styles.tabActive]}>Delivery Manifest</Text>
          <Text style={styles.tab}>Route Map</Text>
          <Text style={styles.tab}>Delivery History</Text>
        </View>
        <View style={styles.manifestBox}>
          <Text style={styles.manifestTitle}>Delivery Manifest</Text>
          <Text style={styles.manifestDesc}>No Order found</Text>
          {/* <Text style={styles.pendingCount}>1 Pending</Text> */}
        </View>
        <Text style={styles.pendingTitle}>Pending Deliveries</Text>
        <View style={styles.deliveryCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.packageIcon}>📦</Text>
            <View style={styles.deliveryInfo}>
              <Text style={styles.packageName}>Laptop Sleeve</Text>
              <Text style={styles.packageId}>ID: PKG-xmuewOar</Text>
              <Text style={styles.packageAddress}>No, 34, Kandy Road, Kany</Text>
              <Text style={styles.packageStatus}>⏳ WAITING</Text>
            </View>
          </View>
          <View style={styles.actionButtonsBox}>
            <TouchableOpacity style={styles.deliverBtn}><Text style={styles.btnText}>✔ Deliver</Text></TouchableOpacity>
            <TouchableOpacity style={styles.failBtn}><Text style={styles.btnText}>✖ Fail</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const StatCard = ({ label, value, icon }) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fb', padding: 16 },
  header: { fontSize: 26, fontWeight: 'bold', marginTop: 10 },
  subHeader: { fontSize: 15, color: '#555', marginBottom: 4 },
  lastUpdated: { fontSize: 12, color: '#888', marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  statCard: { flex: 1, alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 4, borderRadius: 10, padding: 12, elevation: 2 },
  statIcon: { fontSize: 28, marginBottom: 2 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 13, color: '#555' },
  routeBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, elevation: 2 },
  routeHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  routeTitle: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  refresh: { color: '#1976d2', marginHorizontal: 8 },
  assigned: { color: '#1976d2', fontWeight: 'bold', fontSize: 12 },
  routeDesc: { color: '#888', fontSize: 13, marginBottom: 8 },
  tabRow: { flexDirection: 'row', marginBottom: 10 },
  tab: { fontSize: 14, color: '#888', marginRight: 18, paddingBottom: 4 },
  tabActive: { color: '#1976d2', borderBottomWidth: 2, borderBottomColor: '#1976d2' },
  manifestBox: { backgroundColor: 'linear-gradient(90deg, #1976d2, #21a1ff)', borderRadius: 8, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  manifestTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, flex: 1 },
  manifestDesc: { color: '#040303ff', fontSize: 13, flex: 2 },
  pendingCount: { color: '#040303ff', fontWeight: 'bold', fontSize: 15, flex: 1, textAlign: 'right' },
  pendingTitle: { fontWeight: 'bold', fontSize: 15, marginBottom: 6 },
  deliveryCard: { backgroundColor: '#f5faff', borderRadius: 10, padding: 12, marginBottom: 10, elevation: 1, flexDirection: 'column', justifyContent: 'space-between' },
  packageIcon: { fontSize: 30, marginRight: 10 },
  deliveryInfo: { flex: 2 },
  packageName: { fontWeight: 'bold', fontSize: 15 },
  packageId: { color: '#888', fontSize: 12 },
  packageAddress: { color: '#555', fontSize: 13 },
  packageStatus: { color: '#1976d2', fontSize: 12, marginTop: 2 },
  actionButtonsBox: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  deliverBtn: { backgroundColor: '#2ecc40', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12, marginRight: 6 },
  failBtn: { backgroundColor: '#ff4136', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default DriverDashboard;
