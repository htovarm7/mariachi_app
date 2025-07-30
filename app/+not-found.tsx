import { Link, Redirect, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen does not exist.</Text>
        <Redirect href="/">
          <Text>Go to home screen!</Text>
        </Redirect>
      </View>
    </>
  );
}
