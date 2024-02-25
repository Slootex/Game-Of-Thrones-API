import React from 'react';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * Renders a character item component.
 * @param {Object} character - The character object.
 * @returns {JSX.Element} The character item component.
 */
export default function CharacterItem({ character }) {
    const router = useRouter();

    /**
     * Navigates to the house details page with the selected character.
     * @async
     * @function goToHouseDetailsPress
     * @returns {Promise<void>}
     */
    const goToCharacterDetailsPress = async () => {
        const characterParam   = JSON.stringify(character);
        router.push({ pathname: "characters/details", params: { character: characterParam } });
    };

    return (
        <TouchableOpacity
            className="w-full py-4 bg-zinc-700 rounded-xl mt-4 px-4"
            onPress={goToCharacterDetailsPress}>
            <View className="flex flex-row">
                <View className="" >
                    <Text className="text-lg text-white font-semibold text-right">
                        {character.name.length > 25 ? character.name.substring(0, 23) + '...' : character.name}
                    </Text>
                    <Text className="text-md text-zinc-300  text-right">{character.region}</Text>
                </View> 
            </View>
        </TouchableOpacity >
    );
}



