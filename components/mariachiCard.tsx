import { icons } from "@/constants";
import { Booking } from "@/types/type";
import { Image } from "expo-image";
import { Text, View } from "react-native";

const MariachiCard = ({
  Booking: {
    destination_latitude,
    destination_longitude,
    destination_address,
    origin_address,
    created_at,
    mariachi,
    payment_status,
  },
}: {
  Booking: Booking;
}) => {
  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-row items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: mapUrl,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons} className="w-5 h-5" />
              <Text className="text-md font-FunnelSansMedium">
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons} className="w-5 h-5" />
              <Text className="text-md font-FunnelSansMedium">
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text className="text-3xl">{mariachi.name}</Text>
    </View>
  );
};

export default MariachiCard;
