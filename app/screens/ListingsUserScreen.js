import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";

function ListingsUserScreen({ navigation }) {
  const [products, setProducts] = useState(userListings);
  const [refreshing, setRefreshing] = useState(false);

  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const { user } = useAuth();

  const userListings = getListingsApi.data.filter(
    (d) => d.userId == user.userId
  );

  const handleDelete = (product) => {
    //Delete the message from messages
    setProducts(userListings.filter((p) => p.id !== product.id));
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </>
        )}
        <FlatList
          data={userListings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
export default ListingsUserScreen;
