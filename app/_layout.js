import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { ScreenStack } from 'react-native-screens';

/**
 * Root layout component.
 * @returns {JSX.Element} The rendered root layout component.
 */
const RootLayout = () => {

    /**         NAVIGATION LIST
     * 
     * home/index - Home page for logged in Users
     * 
     * 
     */
    
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen 
                name="index"
                gestureEnabled={true}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen
                name="user/login"
                gestureEnabled={false}
                options={{
                    headerShown: false,
                    animation: 'none' // Disable animation for user/login screen
                }}
            />
            <Stack.Screen
                name="user/register"
                gestureEnabled={false}
                options={{
                    headerShown: false,
                     // Disable animation for user/login screen
                }}
            />
        </Stack>
    )
}

export default RootLayout;
