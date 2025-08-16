import { icons } from "@/constants";
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
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl mb-3 mx-5 shadow-sm`}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        className="w-16 h-16 rounded-lg"
        resizeMode="cover"
      />

      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        <View className="flex flex-row items-center justify-start mb-1">
          <Text
            className={`text-xl font-JakartaMedium ${
              selected === item.id ? "text-black" : "text-general-800"
            }`}
          >
            {item.name}
          </Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.star} className="w-3.5 h-3.5" />
            <Text
              className={`text-lg font-JakartaRegular ${
                selected === item.id ? "text-black" : "text-general-800"
              }`}
            >
              {item.rating}
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start mb-1">
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text
              className={`text-xl font-JakartaMedium ml-1 ${
                selected === item.id ? "text-black" : "text-general-800"
              }`}
            >
              ${item.price}
            </Text>
          </View>

          <Text
            className={`text-lg font-JakartaRegular mx-2 ${
              selected === item.id ? "text-black" : "text-general-800"
            }`}
          >
            |
          </Text>

          <Text
            className={`text-lg font-JakartaRegular ${
              selected === item.id ? "text-black" : "text-general-800"
            }`}
          >
            {item.members} miembros
          </Text>
        </View>

        <View className="flex flex-row items-center justify-start">
          <Text
            className={`text-sm font-JakartaRegular ${
              selected === item.id ? "text-black font-bold" : "text-general-600"
            }`}
          >
            ⏱️ {item.serenadeTime} min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupMariachiCard;
