import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable, Button, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const DriverDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(getCurrentTime());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [proofDoc, setProofDoc] = useState(null);
  // Handle proof document upload
  const handlePickProof = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        setProofDoc(result);
      }
    } catch (e) {
      // handle error
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://10.22.160.39:3001/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      setOrders([]);
    }
    setLastUpdated(getCurrentTime());
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    fetchOrders();
  };

  // Calculate stats
  const totalPackages = orders.length;
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const delivered = orders.filter(o => o.status === 'DELIVERED').length;
  const failed = orders.filter(o => o.status === 'FAILED').length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Driver Dashboard</Text>
      <Text style={styles.subHeader}>Manage deliveries and track your route in real-time</Text>
      <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
      <View style={styles.statsRow}>
        <StatCard label="Total Packages" value={totalPackages} icon="📦" />
        <StatCard label="Pending" value={pending} icon="⏰" />
        <StatCard label="Delivered" value={delivered} icon="✅" />
        <StatCard label="Failed" value={failed} icon="❌" />
      </View>
      <View style={styles.routeBox}>
        <View style={styles.routeHeaderRow}>
          <Text style={styles.routeTitle}>Route RT-frrom30l</Text>
          <TouchableOpacity onPress={handleRefresh}><Text style={styles.refresh}>Refresh</Text></TouchableOpacity>
          <Text style={styles.assigned}>ASSIGNED</Text>
        </View>
        <Text style={styles.routeDesc}>Optimized delivery route with {totalPackages} stops</Text>
        <View style={styles.tabRow}>
          <Text style={[styles.tab, styles.tabActive]}>Delivery Manifest</Text>
          <Text style={styles.tab}>Route Map</Text>
          <Text style={styles.tab}>Delivery History</Text>
        </View>
        <View style={styles.manifestBox}>
          <Text style={styles.manifestTitle}>Delivery Manifest</Text>
          <Text style={styles.manifestDesc}>{loading ? 'Loading...' : (orders.length === 0 ? 'No Order found' : `${orders.length} Orders`)}</Text>
        </View>
        <Text style={styles.pendingTitle}>Pending Deliveries</Text>
        {orders.filter(o => o.status === 'PENDING').map(order => (
          <TouchableOpacity key={order.id} onPress={() => { setSelectedOrder(order); setModalVisible(true); }}>
            <View style={styles.deliveryCard}>
              <Text style={styles.packageId}>Order ID: {order.id}</Text>
              <Text style={styles.packageAddress}>{order.address ? `${order.address.line1}, ${order.address.city}` : ''}</Text>
              {Array.isArray(order.cart) && order.cart.length > 0 ? (
                order.cart.map((item, idx) => (
                  <View key={item.id || idx} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <Text style={styles.packageIcon}>📦</Text>
                    <View style={styles.deliveryInfo}>
                      <Text style={styles.packageName}>{item.name}</Text>
                      <Text style={styles.packageId}>Item ID: {item.id}</Text>
                      <Text style={styles.packageAddress}>Price: {item.price} | Qty: {item.quantity}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.packageName}>No items in cart</Text>
              )}
              <View style={styles.actionButtonsBox}>
                <TouchableOpacity style={styles.deliverBtn}><Text style={styles.btnText}>✔ Deliver</Text></TouchableOpacity>
                <TouchableOpacity style={styles.failBtn}><Text style={styles.btnText}>✖ Fail</Text></TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      {/* Modal for order details and proof upload */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details</Text>
            {selectedOrder && (
              <>
                <Text style={styles.modalLabel}>Order ID: <Text style={styles.modalValue}>{selectedOrder.id}</Text></Text>
                <Text style={styles.modalLabel}>Status: <Text style={styles.modalValue}>{selectedOrder.status}</Text></Text>
                <Text style={styles.modalLabel}>Address: <Text style={styles.modalValue}>{selectedOrder.address ? `${selectedOrder.address.line1}, ${selectedOrder.address.city}, ${selectedOrder.address.postcode}` : ''}</Text></Text>
                <Text style={styles.modalLabel}>Created At: <Text style={styles.modalValue}>{selectedOrder.createdAt ? (typeof selectedOrder.createdAt === 'string' ? selectedOrder.createdAt : selectedOrder.createdAt.toDate?.().toString()) : ''}</Text></Text>
                <Text style={[styles.modalLabel, { marginTop: 8 }]}>Items:</Text>
                {Array.isArray(selectedOrder.cart) && selectedOrder.cart.length > 0 ? (
                  selectedOrder.cart.map((item, idx) => (
                    <Text key={item.id || idx} style={styles.modalItem}>- {item.name} (Qty: {item.quantity}, Price: {item.price})</Text>
                  ))
                ) : (
                  <Text style={styles.modalItem}>No items in cart</Text>
                )}
                <Text style={styles.modalLabel}>Total Cost: <Text style={styles.modalValue}>{selectedOrder.totalCost}</Text></Text>
                <Text style={styles.modalLabel}>Delivery Cost: <Text style={styles.modalValue}>{selectedOrder.deliveryCost}</Text></Text>
                <Text style={styles.modalLabel}>Priority: <Text style={styles.modalValue}>{selectedOrder.priority ? 'Yes' : 'No'}</Text></Text>
                <Text style={styles.modalLabel}>Priority Cost: <Text style={styles.modalValue}>{selectedOrder.priorityCost}</Text></Text>
                {/* Proof document upload */}
                <View style={styles.proofSection}>
                  <Text style={styles.modalLabel}>Proof Document:</Text>
                  {proofDoc ? (
                    <Text style={{ color: 'green', marginBottom: 4 }}>Selected: {proofDoc.name || proofDoc.uri}</Text>
                  ) : (
                    <Text style={{ color: '#888', marginBottom: 4 }}>No document selected</Text>
                  )}
                  <Button title="Upload Proof" onPress={handlePickProof} />
                </View>
              </>
            )}
            <Pressable style={styles.modalCloseBtn} onPress={() => { setModalVisible(false); setProofDoc(null); }}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#a020f0',
    textAlign: 'center',
  },
  modalLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
    color: '#333',
  },
  modalValue: {
    fontWeight: 'normal',
    color: '#444',
  },
  modalItem: {
    marginLeft: 16,
    fontSize: 14,
    color: '#555',
  },
  proofSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  modalCloseBtn: {
    marginTop: 18,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: '#a020f0',
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
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
