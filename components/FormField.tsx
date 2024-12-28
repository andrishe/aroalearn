import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  otherStyles: string;
};

const FormField = ({
  title,
  value,
  placeholder,
  secureTextEntry,
  onChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium mb-2">{title}</Text>
      <View
        className={`border-2 w-full h-16 px-6 bg-black-100 rounded-2xl items-center flex-row ${
          isFocused ? 'border-secondary' : 'border-black-200'
        }`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={onChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
