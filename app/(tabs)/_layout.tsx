import { Tabs } from 'expo-router';
import React from 'react';
import { Image, View, Text, ImageSourcePropType } from 'react-native';
import { icons } from '@/constants';

type TabIconProps = {
  focused: boolean;
  color: string;
  icon: ImageSourcePropType;
  name: string;
};

const TabIcon = ({ focused, color, icon, name }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="size-6"
      />
      <Text
        className={`${focused ? 'font-pmedium' : 'font-pregular'} text-[9px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#FFA001',
        tabBarActiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              icon={icons.home}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              icon={icons.bookmark}
              name="Book"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              icon={icons.plus}
              name="Create"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              icon={icons.profile}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
