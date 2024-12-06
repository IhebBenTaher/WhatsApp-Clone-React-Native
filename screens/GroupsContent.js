// GroupsContent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupsContent = () => (
  <View style={styles.content}>
    <Text style={styles.welcomeText}>Groups</Text>
    <Text>Group 1</Text>
    <Text>Group 2</Text>
    <Text>Group 3</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    marginTop: 80, // Adjust content margin to prevent overlap with navbar
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GroupsContent;
