import { Tabs } from "expo-router";
import { View, Image } from "react-native";

const TabIcon = () => (
  <View>
    <View>
      <Image />
    </View>
  </View>
);

const Layout = () => {
  <Tabs
    initialRouteName="index"
    screenOptions={{ tabBarActiveTintColor: "white" }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            source={require("../../../assets/icons/Icon.png")}
          />
        ),
      }}
    />
  </Tabs>;
};

export default Layout;
