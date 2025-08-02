import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>Welcome to the Home Screen!</Text>
    </SafeAreaView>
  );
};

export default Home;
