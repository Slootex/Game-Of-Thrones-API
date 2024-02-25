import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CharacterItem({ item }) {

    const router = useRouter();

    /**
     * Navigates to the house details page with the selected character.
     * @async
     * @function goToHouseDetailsPress
     * @returns {Promise<void>}
     */
    const goToCharacterDetailsPress = async () => {
        const characterParam   = JSON.stringify(item);
        console.log("characterParam: ", characterParam);
        router.push({ pathname: "characters/details", params: { character: characterParam } });
    };

    return(
        <View>
             <View className="flex flex-row mt-1">
                <Text className="text-base text-white text-left w-72">{ item.name } </Text>
                <TouchableOpacity
                    className="px-2 py-1 rounded-md bg-zinc-500"
                    onPress={goToCharacterDetailsPress}
                >
                    <Text className="text-sm text-zinc-300 text-center">details</Text>
                </TouchableOpacity>

            </View>
        </View>
            
    )
}