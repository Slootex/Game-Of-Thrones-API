import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookItem from './BookItem';
import { useBooksCache } from '../../constants';

let page = 1;

export default function BooksList() {
    const [books, setBooks]             = useState([]);
    const [isLoading, setIsLoading]     = useState(false);
    const [bookCache, setBookCache]     = useBooksCache();


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const fetchedBooks = await getBooksFromAPI(page);

            setBooks(fetchedBooks);
            setBookCache(fetchedBooks);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const renderItem = ({ item }) => <BookItem book={item} />;

    const handleEndReached = async () => {
        setIsLoading(true);
        
        const nextBooks = await getBooksFromAPI();
        setBooks([...books, ...nextBooks]);
        setBookCache([...bookCache, ...nextBooks]);

        setIsLoading(false);
    };

    return (
        <View className="px-6 bg-zinc-800 w-full h-full pb-16 pt-4">

            <FlatList
                className="mt-4 rounded-xl"
                onEndReached={handleEndReached}
                data={books}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
            />

            {isLoading && <ActivityIndicator />}
        </View>
    );
}

async function getBooksFromAPI() {
    const url = `https://www.anapioficeandfire.com/api/books?page=${page}`;

    try {
        const response      = await fetch(url);
        const responseJson  = await response.json();

        responseJson.sort((a, b) => a.name.localeCompare(b.name)); // Sort books by name

        page++;

        return responseJson;
    } catch (error) {
        return error;
    }
}