import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayGround from './Screens/PlayGround';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ForgotPassword from './Screens/ForgotPassword';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SignUp from './Screens/SignUp';
import TooManyAttempts from './Screens/TooManyAttempts';

const Stack = createNativeStackNavigator();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function oniAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, oniAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user
          ?
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
          </>
          :
          <>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          </>
        }
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='TooManyAttempts' component={TooManyAttempts} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );


  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Keep the splash screen visible while we fetch resources
  //       await SplashScreen.preventAutoHideAsync();
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       onAuthStateChanged(auth, user => {
  //         if (user) {
  //           navigation.replace('Home')
  //         }

  //       })
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);


  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  return (
    // <SafeAreaView
    //   style={styles.container}
    //   onLayout={onLayoutRootView}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    // <StatusBar style="auto" />
    // </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});