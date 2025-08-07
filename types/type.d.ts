import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Mariachi {
  mariachi_id: number;
  name: string;
  profile_image_url: string;
  images: string[];
  members: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  mariachi_image_url: string;
  members: number;
  rating: number;
  name: string;
  price?: string;
}

declare interface MapProps {
  Latitude?: number;
  Longitude?: number;
  onMariachiTimesCalculated?: (mariachisWithTimes: MarkerData[]) => void;
  selectedMariachi?: number | null;
  onMapReady?: () => void;
}

declare interface Booking {
  origin_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_address: string;
  destination_latitude: number;
  destination_longitude: number;
  serenata_time: number;
  price: number;
  payment_status: string;
  driver_id: number;
  user_email: string;
  created_at: string;
  mariachi: {
    name: string;
    members: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  mariachiId: number;
  ETA_time: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface mariachiStore {
  mariachis: MarkerData[];
  selectedMariachi: number | null;
  setSelectedMariachi: (mariachiId: number) => void;
  setMariachis: (mariachis: MarkerData[]) => void;
  clearSelectedMariachi: () => void;
}

declare interface mariachiCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}
