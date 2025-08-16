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
import { useFetch } from "@/lib/fetch";

const Home = () => {
  const {
    setUserLocation,
    setDestinationLocation,
    userLatitude,
    userLongitude,
  } = useLocationStore();
  const { user } = useUser();
  const { signOut } = useAuth();

  const { recent_books, loading } = useFetch(`/(api)/booking/${user?.id}`);

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
