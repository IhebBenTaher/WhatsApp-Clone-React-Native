import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { auth,database } from '../firebaseConfig'; // Keep Firebase auth import
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, getDatabase } from 'firebase/database';
import { launchImageLibrary } from 'react-native-image-picker';
import supabase from '../supabaseClient'; // Supabase client import

const AuthScreen = ({ 
  email, setEmail, password, setPassword, fullname, setFullname, pseudo, setPseudo, 
  phone, setPhone, isLogin, setIsLogin, handleAuthentication, profileImage, setProfileImage 
}) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {/* New Fields */}
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={setFullname}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.input}
            value={pseudo}
            onChangeText={setPseudo}
            placeholder="Pseudo"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

export default function AuthScreenComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null); 

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        // Sign in logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Retrieve user data from Firebase Realtime Database or Supabase
        const userDataSnapshot = await get(ref(database, `users/${user.uid}`));
        const userData = userDataSnapshot.val();
        console.log(userData)
        // Set user state to reflect retrieved data
        setUser({
          email: user.email,
          fullname: userData.fullname,
          pseudo: userData.pseudo,
          phone: userData.phone,
        });
  
        console.log('User signed in successfully!');
      } else {
        // Sign up logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Save user data to Realtime Database
        await set(ref(database, `users/${user.uid}`), {
          email: user.email,
          fullname: fullname,
          pseudo: pseudo,
          phone: phone,
          createdAt: new Date().toISOString(),
        });
  
        console.log('User signed up and data saved to database!');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <AuthScreen
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      fullname={fullname}
      setFullname={setFullname}
      pseudo={pseudo}
      setPseudo={setPseudo}
      phone={phone}
      setPhone={setPhone}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      handleAuthentication={handleAuthentication}
      profileImage={profileImage}
      setProfileImage={setProfileImage}
    />
  );
}

const styles = StyleSheet.create({
  authContainer: { padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, marginBottom: 16, padding: 8 },
  buttonContainer: { marginBottom: 16 },
  bottomContainer: { marginTop: 16 },
  toggleText: { color: '#3498db', textAlign: 'center' },
});
