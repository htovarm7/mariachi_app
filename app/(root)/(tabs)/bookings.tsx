import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { images } from "@/constants";
import { Booking } from "@/types/type";
import MariachiCard from "@/components/mariachiCard";

const { user } = useUser();
const { data: recent_books, loading } = useFetch<Booking[]>(
  user?.id ? `/(api)/booking/${user.id}` : ""
);

const Bookings = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <FlatList
        data={recent_books}
        renderItem={({ item }) => <MariachiCard Booking={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent bookings"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent bookings found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <Text className="text-2xl font-FunnelSansBold">All Bookings</Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Bookings;
