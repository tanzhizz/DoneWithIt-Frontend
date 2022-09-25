import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import logger from "./app/utility/logger";

// export default function App() {
//   const [user, setUser] = useState();
//   const [isReady, setIsReady] = useState(false);

//   const restoreToken = async () => {
//     const token = await authStorage.getToken();
//     if (!token) return;

//     setUser(jwtDecode(token));
//   };

//   if (!isReady) {
//     return (
//       <AppLoading
//         startAsync={restoreToken}
//         onFinish={() => setIsReady(true)}
//         onError={console.warn}
//       />
//     );
//   }

//   // useEffect(() => {
//   //   restoreToken();
//   // }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       <OfflineNotice />
//       <NavigationContainer theme={navigationTheme}>
//         {user ? <AppNavigator /> : <AuthNavigator />}
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }

//Another way of using SplashScreen,have some errors

logger.start();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();

  const [IsReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      await SplashScreen.hideAsync();
      // console.log(result, 'hide?');
    }
  }, [IsReady]);

  if (!IsReady) {
    return null;
  }

  const navigationref = React.createRef();
  const navigation = navigationref.current;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {/* <OfflineNotice /> */}
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={onLayoutRootView}
      >
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
