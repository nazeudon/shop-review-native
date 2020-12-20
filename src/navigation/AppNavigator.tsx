//rnfes
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { HomeStackNavigator } from "./HomeStackNavigator";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
