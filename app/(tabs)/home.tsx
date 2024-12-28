import {
  Image,
  Text,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons, images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import useFetchData from '@/hooks/useFetchData';
import { getAllPosts } from '@/lib/appwrite';

export default function HomeScreen() {
  const { user } = useGlobalContext();
  const { data: posts, refresh } = useFetchData(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };
  console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-8 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              value=""
              placeholder="Search for a video topic"
              onChangeText={() => {}}
              otherStyles=""
            />

            <View className="w-full flex-1 pt-5 pb-5">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={[]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
