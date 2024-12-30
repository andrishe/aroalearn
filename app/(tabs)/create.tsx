import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { VideoView } from 'expo-video';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';

import { router } from 'expo-router';
import { createVideo } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    video: { uri: string } | null;
    thumbnail: { uri: string } | null;
    prompt: string;
    userId?: string;
  }>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  interface PickerParams {
    selectType: 'video' | 'image';
  }

  const openPicker = async ({ selectType }: PickerParams) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    if (!user) {
      return Alert.alert('Error', 'User not found');
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert('Success', 'Video uploaded successfully');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error uploading video:', (error as Error).message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your a catch title"
          onChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
          keyboardType="default"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium mb-2">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker({ selectType: 'video' })}>
            {form.video ? (
              <VideoView
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="bg-black-100 h-40 px-4 rounded-2xl justify-center items-center">
                <View className="size-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium mb-2">
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker({ selectType: 'image' })}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="bg-black-100 h-16 px-4 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  className="size-5"
                  resizeMode="contain"
                />
                <Text className="text-gray-100 text-base font-pregular mr-2">
                  Chose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          onChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
          keyboardType="default"
        />

        <CustomButton
          title="Submit & Publish"
          onPress={submit}
          textStyles=""
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
