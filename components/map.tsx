import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useLocationStore, useMariachiStore } from "@/store";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Mariachi, MarkerData } from "@/types/type";
import { useFetch } from "@/lib/fetch";
import { icons } from "@/constants";
import MapViewDirections from "react-native-maps-directions";

const directionsAPI = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const Map = () => {
  const {
    destinationLatitude,
    destinationLongitude,
    userLatitude,
    userLongitude,
  } = useLocationStore();
  const { selectedMariachi, setMariachis } = useMariachiStore();

  const {
    data: mariachis,
    loading,
    error,
  } = useFetch<Mariachi[]>("/(api)/mariachis");
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (Array.isArray(mariachis)) {
      const newMarkers = generateMarkersFromData({
        data: mariachis,
        destinationLatitude: destinationLatitude ?? 0,
        destinationLongitude: destinationLongitude ?? 0,
      });

      setMarkers(newMarkers);
    }
  }, [mariachis, destinationLatitude, destinationLongitude]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        tintColor="black"
        initialRegion={region}
        showsUserLocation={true}
        mapType="mutedStandard"
        showsPointsOfInterest={false}
        userInterfaceStyle="light"
      >
        {markers.map((marker, index) => (
          <Marker
            key={`mariachi-${marker.id || index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            image={
              selectedMariachi === +marker.id
                ? icons.selectedMarker
                : icons.marker
            }
          />
        ))}

        {destinationLatitude && destinationLongitude && (
          <>
            <Marker
              key="destination-marker"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              image={icons.pin}
            />
            <MapViewDirections
              key="directions"
              origin={{
                latitude: userLatitude!,
                longitude: userLongitude!,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={directionsAPI!}
              strokeColor="#0286FF"
              strokeWidth={2}
            />
          </>
        )}
      </MapView>
    </View>
  );
};

export default Map;
