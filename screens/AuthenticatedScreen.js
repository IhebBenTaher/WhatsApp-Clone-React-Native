// AuthenticatedScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import { signOut } from 'firebase/auth';
import ProfileContent from './ProfileContent';
import ChatsContent from './ChatsContent';
import { ref, set, get, getDatabase } from 'firebase/database';
import GroupsContent from './GroupsContent';
import { auth, database } from './../firebaseConfig'; // Import firebase config

const AuthenticatedScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Profile'); // Default to Profile
  const [user, setUser] = useState(null); // Hold user data in state

  useEffect(() => {
    // Fetch user data from Firebase or Supabase on initial load
    const userData = auth.currentUser;
    if (userData) {
      const uid = userData.uid;
      // Fetch user data from Firebase Realtime Database or Supabase
      const fetchUserData = async () => {
        const snapshot = await get(ref(database, `users/${uid}`));
        const userData = snapshot.val();
        setUser({
          email: userData.email,
          fullname: userData.fullname,
          pseudo: userData.pseudo,
          phone: userData.phone,
        });
      };
      fetchUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out the user from Firebase Authentication
      setUser(null);  // Clear user data from state
    } catch (error) {
      console.error('Error signing out: ', error.message);  // Handle sign out errors
    }
  };

  const renderContent = () => {
    if (!user) return null; // Return nothing if user data is not loaded

    switch (selectedTab) {
      case 'Profile':
        return <ProfileContent user={user} />;
      case 'Chats':
        return <ChatsContent />;
      case 'Groups':
        return <GroupsContent />;
      case 'Logout':
        handleLogout();
        return null;
      default:
        return <ProfileContent user={user} />;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar setSelectedTab={setSelectedTab} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Adjust this if using a custom status bar or navbar height
  },
});

export default AuthenticatedScreen;
