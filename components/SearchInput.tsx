import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '@/constants';
import { useRouter, usePathname } from 'expo-router';

type SearchInputProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  otherStyles: string;
  initialQuery: string;
};

const SearchInput = ({
  value,
  placeholder,
  initialQuery,
  onChangeText,
  otherStyles,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const [query, setQuery] = useState<string>(initialQuery || '');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);
  return (
    <View
      className={`border-2 w-full h-16 px-6 bg-black-100 rounded-2xl items-center flex-row space-x-4 ${
        isFocused ? 'border-secondary' : 'border-black-200'
      }`}
    >
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={query}
        initailQuery={initialQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => setQuery(text)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database'
            );
          }
          if (pathname.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
