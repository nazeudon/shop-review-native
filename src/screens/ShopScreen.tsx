import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export const ShopScreen: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <View>
      <Text>Shop Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
