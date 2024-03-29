import { Drawer } from "expo-router/drawer"
import SideMenu from "../../components/sideMenu"

export default function Layout() {
    return (
    <Drawer
        screenOptions={{
            headerShown:false, 
            drawerPosition: "right",
        }}
        drawerContent={(props) => <SideMenu {...props} currentRoute={props.state.routeNames[props.state.index]} />}
    >
        <Drawer.Screen 
            name="home" 
            options={{
                drawerLabel : "Home",
                title: "home",
                headerShown: false,
            }}>
        </Drawer.Screen>


        

    </Drawer>
    )
}