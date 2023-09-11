import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import firebaseService from "../services/firebase";

export default function SettingsScreen() {
  const logUserOut = async () => {
    await firebaseService.auth.signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!!!</Text>
      <Button title='signOut' onPress={logUserOut}>
        <Text>LogOut</Text>
      </Button>
    </View>
  );
}