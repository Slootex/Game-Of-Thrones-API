import { Text, View } from "react-native";

export default function SpecificInfo({ name, text }) {

    return(
        <View className="flex flex-row">
            <Text className="text-base text-white text-left w-32">{ name }: </Text>
            <Text className="text-base text-zinc-400 text-left">{ text }</Text>
        </View>
    )
}