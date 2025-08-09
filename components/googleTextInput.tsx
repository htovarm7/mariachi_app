import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  // Verificar que la API key existe
  if (!googlePlacesApiKey) {
    console.warn("Google Places API Key no está configurada");
    return null;
  }

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        minLengthAutocomplete={2}
        enablePoweredByContainer={false}
        listEmptyComponent={() => null}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "absolute",
            top: 50,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
            maxHeight: 200,
          },
        }}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            handlePress({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            });
          }
        }}
        onFail={(error) => {
          console.log("GooglePlacesAutocomplete Error:", error);
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
          types: "establishment|geocode",
          components: "country:mx", // Limitar a México si es relevante
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where the serenade?",
          returnKeyType: "search",
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]}
        predefinedPlaces={[]}
      />
    </View>
  );
};

export default GoogleTextInput;
