import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

type SearchInputProps = {
  value: string;
  placeholder: string;

  onChangeText: (text: string) => void;
  otherStyles: string;
};

const SearchInput = ({
  value,
  placeholder,

  onChangeText,
  otherStyles,
  ...props
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={`border-2 w-full h-16 px-6 bg-black-100 rounded-2xl items-center flex-row space-x-4 ${
        isFocused ? 'border-secondary' : 'border-black-200'
      }`}
    >
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={onChangeText}
        {...props}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
