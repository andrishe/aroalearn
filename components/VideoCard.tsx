import {
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { icons } from '@/constants';

type VideoProps = {
  video: {
    title: string;
    thumbnail: string;
    videoUrl: string; // URL de la vidéo
    creator: {
      username: string;
      avatar: string;
    };
  };
};

const VideoCard = ({ video }: VideoProps) => {
  const { title, thumbnail, videoUrl, creator } = video;
  const { username, avatar } = creator;

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="size-6" resizeMode="contain" />
        </View>
      </View>

      {isPlaying ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={() => setIsPlaying(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="size-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
