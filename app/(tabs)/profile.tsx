import {
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '@/lib/appwrite';
import { router } from 'expo-router';
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import useFetchData from '@/hooks/useFetchData';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import VideoCard from '@/components/VideoCard';
import { images } from '@/constants';
import InfoBox from '@/components/InfoBox';

export default function Profile() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, refresh } = useFetchData(getAllPosts);

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
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-items-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                className="size-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="size-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              subtitle=""
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={(posts?.length || 0).toString()}
                subtitle="Posts"
                containerStyles="mr-5"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                containerStyles=""
                titleStyles="text-xl"
              />
            </View>
          </View>

          // <View className="my-6 px-4 space-y-6">
          //   <View className="flex-row justify-between items-start mb-6">
          //     <View>
          //       <Text className="text-sm text-gray-100 font-pmedium">
          //         Welcome Back
          //       </Text>
          //       <Text className="text-2xl font-psemibold text-white">
          //         {user?.username}
          //       </Text>
          //     </View>
          //     <View className="mt-1.5">
          //       <Image
          //         source={images.logoSmall}
          //         className="w-8 h-10"
          //         resizeMode="contain"
          //       />
          //     </View>
          //   </View>

          //   <View className="w-full flex-1 pt-5 pb-5">
          //     <Text className="text-gray-100 text-lg font-pregular mb-3">
          //       Latest Videos
          //     </Text>
          //   </View>
          // </View>
        )}
      />
    </SafeAreaView>
  );
}
