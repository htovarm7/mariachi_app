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

  return (
    <MariachiLayout title="Choose a Mariachi" snapPoints={["65%", "85%"]}>
      <FlatList
        data={mariachis}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <GroupMariachiCard
            item={item}
            selected={selectedMariachi!}
            setSelected={() => setSelectedMariachi(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Mariachi"
              onPress={() => router.push("/(root)/book-mariachi")}
            />
          </View>
        )}
      />
    </MariachiLayout>
  );
};

export default ConfirmMariachi;
