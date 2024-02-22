import { FlatList, Image, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';



export default function TopMenu() {
    const navigation = useNavigation();

    return(
        <View className="px-4 bg-zinc-800">
            <View className="flex flex-row">
                <Image
                    className="w-16 h-16 rounded-full"
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View className="mt-2 ml-2">
                    <Text className="text-md text-zinc-300">Welcome back,</Text>
                    <Text className="text-2xl text-white font-semibold ">Lucas Gloede</Text>
                </View>
                <View className="absolute right-2 top-2">
                    <TouchableOpacity  onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className="self-end right-0">
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}