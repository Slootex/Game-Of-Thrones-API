import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopMenu from '../../../components/topMenu';
import BooksList from '../../../components/home/BooksList';

export default function Index() {

  return (
    <SafeAreaView className="bg-zinc-800 w-full h-full">
     
        <TopMenu />
        <BooksList />

    </SafeAreaView>
  );
}
