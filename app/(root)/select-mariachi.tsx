import CustomButton from "@/components/customButton";
import GoogleTextInput from "@/components/googleTextInput";
import MariachiLayout from "@/components/mariachiLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { Text, View } from "react-native";
import { router } from "expo-router";

const SelectMariachi = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore;

  return (
    <MariachiLayout title="Mariachi" snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="text-xl font-FunnelSansSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-mariachi")}
        className="mt-5"
      />
    </MariachiLayout>
  );
};

export default SelectMariachi;
