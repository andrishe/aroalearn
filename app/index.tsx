import { View, Text, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text> HomeScreen</Text>
      <Button title="Go to Home" onPress={() => router.push('/(tabs)/home')} />
    </SafeAreaView>
  );
};

export default HomeScreen;
