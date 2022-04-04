import React from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import LoginBar from './app/components/LoginBar.js';
import NoteAdder from './app/components/NoteAdder.js';

const App = () => {

  const [initialising, setInitialising] = React.useState(true);
  const [user, setUser] = React.useState();

  GoogleSignin.configure(
    {webClientId: '149230322332-1govhomkv68rcl3ufpfiaavrec6uclu8.apps.googleusercontent.com',}
  );

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log(`auth state changed! user: ${user ? user.displayName : `null`}`);
    if (initialising) setInitialising(false);
  }

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    console.log('signin Button pressed');
    const { idToken } = await GoogleSignin.signIn();
    console.log(`signed in with token ${idToken}`);
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const logoutHandle = () => {
    console.log('logout button pressed');
    auth().signOut();
    console.log('Signed out');
  }


  if (initialising) { return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.inputStyle}>
          <Text style={styles.inputLabelStyle}>
            Please wait...
          </Text>
      </View>
    </SafeAreaView>
  ); }

  if(!user) { return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.inputStyle}>
          <Text style={styles.inputLabelStyle}>
            Please Login
          </Text>
          <GoogleSigninButton
            style={{ width: 350, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleButtonPress}
          />
      </View>
    </SafeAreaView>
  ); }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <LoginBar
        logoutHandle={logoutHandle}
        name={user.displayName || null}
      />
      <View style={styles.inputStyle}>
          <NoteAdder
            uid={user.uid}
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
  inputStyle: {
    paddingTop: 150,
  },
});

export default App;
