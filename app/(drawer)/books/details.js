import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

import TopMenu from '../../../components/topMenu';
import InfoCard from '../../../components/books/InfoCard';
import SpecificInfo from '../../../components/books/SpecificInfo';
import CharacterItem from '../../../components/books/CharacterItem';
import AuthorCard from '../../../components/books/AuthorCard';
import { getAgeFromBook } from '../../../utils/book';
import { addCharacterToCaches, getCharacterFromAPI, getCharacterFromInMemoryCache, getCharacterFromInStorageCache, isCharacterInMemoryCache, isCharacterInStorageCache } from '../../../utils/character';

const loadCharactersIndexSize = 3;

/**
 * Renders the details of a book.
 * @returns {JSX.Element} The rendered details component.
 */
export default function Details() {
    let { book } = useLocalSearchParams();
    book = JSON.parse(book);
    const [charactersIndex, setCharactersIndex] = useState(0);
    const [charactersList, setCharacterList] = useState([]);
    const [isFetchingCharacters, setIsFetchingCharacters] = useState(false);
    const CharacterItemListRef = useRef();
    
    /**
     * Fetches three characters from the book's character list.
     * 
     * @returns {Promise<void>} A promise that resolves when the characters are fetched.
     */
    const getThreeCharacters = async () => {
        if (isFetchingCharacters) {
            return;
        }
        setIsFetchingCharacters(true);

        const characters = book.characters
            .slice(charactersIndex, charactersIndex + loadCharactersIndexSize)
            .filter((character) => character.name !== '');

        for (const character of characters) {
            if(character == null) continue;
            
            if (isCharacterInMemoryCache(character)) {
                const characterData = getCharacterFromInMemoryCache(character);
                setCharacterList((charactersList) => [...charactersList, characterData]);
                continue;
            } else {

                if(await isCharacterInStorageCache(character)) {
                    const storage = await getCharacterFromInStorageCache(character);

                    setCharacterList((charactersList) => [...charactersList, storage]);
                    addCharacterToCaches(character, storage);
                } else {
                    const characterData = await getCharacterFromAPI(character);
                    if(characterData.name == "") continue;

                    setCharacterList((charactersList) => [...charactersList, characterData]);
                    addCharacterToCaches(character, characterData);
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

    const renderCharacterItem = ({ item }) => <CharacterItem item={item} />;
    const ageInYears = getAgeFromBook(book);

    return (
        <SafeAreaView className="w-full h-full bg-zinc-800">
            <TopMenu />
            <View className="px-4 py-4">
                <AuthorCard book={book} />

                <View className="w-full py-2 mt-4">
                    <View className="flex flex-row content-evenly justify-between">
                        <InfoCard name="Characters" text={book.characters.length} />

                        <InfoCard name="Pages" text={book.numberOfPages} />

                        <InfoCard name="Age" text={`${ageInYears} Yrs.`} />
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font-medium">Specifics</Text>

                        <SpecificInfo name="Publisher" text={book.publisher} />

                        <SpecificInfo name="Country" text={book.country} />

                        <SpecificInfo name="Media Type" text={book.mediaType} />

                        <SpecificInfo name="ISBN" text={book.isbn} />
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
                            keyExtractor={(item) => item.url}
                        />

                        <TouchableOpacity className="w-full py-2 mt-4 bg-zinc-600 rounded-lg" >
                            {book.characters.length === 0 ? (
                                <Text className="text-white text-center font-medium">No Characters available</Text>
                            ) : (
                                <Text className="text-white text-center font-medium">
                                    View {loadCharactersIndexSize} More ({charactersList.length}/{book.characters.length})
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
