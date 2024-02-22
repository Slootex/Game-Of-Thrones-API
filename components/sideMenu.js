import { FlatList, Image, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';

export default function SideMenu(props, {currentRoute}) {

    const currentTab = props.currentRoute
    const navigation = useNavigation();

    const handleLogout = async () => {
        const { user, error } = await supabase.auth.signOut();

            navigation.navigate("user/login");
    };
    
    return(
        <DrawerContentScrollView {...props} scrollEnabled={false}  contentContainerStyle={{backgroundColor: "rgb(39 39 42)", width: "100%", height: "100%"}}>
            <View className=" px-4 py-4 h-full w-full">
                <View className="flex flex-row">
                    <View>
                            <Text className="text-xl text-white font-semibold text-left">Lucas Gloede</Text>
                            <Text className="text-md text-zinc-400 text-left">lucasgloede20@gmail.com</Text>
                    </View>
                    <View className="absolute right-0 mt-1.5">
                        <AntDesign name="right" size={24} color="white" />
                    </View>
                </View>
                <View className="flex flex-col mt-8">
                    <TouchableOpacity className={`bg-zinc-800 rounded-md px-4 py-2 flex flex-row-reverse ${currentTab === "home" ? "bg-sky-500" : ""}`}
                        onPress={() => props.navigation.dispatch(DrawerActions.jumpTo("home"))}
                    >
                        <Ionicons name="home" size={24} color="rgb(113 113 122)" />
                        <Text className={`text-zinc-500 text-lg text-right mr-4 ${currentTab === "home" ? "text-white" : ""}`}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className={`bg-zinc-800 rounded-md px-4 py-2 flex flex-row-reverse ${currentTab === "books" ? "bg-sky-500" : ""}`}
                        onPress={() => props.navigation.dispatch(DrawerActions.jumpTo("books"))}
                    >
                        <Ionicons name="book" size={24} color="rgb(113 113 122)" />
                        <Text className={`text-zinc-500 text-lg text-right mr-4 -mt-0.5 ${currentTab === "books" ? "text-white" : ""}`}>Books</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className={`bg-zinc-800 rounded-md px-4 py-2 flex flex-row-reverse ${currentTab === "characters" ? "bg-sky-500" : ""}`}
                        onPress={() => props.navigation.dispatch(DrawerActions.jumpTo("characters"))}
                    >
                        <Ionicons name="book" size={24} color="rgb(113 113 122)" />
                        <Text className={`text-zinc-500 text-lg text-right mr-4 -mt-0.5 ${currentTab === "characters" ? "text-white" : ""}`}>Characters</Text>
                    </TouchableOpacity>
                </View>
                <View className="absolute bottom-10 m-auto right-4">
                    <View>
                        <View className="bg-zinc-800 rounded-md px-4 py-2 flex flex-row-reverse">
                            <FontAwesome name="gear" size={24} color="rgb(113 113 122)" />
                            <Text className="text-zinc-500 text-lg text-right mr-4">Settings</Text>
                        </View>

                        <TouchableOpacity 
                            className="bg-zinc-800 rounded-md px-3 py-2 flex flex-row-reverse "
                            onPress={ handleLogout }
                        >
                            <MaterialIcons name="logout" size={24} color="rgb(113 113 122)" />
                            <Text className="text-zinc-500 text-lg text-right mr-4">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </DrawerContentScrollView>
    )
}
