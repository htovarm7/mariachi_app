import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@/lib/stripe";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import CustomButton from "@/components/customButton";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  mariachiId,
  selectedMariachiData,
  selectedDate = new Date(),
  onDateChange,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { destinationLatitude, destinationAddress, destinationLongitude } =
    useLocationStore();

  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      if (onDateChange) {
        onDateChange(selectedDate);
      }
    }
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const openPaymentSheet = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Payment Simulation",
        "On web, payment is simulated. In production, integrate with Stripe Web SDK.",
        [
          {
            text: "Simulate Success",
            onPress: async () => {
              try {
                await fetchAPI("/(api)/booking/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    destination_address: destinationAddress,
                    destination_latitude: destinationLatitude,
                    destination_longitude: destinationLongitude,
                    price: parseInt(amount) * 100,
                    payment_status: "paid",
                    mariachi_id: mariachiId,
                    user_id: userId,
                    reserved_at: date.toISOString(),
                    serenade_time: selectedMariachiData?.serenade_time || 60,
                  }),
                });
                setSuccess(true);
              } catch (error) {
                Alert.alert("Error", "Failed to create booking");
              }
            },
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
      return;
    }

    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    if (Platform.OS === "web") return;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "usd",
        },
        confirmHandler: async (
          paymentMethod: any,
          shouldSavePaymentMethod: any,
          intentCreationCallback: any
        ) => {
          const { paymentIntent, customer } = await fetchAPI(
            "/(api)/(stripe)/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: fullName || email.split("@")[0],
                email: email,
                amount: amount,
                paymentMethodId: paymentMethod.id,
              }),
            }
          );

          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI("/(api)/(stripe)/pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
                client_secret: paymentIntent.client_secret,
              }),
            });

            if (result.client_secret) {
              await fetchAPI("/(api)/booking/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  destination_address: destinationAddress,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  price: parseInt(amount) * 100,
                  payment_status: "paid",
                  mariachi_id: mariachiId,
                  user_id: userId,
                  created_at: new Date().toISOString(),
                  reserved_at: date.toISOString(),
                  serenade_duration: selectedMariachiData?.serenade_time || 60,
                }),
              });

              intentCreationCallback({
                clientSecret: result.client_secret,
              });
            }
          }
        },
      },
      returnURL: "myapp://book-mariachi",
    });

    if (!error) {
      // setLoading(true);
    }
  };

  return (
    <>
      {/* Mariachi Information Section */}
      {selectedMariachiData && (
        <View className="p-4 mb-4">
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Mariachi Selected
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-4">
            <Image
              source={{
                uri:
                  selectedMariachiData.profile_image_url ||
                  "https://via.placeholder.com/150",
              }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {selectedMariachiData.name}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular">
                  {selectedMariachiData.rating}
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
                ${selectedMariachiData.price}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Members</Text>
              <Text className="text-lg font-JakartaRegular">
                {selectedMariachiData.members}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-t border-white py-3">
              <Text className="text-lg font-JakartaRegular">Duration</Text>
              <Text className="text-lg font-JakartaRegular">
                {selectedMariachiData.serenade_time} min
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

          <View className="flex flex-col w-full items-start justify-center mt-5 space-y-4">
            <Text className="text-xl font-JakartaBold">
              Fecha y hora de la serenata
            </Text>

            <View className="flex flex-row items-center justify-between w-full">
              <View className="flex-1 mr-2">
                <Text className="text-lg font-JakartaRegular mb-2">Fecha:</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text className="text-lg font-JakartaMedium p-3 bg-general-600 rounded-xl">
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-lg font-JakartaRegular mb-2">Hora:</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                  <Text className="text-lg font-JakartaMedium p-3 bg-general-600 rounded-xl">
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>
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
        </View>
      )}

      <CustomButton
        title="Confirm Booking"
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={icons.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
