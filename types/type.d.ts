import { TextInputProps, TouchableOpacityProps } from "react-native";

// Interface for the mariachi
declare interface Mariachi {
  id: number;
  mariachi_id: number;
  name: string;
  profile_image_url: string;
  members: number;
  rating: number;
  serenata_time: number;
  price: number;
  latitude: number;
  longitude: number;
}

// Data that will appear on the map
declare interface MarkerData {
  Mariachilatitude: number;
  Mariachilongitude: number;
  id: number;
  members: number;
  profile_image_url: string;
  rating: number;
  name: string;
}

// Props for the map component
declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  selectedMariachi?: number | null;
  onMapReady?: () => void;
}

declare interface Booking {
  destination_address: string;
  destination_latitude: number;
  destination_longitude: number;
  serenata_time: number;
  price: number;
  payment_status: string;
  mariachi_id: number;
  user_email: string;
  created_at: string;
  reserved_at: string;
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
