import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  textStyles: string;
  containerStyles: string;
  isLoading: boolean;
};

const CustomButton = ({
  onPress,
  title,
  textStyles,
  isLoading,
  containerStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-45' : ''
      }`}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
