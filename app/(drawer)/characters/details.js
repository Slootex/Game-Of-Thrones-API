import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TopMenu from '../../../components/topMenu';
import CharacterHeadCard from '../../../components/characters/CharacterHeadCard';
import SpecificInfo  from '../../../components/characters/SpecificInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useBooksCache } from '../../../constants';
import { useEffect } from 'react';


/**
 * Renders the details of a character.
 * @returns {JSX.Element} The rendered details component.
 */
export default function details() {

    const router = useRouter();

    let { character } = useLocalSearchParams();
    character = JSON.parse(character);

    const [bookCache, setBookCache] = useBooksCache();
    const [books, setBooks]         = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            character.books.forEach(async book => {
                if (bookCache.includes(book)) {
                    setBooks(prevBooks => [...prevBooks, book]);
                } else {
                    const url = book;
                    const responseJSON = await getBooksFromAPI(url);

                    setBooks(prevBooks => [...prevBooks, responseJSON]);
                    setBookCache(prevCache => [...prevCache, responseJSON]);
                }
            });
        };

        getBooks();
    }, []);

    const goToBookDetailsPress = (book) => async () => {
        
        const bookParam   = JSON.stringify(book);
        
        router.push({ pathname: "books/details", params: { book: bookParam } });
    };

    return (
        <SafeAreaView className="w-full h-full bg-zinc-800">
            <TopMenu />
            <View className="px-4 py-4">
                <CharacterHeadCard character={ character } />

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font-medium">Specifics</Text>

                        <SpecificInfo name={"Aliases"} text={ character.aliases ? character.aliases[0] : "No" } />
                        <SpecificInfo name={"Gender"} text={ character.gender } />
                        <SpecificInfo name={"Died"} text={ character.died ? character.died : "No" } />
                        <SpecificInfo name={"Titles"} text={ character.titles ? character.titles[0] : "No" } />
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font-medium">Books</Text>

                        <FlatList
                            className="max-h-36"
                            data={ books }
                            keyExtractor={book => book.name}
                            renderItem={({ item }) => (
                                <View className="flex flex-row mt-1">
                                    <Text className="text-base text-white text-left w-72">{ item.name } </Text>
                                    <TouchableOpacity
                                        className="px-2 py-1 rounded-md bg-zinc-500"
                                        onPress={goToBookDetailsPress(item)}
                                    >
                                        <Text className="text-sm text-zinc-300 text-center">details</Text>
                                    </TouchableOpacity>

                                </View>
                            )}
                        />
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font-medium">TV Series</Text>

                        <FlatList
                            className="max-h-36"
                            data={ character.tvSeries }
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <View className="flex flex-row mt-1">
                                    <Text className="text-base text-white text-left w-72">{ item } </Text>

                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

async function getBooksFromAPI(url) {
    try {
        const response      = await fetch(url);
        const responseJSON  = await response.json();

        return responseJSON;
    } catch (error) {
        console.error(error);
    }
}