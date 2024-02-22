import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from "expo-router";
import { supabase } from "../../utils/supabase.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();
    const router = useRouter();

    const handleLogin = async () => {
        
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error == null) {
            setErrorMessage("");
            router.push({ pathname: "(drawer)/home", });

        } else {
            setErrorMessage("Invalid email or password");
        }
    };

    return(
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
                        placeholder={"Password"}
                        placeholderTextColor={"rgb(161 161 170)"}
                        secureTextEntry={true}
                        value={password}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                    />
                    <View className="absolute right-2.5 top-4">
                        <EvilIcons name="lock" size={36} color="rgb(161 161 170)" />
                    </View>
                </View>

                {errorMessage !== "" && (
                    <Text className="text-red-500 mt-2">{errorMessage}</Text>
                )}

                <View className="w-80">
                    <Text className="text-right mt-4 text-zinc-500">Forgot password?</Text>
                </View>

                <View className="mt-10">
                    <TouchableOpacity onPress={handleLogin}>
                        <View className="bg-sky-500 w-80 h-14 rounded-xl mt-8 flex items-center justify-center">
                            <Text className="text-white text-lg font-medium">Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bottom-16 flex flex-row items-center justify-center">
                <View>
                    <Text className="text-white">Don't have an account?</Text>
                </View>
                <Link href="/user/register" className="text-sky-500 ml-2">Sign Up</Link>
            </View>
        </View>
    )
}