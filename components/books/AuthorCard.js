import React from 'react';
import { View, Text } from 'react-native';

/**
 * Renders an author card component.
 *
 * @param {Object} book - The book object containing the author information.
 * @param {string} book.name - The name of the book.
 * @param {string[]} book.authors - An array of author names.
 * @returns {JSX.Element} The rendered author card component.
 */
export default function AuthorCard({ book }) {

    return (
        <View className="bg-zinc-700 rounded-lg w-full px-4 py-2">
                    <Text className="text-2xl text-white font-medium">{ book.name }</Text>
                    <Text className="text-md text-zinc-400">Authors:</Text>
                    {book.authors.map(author => (
                        <View key={ author }>
                            <Text className="text-md text-zinc-400 font-medium text-left">{ author }</Text>
                        </View>
                    ))}
        </View>
    )
}