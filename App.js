import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './app/navigation/AuthNavigation';
import { useEffect, useState } from 'react';
import { createDataBases, loadDummyData, selectData } from './app/database/DbHelper';
import AuthContext from './app/utils/context';

export default function App() {
  useEffect(() => {
    createDataBases();
    loadDummyData()
    //selectData()
  }, [])

  const [user, setUser] = useState(undefined);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
