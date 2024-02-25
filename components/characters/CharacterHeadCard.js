import React from 'react';
import { View, Text } from 'react-native';

export default function CharacterHeadCard({ character }) {

    return (
        <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
            <Text className="text-2xl text-white font-medium">{ character.name ? character.name : "Unknown" }</Text>
            <View className="flex flex-row">
                <Text className="text-md text-zinc-400">Played By:</Text>
                <Text className="text-md text-zinc-400 ml-2">{ character.playedBy }</Text>
            </View>
        </View>
    )
}