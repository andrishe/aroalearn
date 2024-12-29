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

import SearchInput from '@/components/SearchInput';

import EmptyState from '@/components/EmptyState';
import useFetchData from '@/hooks/useFetchData';
import { searchPosts } from '@/lib/appwrite';
import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

export default function Search() {
  const { query } = useLocalSearchParams();
  const { data: posts, refresh } = useFetchData(() =>
    searchPosts(query as string)
  );

  useEffect(() => {
    refresh();
  }, [query]);

  console.log('Query:', query);
  console.log('searchPosts:', searchPosts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="text-sm text-gray-100 font-pmedium">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput
                value=""
                placeholder="Search for a video topic"
                onChangeText={() => {}}
                otherStyles=""
                initialQuery={query}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for the search query"
          />
        )}
      />
    </SafeAreaView>
  );
}
