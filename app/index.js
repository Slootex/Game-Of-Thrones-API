import { Redirect, SplashScreen } from "expo-router";
import { supabase } from "../utils/supabase";
import React, { useEffect } from "react";
import "../constants/index.js";

export default function Index() {

  const [appReady, setAppReady] = React.useState(false);
  const [user, setUser] = React.useState();
  
  
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Make any API calls you need to do here
        const userData = await supabase.auth.getUser();

        const user = userData.data.user;

        setUser(user);
        
        if (!user) return;

      } catch (e) {
        console.log(e)
      } finally {
        // Tell the application to render
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appReady) {
    return null;
  }

  if (user != null) {
    return <Redirect href={"/(drawer)/home"} />;
  } else {
    return <Redirect href={"/user/login"} />;
  }

}



