import MariachiLayout from "@/components/mariachiLayout";
import { useLocationStore } from "@/store";
import { Text, View } from "react-native";

const SelectMariachi = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore;

  return (
    <MariachiLayout>
      <Text className="text-2xl">Find your mariachi</Text>
    </MariachiLayout>
  );
};

export default SelectMariachi;
