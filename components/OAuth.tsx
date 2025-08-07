import { Image, Text, View } from "react-native";
import CustomButton from "./customButton";
import { icons } from "../constants/index";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        onPress={handleGoogleSignIn}
        IconLeft={() => (
          <Image
            source={icons.google}
            style={{ width: 20, height: 20, marginHorizontal: 8 }}
          />
        )}
      />
    </View>
  );
};

export default OAuth;
