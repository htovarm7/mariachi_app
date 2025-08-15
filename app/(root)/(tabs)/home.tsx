import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MariachiCard from "@/components/mariachiCard";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { icons, images } from "@/constants";
import GoogleTextInput from "@/components/googleTextInput";
import Map from "@/components/map";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Calendar from "expo-calendar";
import { router } from "expo-router";

const recent_books = [
  {
    serenade_id: "1",
    origin_address: "Coyoacán, Ciudad de México",
    origin_latitude: 19.35529,
    origin_longitude: -99.16207,
    destination_address: "Santa Fe, Ciudad de México",
    destination_latitude: 19.3032,
    destination_longitude: -99.2106,
    serenata_time: 45,
    price: 3500.0,
    payment_status: "paid",
    mariachi_id: 2,
    user_id: "1",
    user_email: "user@example.com",
    created_at: "2025-08-02 20:35:12",
    mariachi: {
      mariachi_id: "2",
      name: "Mariachi Los Dorados",
      lead_singer: "Carlos Rivera",
      profile_image_url: "",
      group_image_url: "",
      members: 7,
      rating: "4.85",
    },
  },
  {
    serenade_id: "2",
    origin_address: "Centro Histórico, Guadalajara",
    origin_latitude: 20.6736,
    origin_longitude: -103.344,
    destination_address: "Zapopan, Jalisco",
    destination_latitude: 20.7236,
    destination_longitude: -103.3848,
    serenata_time: 60,
    price: 4200.0,
    payment_status: "paid",
    mariachi_id: 1,
    user_id: "1",
    user_email: "user@example.com",
    created_at: "2025-08-02 21:15:47",
    mariachi: {
      mariachi_id: "1",
      name: "Mariachi Sol de México",
      lead_singer: "José Hernández",
      profile_image_url: "",
      group_image_url: "",
      members: 6,
      rating: "4.90",
    },
  },
  {
    serenade_id: "3",
    origin_address: "Colonia Roma, CDMX",
    origin_latitude: 19.4164,
    origin_longitude: -99.1622,
    destination_address: "Polanco, CDMX",
    destination_latitude: 19.4326,
    destination_longitude: -99.197,
    serenata_time: 30,
    price: 2800.0,
    payment_status: "paid",
    mariachi_id: 1,
    user_id: "1",
    user_email: "user@example.com",
    created_at: "2025-08-03 09:02:11",
    mariachi: {
      mariachi_id: "1",
      name: "Mariachi Sol de México",
      lead_singer: "José Hernández",
      profile_image_url: "",
      group_image_url: "",
      members: 6,
      rating: "4.90",
    },
  },
  {
    serenade_id: "4",
    origin_address: "San Pedro Garza García, NL",
    origin_latitude: 25.6508,
    origin_longitude: -100.4044,
    destination_address: "Monterrey Centro, NL",
    destination_latitude: 25.6866,
    destination_longitude: -100.3161,
    serenata_time: 40,
    price: 3100.0,
    payment_status: "paid",
    mariachi_id: 3,
    user_id: "1",
    user_email: "user@example.com",
    created_at: "2025-08-03 11:20:34",
    mariachi: {
      mariachi_id: "3",
      name: "Mariachi Viva México",
      lead_singer: "Alejandro López",
      profile_image_url: "",
      group_image_url: "",
      members: 5,
      rating: "4.70",
    },
  },
];

const Home = () => {
  const {
    setUserLocation,
    setDestinationLocation,
    userLatitude,
    userLongitude,
  } = useLocationStore();
  const { user } = useUser();
  const { signOut } = useAuth();
  const loading = false;

  const [hasPermissions, setHasPermission] = useState<boolean>(false);

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/confirm-mariachi");
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setHasPermission(false);
          return;
        }

        setHasPermission(true);
        let location = await Location.getCurrentPositionAsync({});

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords?.latitude!,
          longitude: location.coords?.longitude!,
        });

        setUserLocation({
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          address: `${address[0].name}, ${address[0].region}`,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recent_books?.slice(0, 5)}
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
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.firstName || "User"}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            {hasPermissions && userLatitude && userLongitude && (
              <>
                <Text className="text-xl font-JakartaBold mt-5 mb-3">
                  Your current location
                </Text>
                <View className="flex flex-row items-center bg-transparent h-[300px]">
                  <Map />
                </View>
              </>
            )}

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Bookings
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
