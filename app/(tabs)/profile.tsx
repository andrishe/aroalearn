import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '@/lib/appwrite';
import { router } from 'expo-router';
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function Profile() {
  const { user } = useGlobalContext();
  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'You have been logged out');
      router.replace('/(auth)/sign-in');
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Lout out failed');
    }
  };
  return (
    <SafeAreaView>
      <Pressable onPress={handleLogout}>
        <Image source={icons.logout} className="size-6" resizeMode="contain" />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24 }}>Profile</Text>
        <Text style={{ fontSize: 24, color: '#808080' }}>🚀</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
