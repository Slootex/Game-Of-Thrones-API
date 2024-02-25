import { Text, View } from "react-native";

export default function SpecificInfo({ name, text }) {
    
    return(
        <View className="flex flex-row w-60">
            <Text className="text-base text-white text-left w-32">{ name }: </Text>
            {Array.isArray(text) ? (
                text.map((item, index) => (
                    <Text key={index} className="text-base text-zinc-400 text-left">{ item }</Text>
                ))
            ) : (
                <Text className="text-base text-zinc-400 text-left">{ text }</Text>
            )}
        </View>
    )
}
    

  