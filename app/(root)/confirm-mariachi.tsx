import CustomButton from "@/components/customButton";
import GroupMariachiCard from "@/components/groupMariachiCard";
import MariachiLayout from "@/components/mariachiLayout";
import { useFetch } from "@/lib/fetch";
import { useMariachiStore } from "@/store";
import { Mariachi } from "@/types/type";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ConfirmMariachi = () => {
  const { mariachis, setMariachis, selectedMariachi, setSelectedMariachi } =
    useMariachiStore();

  const {
    data: mariachisData,
    loading,
    error,
  } = useFetch<Mariachi[]>("/(api)/mariachis");

  useEffect(() => {
    if (mariachisData && Array.isArray(mariachisData)) {
      const markerData = mariachisData.map((mariachi) => ({
        id: mariachi.id,
        mariachi_id: mariachi.mariachi_id,
        name: mariachi.name,
        profile_image_url: mariachi.profile_image_url,
        members: mariachi.members,
        rating: mariachi.rating,
        Mariachilatitude: mariachi.mariachilatitude,
        Mariachilongitude: mariachi.mariachilongitude,
        price: mariachi.price,
        serenadeTime: mariachi.serenade_time,
      }));
      setMariachis(markerData);
    }
  }, [mariachisData, setMariachis]);

  const selectedMariachiData = mariachis.find(
    (mariachi) => mariachi.id === selectedMariachi
  );

  if (loading) {
    return (
      <MariachiLayout title="Choose a Mariachi" snapPoints={["65%", "85%"]}>
        <View className="flex-1 justify-center items-center">
          <Text>Loading mariachis...</Text>
        </View>
      </MariachiLayout>
    );
  }

  if (error) {
    return (
      <MariachiLayout title="Choose a Mariachi" snapPoints={["65%", "85%"]}>
        <View className="flex-1 justify-center items-center">
          <Text>Error loading mariachis: {error}</Text>
        </View>
      </MariachiLayout>
    );
  }

  return (
    <MariachiLayout title="Choose a Mariachi" snapPoints={["50%", "65%"]}>
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
              disabled={!selectedMariachiData}
            />
          </View>
        )}
      />
    </MariachiLayout>
  );
};

export default ConfirmMariachi;
