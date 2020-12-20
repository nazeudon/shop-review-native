import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
/* components */
import ShopReviewItem from "../components/ShopReviewItem";
/* lib */
import { getShops } from "../lib/firebase";
/* types */
import { Shop } from "../types/shop";

export const HomeScreen = ({ navigation }) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  // const shopItems = shops.map((shop, index) => (
  //   <ShopReviewItem shop={shop} key={index.toString()} />
  // ));

  const onPressShop = () => {
    navigation.navigate("Shop");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={onPressShop} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
