import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import TopMenu from '../../../components/topMenu';
import { SafeAreaView } from 'react-native-safe-area-context';

let page = 1;

export default function details() {

    let { book } = useLocalSearchParams();
    book = JSON.parse(book);

    return (
        <SafeAreaView className="w-full h-full bg-zinc-800">
            <TopMenu />
            <View className="px-4 py-4">
                <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                    <Text className="text-3xl text-white">{ book.name }</Text>
                    <Text className="text-xl text-zinc-400">Author: { book.author }</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
        