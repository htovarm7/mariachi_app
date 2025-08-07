import Bookings from "@/app/(root)/(tabs)/bookings";
import { icons } from "@/constants";
import { Booking } from "@/types/type";
import { Text, View, Image } from "react-native";
import { formatDate, formatTime } from "@/lib/utils";

const MariachiCard = ({
  Booking: {
    destination_latitude,
    destination_longitude,
    destination_address,
    origin_address,
    created_at,
    mariachi,
    payment_status,
    serenata_time,
  },
}: {
  Booking: Booking;
}) => {
  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: mapUrl,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-FunnelSansMedium" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-FunnelSansMedium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              {formatDate(created_at)}, {formatTime(serenata_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              Mariachi
            </Text>
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              {mariachi.name}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              Members
            </Text>
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              {mariachi.members}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-FunnelSansMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md mr-2 capitalize font-FunnelSansMedium text-gray-500 ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MariachiCard;
