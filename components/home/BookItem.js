import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Link, router, useNavigation, useRouter } from 'expo-router';

var booksCache = new Map();

export default function BookItem({ book }) {
    
    const router = useRouter();

    const goToBookDetailsPress = async () => {
        
        const bookParam   = JSON.stringify(book);
        
        router.push({ pathname: "books/details", params: { book: bookParam } });
    };

    return (
        <TouchableOpacity href="home/bookDetails"  
            className="w-full py-4 bg-zinc-700 rounded-xl mt-4 px-4"
            onPress={goToBookDetailsPress}>
            <View className="flex flex-row">
                <View>
                    <Image className="w-16 h-20" source={{ uri: "https://static.wikia.nocookie.net/gameofthrones/images/b/ba/WappenHausBaratheon.PNG/revision/latest/scale-to-width/360?cb=20190201051016&path-prefix=de" }} />
                </View>     
                <View className="absolute right-0 top-0" >
                    <Text className="text-lg text-white font-semibold text-right">{book.name.length > 25 ? book.name.substring(0, 23) + '...' : book.name}</Text>
                    <Text className="text-md text-zinc-300  text-right">{book.region}</Text>
                </View> 
            </View>
        </TouchableOpacity >
    );

}



