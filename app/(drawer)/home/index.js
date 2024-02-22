import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopMenu from '../../../components/topMenu';
import HousesList from '../../../components/home/housesList';

export default function Index() {

  return (
    <SafeAreaView className="bg-zinc-800 w-full h-full">
     
        <TopMenu />
        <HousesList />

    </SafeAreaView>
  );
}
