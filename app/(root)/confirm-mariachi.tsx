import CustomButton from "@/components/customButton";
import GroupMariachiCard from "@/components/groupMariachiCard";
import MariachiCard from "@/components/mariachiCard";
import MariachiLayout from "@/components/mariachiLayout";
import { useMariachiStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const mariachis = [
  {
    id: 1,
    name: "Los Dorados",
    profile_image_url: "",
    members: 6,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dinamita",
    profile_image_url: "",
    members: 7,
    rating: 4.65,
  },
  {
    id: 3,
    name: "Los regios",
    profile_image_url: "",
    members: 5,
    rating: 4.92,
  },
  {
    id: 4,
    name: "Los Rayos",
    profile_image_url: "",
    members: 8,
    rating: 4.75,
  },
];

const ConfirmMariachi = () => {
  const { mariachis, selectedMariachi, setSelectedMariachi } =
    useMariachiStore();
  return (
    <MariachiLayout title="Choose a Mariachi" snapPoints={["65%", "85%"]}>
      <FlatList
        data={mariachis}
        renderItem={({ item }) => (
          <GroupMariachiCard
            selected={selectedMariachi!}
            setSelected={() => setSelectedMariachi(item.id!)}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Mariachi"
              onPress={() => {
                router.push("/(root)/book-mariachi");
              }}
            />
          </View>
        )}
      />
    </MariachiLayout>
  );
};

export default ConfirmMariachi;
