import { View, Text, Image } from 'react-native';
import { useState } from 'react';
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-white text-xl text-center mt-2">{title}</Text>
      <Text className="text-gray-100 font-pmedium text-sm">{subtitle} </Text>

      <CustomButton
        title="Create video"
        onPress={() => router.push('/create')}
        textStyles=""
        containerStyles="my-5 w-full"
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
