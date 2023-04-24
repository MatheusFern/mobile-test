import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const TokenValidator = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const item = await AsyncStorage.getItem("@token");
      console.log(item)
      // user is logged in
      if (item !== null) {
        navigation.navigate("Start");
      }else{
        navigation.navigate("SignIn");
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="Turquoise" size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TokenValidator;
