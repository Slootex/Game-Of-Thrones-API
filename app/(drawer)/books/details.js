import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import TopMenu from '../../../components/topMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useCharactersCache } from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function details() {

    let { book } = useLocalSearchParams();
    book = JSON.parse(book);

    // Calculate the age of the book
    const releasedDate = new Date(book.released);
    const currentDate = new Date();
    const ageInYears = currentDate.getFullYear() - releasedDate.getFullYear();

    const characters = book.characters.slice(0, 3);
    const [charactersList, setCharacterList] = useState([]);
    const [charactersCache, setCharactersCache] = useCharactersCache();

    useEffect(() => {
        const fetchData = async () => {
            setCharacterList([]);

            for (const character of characters) {
                if (charactersCache.find(char => char.url === character)) {
                    const characterData = charactersCache.find(char => char.url === character);

                    if (characterData.name !== "") {
                        setCharacterList(charactersList => [...charactersList, characterData]);
                    }
                    continue;
                } else {
                    let storage = await AsyncStorage.getItem(character);

                    if (storage !== null) {
                        storage = JSON.parse(storage);
                        setCharacterList(charactersList => [...charactersList, storage]);
                        setCharactersCache(charactersCache => [...charactersCache, storage]);
                        continue;
                    } else {
                        const characterData = await getCharacterFromAPI(character);

                        if (characterData.name !== "") {
                            setCharacterList(charactersList => [...charactersList, characterData]);
                            setCharactersCache(charactersCache => [...charactersCache, characterData]);
                            AsyncStorage.setItem(character, JSON.stringify(characterData));
                        }
                    }
                }
            }
        };

        fetchData();
    }, []);

 

    return (
        <SafeAreaView className="w-full h-full bg-zinc-800">
            <TopMenu />
            <View className="px-4 py-4">
                <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                    <Text className="text-2xl text-white font-medium">{ book.name }</Text>
                    <Text className="text-xl text-zinc-400">Authors:</Text>
                    {book.authors.map(author => (
                        <View key={ author }>
                            <Text className="text-lg text-zinc-400 font-medium text-left">{ author }</Text>
                        </View>
                    ))}
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="flex flex-row content-evenly justify-between">
                        <View className="w-28 bg-zinc-700 rounded-lg py-1">
                            <Text className="text-xl text-white font-medium text-center">Characters</Text>
                            <Text className=" text-base text-zinc-400 text-center">{ book.characters.length }</Text>
                        </View>
                        <View className="w-28 bg-zinc-700 rounded-lg py-1">
                            <Text className="text-xl text-white font-medium text-center">Pages</Text>
                            <Text className=" text-base text-zinc-400 text-center">{ book.numberOfPages }</Text>
                        </View>
                        <View className="w-28 bg-zinc-700 rounded-lg py-1">
                            <Text className="text-xl text-white font-medium text-center">Age</Text>
                            <Text className=" text-base text-zinc-400 text-center">{ ageInYears } Yrs.</Text>
                        </View>
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font.medium">Specifics</Text>

                        <View className="flex flex-row">
                            <Text className="text-base text-white text-left w-32">Publisher: </Text>
                            <Text className="text-base text-zinc-400 text-left">{ book.publisher }</Text>
                        </View>

                        <View className="flex flex-row mt-2">
                            <Text className="text-base text-white text-left w-32">Country: </Text>
                            <Text className="text-base text-zinc-400 text-left">{ book.country }</Text>
                        </View>

                        <View className="flex flex-row mt-2">
                            <Text className="text-base text-white text-left w-32">Media Type: </Text>
                            <Text className="text-base text-zinc-400 text-left">{ book.mediaType }</Text>
                        </View>

                        <View className="flex flex-row mt-2">
                            <Text className="text-base text-white text-left w-32">ISBN: </Text>
                            <Text className="text-base text-zinc-400 text-left">{ book.isbn }</Text>
                        </View>
                    </View>
                </View>

                <View className="w-full py-2 mt-4">
                    <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                        <Text className="text-white text-xl font.medium">Characters</Text>
                        <FlatList
                            data={charactersList}
                            renderItem={({ item }) => (
                                <View>
                                    <Text className="text-base text-white text-left">{ item.name }</Text>
                                </View>
                            )}
                            keyExtractor={item => item.url}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

async function getCharacterFromAPI(url) {
    try {
        const response      = await fetch(url);
        const responseJson  = await response.json();
        console.log(responseJson);
        
        return responseJson;
    } catch (error) {
        return error;
    }
}
        