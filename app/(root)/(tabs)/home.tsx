import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text } from "react-native";
import MariachiCard from "@/components/mariachiCard";

const recent_books = [
  {
    serenade_id: "1",
    origin_address: "Coyoacán, Ciudad de México",
    origin_latitude: "19.35529",
    origin_longitude: "-99.16207",
    destination_address: "Centro Histórico, Ciudad de México",
    destination_latitude: "19.432608",
    destination_longitude: "-99.133209",
    serenade_duration: 45,
    serenade_price: "3500.00",
    payment_status: "paid",
    mariachi_id: 2,
    user_id: "1",
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
    origin_latitude: "20.6736",
    origin_longitude: "-103.344",
    destination_address: "Zapopan, Jalisco",
    destination_latitude: "20.7236",
    destination_longitude: "-103.384",
    serenade_duration: 60,
    serenade_price: "4200.00",
    payment_status: "paid",
    mariachi_id: 1,
    user_id: "1",
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
    origin_latitude: "19.4164",
    origin_longitude: "-99.1622",
    destination_address: "Polanco, CDMX",
    destination_latitude: "19.4326",
    destination_longitude: "-99.1970",
    serenade_duration: 30,
    serenade_price: "2800.00",
    payment_status: "paid",
    mariachi_id: 1,
    user_id: "1",
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
    origin_latitude: "25.6508",
    origin_longitude: "-100.4044",
    destination_address: "Monterrey, NL",
    destination_latitude: "25.6866",
    destination_longitude: "-100.3161",
    serenade_duration: 40,
    serenade_price: "3100.00",
    payment_status: "paid",
    mariachi_id: 3,
    user_id: "1",
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
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recent_books?.slice(0, 5)}
        renderItem={({ item }) => <MariachiCard Booking={item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
