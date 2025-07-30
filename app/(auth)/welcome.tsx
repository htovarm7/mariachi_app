import React from "react";
import { verifyInstallation } from "nativewind";
import { View, Text } from "react-native";

function App() {
  // Ensure to call inside a component, not globally
  verifyInstallation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Welcome to the Onboarding Screen!</Text>
    </View>
  );
}

export default App;
