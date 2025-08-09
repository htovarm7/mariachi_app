import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { mariachiCardProps } from "@/types/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const GroupMariachiCard = ({
  item,
  selected,
  setSelected,
}: mariachiCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.id ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        <View className="flex flex-row items-center justify-start mb-1">
          <Text className="text-xl font-JakartaRegular">{item.name}</Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.star} className="w-3.5 h-3.5" />
            <Text className="text-lg font-JakartaRegular">{item.rating}</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text className="text-xl font-JakartaRegular ml-1">
              ${item.price}
            </Text>
          </View>

          <Text className="text-lg font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-lg font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-lg font-JakartaRegular text-general-800">
            {item.members} members
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupMariachiCard;
