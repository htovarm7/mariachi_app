import { Booking } from "@/types/type";
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
}) => (
  <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
    <Text className="text-3xl">{mariachi.name}</Text>
  </View>
);

export default MariachiCard;
