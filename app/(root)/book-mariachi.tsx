import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import MariachiLayout from "@/components/mariachiLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useLocationStore } from "@/store";

const BookRide = () => {
  const { user } = useUser();
  const { destinationAddress } = useLocationStore();
  const { mariachi } = useLocalSearchParams();

  const MariachiDetails = mariachi ? JSON.parse(mariachi as string) : null;

  return (
    <MariachiLayout title="Book Ride">
      <>
        <Text className="text-xl font-JakartaSemiBold mb-3">
          Mariachi Information
        </Text>

        <View className="flex flex-col w-full items-center justify-center mt-10">
          <Image
            source={{
              uri:
                MariachiDetails?.profile_image_url ||
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com.mx%2Filustraciones%2Fmariachi&psig=AOvVaw3S2txydvyCZr65NPBc6Cua&ust=1754797627360000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLj52dvo_I4DFQAAAAAdAAAAABAE",
            }}
            className="w-28 h-28 rounded-full"
          />

          <View className="flex flex-row items-center justify-center mt-5 space-x-2">
            <Text className="text-lg font-JakartaSemiBold">
              {MariachiDetails?.name}
            </Text>

            <View className="flex flex-row items-center space-x-0.5">
              <Image
                source={icons.star}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-JakartaRegular">
                {MariachiDetails?.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Ride Price</Text>
            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
              ${MariachiDetails?.price}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full py-3">
            <Text className="text-lg font-JakartaRegular">Members</Text>
            <Text className="text-lg font-JakartaRegular">
              {MariachiDetails?.members}
            </Text>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {destinationAddress}
            </Text>
          </View>
        </View>
      </>
    </MariachiLayout>
  );
};

export default BookRide;
