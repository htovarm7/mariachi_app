import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
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
        minLength={2}
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}
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
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
            maxHeight: 200,
          },
        }}
        onPress={(data, details = null) => {
          console.log("Selected place:", data, details);
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
          types: "establishment|geocode",
          components: "country:us|country:mx",
        }}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]}
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
          placeholder: initialLocation ?? "Where is going to be the serenade?",
          autoCorrect: false,
          autoCapitalize: "none",
        }}
        predefinedPlaces={[]}
        nearbyPlacesAPI="GooglePlacesSearch"
        GooglePlacesDetailsQuery={{
          fields: "formatted_address,geometry",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
