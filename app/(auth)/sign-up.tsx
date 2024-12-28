import { ScrollView, Text, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';

export default function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser(form.email, form.password, form.username);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="flex-1 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mx-auto mb-6"
          />
          <Text className="text-2xl text-white font-semibold text-center">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your name"
            onChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            keyboardType="default"
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            onChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            onChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry={true}
          />
          <CustomButton
            title="Sign Up"
            onPress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
            textStyles=""
          />
          <View className="flex-row justify-center mt-5 gap-2">
            <Text className="text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link
              href="/(auth)/sign-in"
              className="text-lg font-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
