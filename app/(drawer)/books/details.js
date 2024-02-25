import { useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import TopMenu from '../../../components/topMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useCharactersCache } from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoCard from '../../../components/books/InfoCard';
import SpecificInfo from '../../../components/books/SpecificInfo';
import CharacterItem from '../../../components/books/CharacterItem';
import AuthorCard from '../../../components/books/AuthorCard';

/**
 * Renders the details of a book.
 * @returns {JSX.Element} The rendered details component.
 */
export default function details() {

    let { book } = useLocalSearchParams();
    book = JSON.parse(book);

    const loadCharactersIndexSize = 3;

    // Calculate the age of the book
    const releasedDate = new Date(book.released);
    const currentDate = new Date();
    const ageInYears = currentDate.getFullYear() - releasedDate.getFullYear();

    const [charactersIndex, setCharactersIndex] = useState(0);
    const [charactersList, setCharacterList] = useState([]);
    const [charactersCache, setCharactersCache] = useCharactersCache();
    const [isFetchingCharacters, setIsFetchingCharacters] = useState(false);
    const CharacterItemListRef = useRef();

    const renderCharacterItem = ({ item }) => <CharacterItem item={item} />;

  
    /**
     * Fetches three characters from the book's character list and updates the character list state.
     * If a character is already cached, it retrieves the character data from the cache.
     * If a character is not cached, it fetches the character data from the API and stores it in the cache.
     * @returns {Promise<void>} A promise that resolves once the characters are fetched and updated.
     */
    const getThreeCharacters = async () => {
        if (isFetchingCharacters) {
            return; // Exit the function if already fetching characters
        }
        setIsFetchingCharacters(true);

        let characters = book.characters.slice(charactersIndex, charactersIndex + loadCharactersIndexSize).filter(character => character.name != "");

        for (const character of characters) {
            if (charactersCache.find(char => char.url === character)) {
                const characterData = charactersCache.find(char => char.url === character);

                if (characterData.name != "") {
                    setCharacterList(charactersList => [...charactersList, characterData]);
                }
                continue;
            } else {
                let storage = await AsyncStorage.getItem(character);
                storage = JSON.parse(storage);
                
                if (storage.name != "") {
                    setCharacterList(charactersList => [...charactersList, storage]);
                    setCharactersCache(charactersCache => [...charactersCache, storage]);
                    continue;
                } else {
                    const characterData = await getCharacterFromAPI(character);

                    if (characterData.name != "") {
                        setCharacterList(charactersList => [...charactersList, characterData]);
                        setCharactersCache(charactersCache => [...charactersCache, characterData]);
                        AsyncStorage.setItem(character, JSON.stringify(characterData));
                    }
                }
            }
        }
        CharacterItemListRef.current.scrollToEnd({ animated: true });
        setCharactersIndex(charactersIndex + loadCharactersIndexSize);
        setIsFetchingCharacters(false);
    };

    useEffect(() => {
        getThreeCharacters();
    }, []);

 
    return (
        <SafeAreaView className="w-full h-full bg-zinc-800">
            <TopMenu />
            <View className="px-4 py-4">
                <AuthorCard book={ book } />

                <View className="w-full py-2 mt-4">
                    <View className="flex flex-row content-evenly justify-between">
                        <InfoCard name="Characters" text={ book.characters.length } />

                        <InfoCard name="Pages" text={ book.numberOfPages } />

                        <InfoCard name="Age" text={ ageInYears + " Yrs." } />
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font-medium">Specifics</Text>

                        <SpecificInfo name="Publisher" text={ book.publisher } />

                        <SpecificInfo name="Country" text={ book.country } />

                        <SpecificInfo name="Media Type" text={ book.mediaType } />

                        <SpecificInfo name="ISBN" text={ book.isbn } />
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font-medium">Characters</Text>
                        <FlatList
                            className="max-h-56"
                            ref={CharacterItemListRef}
                            data={charactersList}
                            renderItem={renderCharacterItem}
                            keyExtractor={item => item.url}
                        />

                        <TouchableOpacity 
                            className="w-full py-2 mt-4 bg-zinc-600 rounded-lg"
                            onPress={getThreeCharacters}
                        >
                            {book.characters.length === 0 ? (
                                <Text className="text-white text-center font-medium">No Characters available</Text>
                            ) : (
                                <Text className="text-white text-center font-medium">View { loadCharactersIndexSize } More ({ charactersList.length }/{ book.characters.length })</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

/**
 * Fetches a character from the API.
 * @param {string} url - The URL of the API endpoint.
 * @returns {Promise<Object|Error>} - A promise that resolves to the character object or rejects with an error.
 */
async function getCharacterFromAPI(url) {
    try {
        const response      = await fetch(url);
        const responseJson  = await response.json();
        
        return responseJson;
    } catch (error) {
        return error;
    }
}  