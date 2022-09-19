import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;

    setUser(jwtDecode(token));
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreToken}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  // useEffect(() => {
  //   restoreToken();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//Another way of using SplashScreen,have some errors
// export default function App() {
//   const [user, setUser] = useState();

//   const [appIsReady, setAppIsReady] = useState(false);

//   const restoreUser = async () => {
//     const user = await authStorage.getUser();
//     if (user) {
//       setUser(user);
//     }
//     return user;
//   };

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await SplashScreen.preventAutoHideAsync();
//         const result = await restoreUser();
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       const result = await SplashScreen.hideAsync();
//       // console.log(result, 'hide?');
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       <OfflineNotice />
//       <NavigationContainer
//         ref={navigationRef}
//         theme={navigationTheme}
//         onReady={onLayoutRootView}
//       >
//         {user ? <AppNavigator /> : <AuthNavigator />}
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }
