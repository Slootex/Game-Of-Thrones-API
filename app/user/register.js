import { useState } from "react";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { supabase } from "../../utils/supabase";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleRegister = async () => {
        if (email === "" || username === "" || password === "" || confirmPassword === "") {
            setErrorMessage("Please fill in all fields");
        } else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
        } else {

            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            
                options: {
                    data: {
                        username: username,
                    },
                }
            });
            
            if (error == null) {
                setErrorMessage("");
                router.push({ pathname: "(drawer)/home", });
            } else {
                console.log(error);
                setErrorMessage("Error signing up");
            }
        }
    };

    return (
        <View className="bg-zinc-800 w-full h-full">
            <View className="flex flex-col items-center justify-center h-full">
                <Text className="text-white text-3xl font-semibold">Welcome Back!</Text>
                <Text className="text-white text-base">Login to continue</Text>

                <View className="bg-zinc-700 w-80 h-14 rounded-xl mt-20">
                    <TextInput
                        className="w-80 h-14 px-4 py-2 text-white text-base"
                        placeholder={"Email"}
                        placeholderTextColor={"rgb(161 161 170)"}
                        value={email}
                        inputMode="email"
                        autoCapitalize='none'
                        onChangeText={setEmail}
                    />
                    <View className="absolute right-4 top-4">
                        <EvilIcons name="envelope" size={30} color="rgb(161 161 170)" />
                    </View>
                </View>

                <View className="bg-zinc-700 w-80 h-14 rounded-xl mt-8">
                    <TextInput
                        className="w-80 h-14 px-4 py-2 text-white text-base"
                        placeholder={"Username"}
                        placeholderTextColor={"rgb(161 161 170)"}
                        value={username}
                        autoCapitalize='none'
                        onChangeText={setUsername}
                    />
                    <View className="absolute right-4 top-4">
                    <AntDesign name="user" size={24} color="rgb(161 161 170)" />
                    </View>
                </View>

                <View className="bg-zinc-700 w-80 h-14 rounded-xl mt-8">
                    <TextInput
                        className="w-80 h-14 px-4 py-2 text-white text-base"
                        placeholder={"Password"}
                        placeholderTextColor={"rgb(161 161 170)"}
                        secureTextEntry={true}
                        value={password}
                        autoCapitalize='none'
                        onChangeText={setPassword}
                    />
                    <View className="absolute right-2.5 top-4">
                        <EvilIcons name="lock" size={36} color="rgb(161 161 170)" />
                    </View>
                </View>

                <View className="bg-zinc-700 w-80 h-14 rounded-xl mt-8">
                    <TextInput
                        className="w-80 h-14 px-4 py-2 text-white text-base"
                        placeholder={"Confirm Password"}
                        placeholderTextColor={"rgb(161 161 170)"}
                        secureTextEntry={true}
                        value={confirmPassword}
                        autoCapitalize='none'
                        onChangeText={setConfirmPassword}
                    />
                    <View className="absolute right-2.5 top-4">
                        <EvilIcons name="lock" size={36} color="rgb(161 161 170)" />
                    </View>
                </View>

                {errorMessage !== "" && (
                    <Text className="text-red-500 mt-4">{errorMessage}</Text>
                )}

                <View className="mt-10">
                    <TouchableOpacity onPress={handleRegister}>
                        <View className="bg-sky-500 w-80 h-14 rounded-xl mt-8 flex items-center justify-center">
                            <Text className="text-white text-lg font-medium">Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bottom-16 flex flex-row items-center justify-center">
                <View>
                    <Text className="text-white">Already have an account?</Text>
                </View>
                <TouchableOpacity>
                    <Link href="/user/login" className="text-sky-500 ml-2">Sign In</Link>
                </TouchableOpacity>
            </View>
        </View>
    );
}
                 