import CustomButton from "@/components/customButton";
import GroupMariachiCard from "@/components/groupMariachiCard";
import MariachiCard from "@/components/mariachiCard";
import MariachiLayout from "@/components/mariachiLayout";
import { useFetch } from "@/lib/fetch";
import { useMariachiStore } from "@/store";
import { Mariachi } from "@/types/type";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ConfirmMariachi = () => {
  const { mariachis, selectedMariachi, setSelectedMariachi } =
    useMariachiStore();
  const {
    data: mariachi,
    loading,
    error,
  } = useFetch<Mariachi[]>("/(api)/mariachis");
  return (
    <MariachiLayout title="Choose a Mariachi" snapPoints={["65%", "85%"]}>
      <FlatList
        data={mariachi}
        renderItem={({ item }) => (
          <GroupMariachiCard
            selected={selectedMariachi!}
            setSelected={() => setSelectedMariachi(item.mariachi_id!)}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Mariachi"
              onPress={() => {
                const selectedMariachiData = mariachi?.find(
                  (m) => m.mariachi_id === selectedMariachi
                );
                router.push({
                  pathname: "/(root)/book-mariachi",
                  params: { mariachi: JSON.stringify(selectedMariachiData) },
                });
              }}
            />
          </View>
        )}
      />
    </MariachiLayout>
  );
};

export default ConfirmMariachi;
