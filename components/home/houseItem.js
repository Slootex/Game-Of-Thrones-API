import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Link, router, useNavigation, useRouter } from 'expo-router';

var housesCache = new Map();

/**
 * Renders a house item component.
 *
 * @param {Object} house - The house object containing information about the house.
 * @returns {JSX.Element} The rendered house item component.
 */
export default function HouseItem({ house }) {
    
    const router = useRouter();

    const goToHouseDetailsPress = async () => {
        let lord = house.currentLord === "" ? new Object() : await getLordFromHouse(house.currentLord);
        
        lord    = JSON.stringify(lord);
        houseParam   = JSON.stringify(house);
        
        router.push({ pathname: "home/houseDetails", params: {lord: lord, house: houseParam} });
    };

    return (
        <TouchableOpacity href="home/houseDetails"  
            className="w-full py-4 bg-zinc-700 rounded-xl mt-4 px-4"
            onPress={goToHouseDetailsPress}>
            <View className="flex flex-row">
                <View>
                    <Image className="w-16 h-20" source={{ uri: "https://static.wikia.nocookie.net/gameofthrones/images/b/ba/WappenHausBaratheon.PNG/revision/latest/scale-to-width/360?cb=20190201051016&path-prefix=de" }} />
                </View>     
                <View className="absolute right-0 top-0" >
                    <Text className="text-lg text-white font-semibold text-right">{house.name.length > 25 ? house.name.substring(0, 23) + '...' : house.name}</Text>
                    <Text className="text-md text-zinc-300  text-right">{house.region}</Text>
                </View> 
            </View>
        </TouchableOpacity >
    );

}

/**
 * Fetches the lord data from the specified URL.
 * @param {string} url - The URL to fetch the data from.
 * @returns {Promise<Object>} - The fetched data as an object.
 */
async function getLordFromHouse(url) {
    
    if(housesCache.has(url)) {
        return housesCache.get(url);
    } else {

        const response  = await fetch(url);
        const data      = await response.json();

        housesCache.set(url, data);

        return data;
    }
}



