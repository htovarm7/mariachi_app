import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StripeProvider } from "@stripe/stripe-react-native";

import MariachiLayout from "@/components/mariachiLayout";
import { icons } from "@/constants";
import { useLocationStore, useMariachiStore } from "@/store";
import Payment from "@/components/payment";
import { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { useFetch } from "@/lib/fetch";
import { Mariachi } from "@/types/type";

const BookMariachi = () => {
  const { user } = useUser();
  const { destinationAddress } = useLocationStore();
  const { mariachis, setMariachis, selectedMariachi, setSelectedMariachi } =
    useMariachiStore();

  const {
    data: mariachisData,
    loading,
    error,
  } = useFetch<Mariachi[]>("/(api)/mariachis");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

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

  // Encontrar el mariachi seleccionado
  const selectedMariachiData = mariachis.find(
    (mariachi) => mariachi.id === selectedMariachi
  );

  // También buscar en los datos originales del API
  const selectedMariachiFromAPI = mariachisData?.find(
    (mariachi) => mariachi.id === selectedMariachi
  );
  
  
  if (!selectedMariachi || !selectedMariachiFromAPI) {
    return (
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        merchantIdentifier="merchant.com.mariachi"
        urlScheme="mariachiapp"
      >
        <MariachiLayout title="Book a Mariachi">
          <View className="flex-1 justify-center items-center p-5">
            <Text className="text-xl font-JakartaBold text-center mb-4">
              ⚠️ No hay mariachi seleccionado
            </Text>
            <Text className="text-lg font-JakartaRegular text-center text-gray-600">
              Por favor, regresa y selecciona un mariachi antes de continuar con
              la reserva.
            </Text>
          </View>
        </MariachiLayout>
      </StripeProvider>
    );
  }

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.com.mariachi"
      urlScheme="mariachiapp"
    >
      <MariachiLayout title="Book a Mariachi">
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Mariachi Information
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-10">
            <Image
              source={{
                uri:
                  selectedMariachiFromAPI?.profile_image_url ||
                  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com.mx%2Filustraciones%2Fmariachi&psig=AOvVaw3S2txydvyCZr65NPBc6Cua&ust=1754797627360000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLj52dvo_I4DFQAAAAAdAAAAABAE",
              }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {selectedMariachiFromAPI?.name || "No mariachi seleccionado"}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular">
                  {selectedMariachiFromAPI?.rating || "0"}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">
                Serenade Price
              </Text>
              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                ${selectedMariachiFromAPI?.price || "0"}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Members</Text>
              <Text className="text-lg font-JakartaRegular">
                {selectedMariachiFromAPI?.members || "0"}
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
          <View className="flex flex-col w-full items-start justify-center mt-2 space-y-4">
            <Text className="text-xl font-JakartaBold font-bold">
              Fecha y hora de la reserva
            </Text>

            <View className="flex flex-row items-center justify-between w-full">
              <View className="flex-1 mr-2">
                <Text className="text-lg font-JakartaRegular mb-2">Fecha:</Text>
                <Text
                  onPress={() => setShowDatePicker(true)}
                  className="text-lg font-JakartaMedium p-3 bg-general-600 rounded-xl"
                >
                  {date.toLocaleDateString()}
                </Text>
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-lg font-JakartaRegular mb-2">Hora:</Text>
                <Text
                  onPress={() => setShowTimePicker(true)}
                  className="text-lg font-JakartaMedium p-3 bg-general-600 rounded-xl"
                >
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>

            {(showDatePicker || showTimePicker) && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={showDatePicker ? "date" : "time"}
                is24Hour={true}
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </View>
          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={selectedMariachiFromAPI?.price?.toString() || "0"}
            mariachiId={
              selectedMariachiFromAPI?.mariachi_id ||
              selectedMariachiFromAPI?.id ||
              0
            }
          />
        </>
      </MariachiLayout>
    </StripeProvider>
  );
};

export default BookMariachi;
