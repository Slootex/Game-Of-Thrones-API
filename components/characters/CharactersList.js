import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import CharacterItem from './CharacterItem';
import { FlashList } from '@shopify/flash-list';
import { useCharactersCache } from '../../constants/index';

let page = 1;
const API_URL = 'https://www.anapioficeandfire.com/api/characters';

/**
 * Renders a list of characters from an API.
 *
 * @returns {JSX.Element} The rendered CharactersList component.
 */
export default function CharactersList() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [charactersCache, setCharactersCache] = useCharactersCache();

    /**
     * Loads characters from the API and sets them in the state.
     * @returns {Promise<void>} A promise that resolves when the characters are loaded and set in the state.
     */
    const loadCharacters = async () => {
        setIsLoading(true);

        try {
            // Check if characters are already in cache
            if (charactersCache.length > 0) {
                setCharacters(charactersCache);
                return;
            }

            let fetchedCharacters = await getCharactersFromAPI(page);

            // Remove characters with no name and duplicates
            fetchedCharacters = fetchedCharacters
                .filter((character) => character.name !== "")
                .filter((character, index, self) => index === self.findIndex((c) => c.url === character.url));

            setCharacters(fetchedCharacters);
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    /**
     * Handles the end reached event and fetches the next characters from the API.
     * @returns {Promise<void>} A promise that resolves when the characters are fetched.
     */
    const handleEndReached = async () => {
        setIsLoading(true);

        try {
            let nextCharacters = await getCharactersFromAPI(page);

            // Remove characters with no name and duplicates
            nextCharacters = nextCharacters
                .filter((character) => character.name !== "")
                .filter((character, index, self) => index === self.findIndex((c) => c.url === character.url));

            setCharacters((prevCharacters) => [...prevCharacters, ...nextCharacters]);
        } catch (error) {
            console.error('Error fetching next characters:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderItem = ({ item }) => <CharacterItem character={item} />;

    return (
        <View className="px-6 bg-zinc-800 w-full h-full pb-16 pt-4">
            <FlashList
                className="mt-4 rounded-xl"
                estimatedItemSize={1200}
                onEndReached={handleEndReached}
                data={characters}
                keyExtractor={(item, index) => item.url + index}
                renderItem={renderItem}
            />

            {isLoading && <ActivityIndicator />}
        </View>
    );
}

/**
 * Fetches characters from an API and returns them.
 * @param {number} [page=1] - The page number to fetch characters from.
 * @returns {Promise<Array>} - A promise that resolves to an array of characters.
 * @throws {Error} - If there is an error fetching characters from the API.
 */
async function getCharactersFromAPI() {
    const url = `${API_URL}?page=${page}`;

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.sort((a, b) => a.name.localeCompare(b.name)); // Sort characters by name

        page++;

        // Fetch next characters if there are less than 9 characters
        if (responseJson.filter((character) => character.name !== "").length < 9) {
            const nextCharacters = await getCharactersFromAPI(page);
            responseJson.push(...nextCharacters);
            page++;
        }

        return responseJson;
    } catch (error) {
        throw new Error('Error fetching characters from API:', error);
    }
}