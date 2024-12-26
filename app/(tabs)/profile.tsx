import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24 }}>Profile</Text>
        <Text style={{ fontSize: 24, color: '#808080' }}>🚀</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
