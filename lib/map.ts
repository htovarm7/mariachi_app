import { Mariachi, MarkerData } from "@/types/type";

export const generateMarkersFromData = ({
  data,
  destinationLatitude,
  destinationLongitude,
}: {
  data: Mariachi[];
  destinationLatitude: number;
  destinationLongitude: number;
}): MarkerData[] => {
  return data.map((mariachi) => {
    const mariachiLat = mariachi.mariachilatitude || destinationLatitude;
    const mariachiLng = mariachi.mariachilongitude || destinationLongitude;

    return {
      id: mariachi.mariachi_id,
      Mariachilatitude: mariachiLat,
      Mariachilongitude: mariachiLng,
      members: mariachi.members,
      profile_image_url: mariachi.profile_image_url,
      rating: mariachi.rating,
      name: mariachi.name,
    };
  });
};

export const calculateRegion = ({
  destinationLatitude,
  destinationLongitude,
  selectedMariachiLatitude,
  selectedMariachiLongitude,
  userLatitude,
  userLongitude,
}: {
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
  selectedMariachiLatitude?: number | null;
  selectedMariachiLongitude?: number | null;
  userLatitude?: number | null;
  userLongitude?: number | null;
}) => {
  if (
    selectedMariachiLatitude &&
    selectedMariachiLongitude &&
    destinationLatitude &&
    destinationLongitude
  ) {
    const latitudeDelta =
      Math.abs(selectedMariachiLatitude - destinationLatitude) * 1.5 + 0.01;
    const longitudeDelta =
      Math.abs(selectedMariachiLongitude - destinationLongitude) * 1.5 + 0.01;

    const latitude = (selectedMariachiLatitude + destinationLatitude) / 2;
    const longitude = (selectedMariachiLongitude + destinationLongitude) / 2;

    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }

  if (destinationLatitude && destinationLongitude) {
    return {
      latitude: destinationLatitude,
      longitude: destinationLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (selectedMariachiLatitude && selectedMariachiLongitude) {
    return {
      latitude: selectedMariachiLatitude,
      longitude: selectedMariachiLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (userLatitude && userLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  return {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
};
