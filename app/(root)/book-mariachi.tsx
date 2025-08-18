import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StripeProvider } from "@/lib/stripe";

import MariachiLayout from "@/components/mariachiLayout";
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

  const selectedMariachiData = mariachis.find(
    (mariachi) => mariachi.id === selectedMariachi
  );

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
              No Mariachi Selected
            </Text>
            <Text className="text-lg font-JakartaRegular text-center text-gray-600">
              Please go back and select a mariachi before proceeding with the
              booking.
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
        <View className="p-4">
          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={selectedMariachiFromAPI?.price?.toString() || "0"}
            mariachiId={
              selectedMariachiFromAPI?.mariachi_id ||
              selectedMariachiFromAPI?.id ||
              0
            }
            selectedMariachiData={selectedMariachiFromAPI}
            selectedDate={date}
            onDateChange={setDate}
          />
        </View>
      </MariachiLayout>
    </StripeProvider>
  );
};

export default BookMariachi;
