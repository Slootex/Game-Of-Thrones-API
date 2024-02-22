import React, { useEffect, useState } from 'react';
import { TextInput, View, ActivityIndicator } from 'react-native';
import HouseItem from './houseItem';
import { FlashList } from "@shopify/flash-list";

let page = 1;

/**
 * Renders a list of GoT houses.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function HousesList() {
    const [houses, setHouses]           = useState([]);
    const [isLoading, setIsLoading]     = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const fetchedHouses = await getHousesFromAPI(page);

            setHouses(fetchedHouses);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const renderItem = ({ item }) => <HouseItem house={item} />;

    const handleSearchQueryChange = (event) => {
        const searchQuery       = event.nativeEvent.text;
        const filteredHouses    = searchHouseWhereLike(searchQuery, houses);

        setHouses(filteredHouses);
    };

    /**
     * Handles the end reached event and loads more houses from the API.
     * @returns {Promise<void>} A promise that resolves when the houses are loaded.
     */
    const handleEndReached = async () => {
        setIsLoading(true);
        
        const nextHouses = await getHousesFromAPI();
        setHouses([...houses, ...nextHouses]);

        setIsLoading(false);
    };

    return (
        <View className="px-6 bg-zinc-800 w-full h-full pb-16 pt-4">
            <View className="pb-4">
                <TextInput 
                className="bg-zinc-700 h-8 rounded-2xl text-zinc-400 px-4" 
                placeholderTextColor={ "rgb(161 161 170)" } 
                placeholder='search house...'
                onTextInput={handleSearchQueryChange}
                ></TextInput>
            </View>

            <FlashList
                onEndReached={handleEndReached}
                data={houses}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                estimatedItemSize={800}
            />

            {isLoading && <ActivityIndicator />}
        </View>
    );
}

/**
 * Fetches houses data from an external API.
 * @returns {Promise<Array>} A promise that resolves to an array of house objects.
 */
async function getHousesFromAPI() {
    const url = `https://www.anapioficeandfire.com/api/houses?page=${page}`;

    try {
        const response      = await fetch(url);
        const responseJson  = await response.json();

        responseJson.sort((a, b) => a.name.localeCompare(b.name)); // Sort houses by name

        page++;

        return responseJson;
    } catch (error) {
        return error;
    }
}

/**
 * Filters and sorts an array of houses based on a search input.
 * @param {string} input - The search input.
 * @param {Array} houses - The array of houses to filter and sort.
 * @returns {Array} - The filtered and sorted array of houses.
 */
function searchHouseWhereLike(input, houses) {
    const filteredHouses = houses.filter((house) => house.name.includes(input));

    filteredHouses.sort((a, b) => {
        // Sort houses by name match index
        const aMatchIndex = a.name.indexOf(input);
        const bMatchIndex = b.name.indexOf(input);
        return aMatchIndex - bMatchIndex;
    });

    return filteredHouses;
}
