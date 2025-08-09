import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useEffect, useState } from "react";
import { View } from "react-native";

const safeNumber = (v: any) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const normalizeRegion = (r: any) => {
  if (!r) return null;
  const latitude = safeNumber(r.latitude ?? r.lat ?? r.latitud ?? r[0]);
  const longitude = safeNumber(r.longitude ?? r.lng ?? r.lon ?? r[1]);
  const latitudeDelta = safeNumber(r.latitudeDelta ?? r.latDelta) ?? 0.01;
  const longitudeDelta = safeNumber(r.longitudeDelta ?? r.lngDelta) ?? 0.01;
  if (latitude == null || longitude == null) return null;
  return { latitude, longitude, latitudeDelta, longitudeDelta };
};

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const defaultRegion = {
    latitude: 25.760100122034252,
    longitude: -100.27985036858885,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [region, setRegion] = useState(defaultRegion);

  useEffect(() => {
    const uLat = safeNumber(userLatitude);
    const uLng = safeNumber(userLongitude);
    if (uLat == null || uLng == null) {
      return; // coords inválidos, no actualizar región
    }

    const rawRegion = calculateRegion?.({
      userLatitude: uLat,
      userLongitude: uLng,
      destinationLatitude: safeNumber(destinationLatitude),
      destinationLongitude: safeNumber(destinationLongitude),
    });

    const newRegion = normalizeRegion(rawRegion) ?? {
      latitude: uLat,
      longitude: uLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="mutedStandard"
      />
    </View>
  );
};

export default Map;
