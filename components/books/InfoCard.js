import { Text, View } from "react-native";

export default function InfoCard({ name, text }) {
    return(
        <View className="w-28 bg-zinc-700 rounded-lg py-1">
            <Text className="text-xl text-white font-medium text-center">{ name }</Text>
            <Text className=" text-base text-zinc-400 text-center">{ text }</Text>
        </View>
    )
}

