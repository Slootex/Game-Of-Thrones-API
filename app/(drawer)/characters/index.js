import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopMenu from '../../../components/topMenu';
import CharactersList from '../../../components/characters/CharactersList';


export default function Index() {
    return(

        <SafeAreaView className="h-full w-full bg-zinc-800">
            <TopMenu />
            <CharactersList />
        </SafeAreaView>

    )
}