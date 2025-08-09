import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import OAuth from "@/components/OAuth";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, ScrollView, View, Image, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { icons } from "@/constants/index";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      //console.error(JSON.stringify(err, null, 2));
      let errorMessage = "Error al iniciar sesión";

      if (err.errors && err.errors.length > 0) {
        const errorCode = err.errors[0].code;

        if (errorCode === "form_password_incorrect") {
          errorMessage = "Contraseña incorrecta";
        } else if (errorCode === "form_identifier_not_found") {
          errorMessage = "Email no encontrado";
        } else if (errorCode === "form_password_pwned") {
          errorMessage =
            "Esta contraseña ha sido comprometida, por favor usa otra";
        } else {
          errorMessage = err.errors[0].message || "Error al iniciar sesión";
        }
      }

      Alert.alert("Error", errorMessage, [{ text: "OK" }]);
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={icons.bg_guitar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-white font-FunnelSansSemiBold absolute bottom-5 left-5">
            {" "}
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.password}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don&apost have an account?</Text>
            <Text className="text-primary-500"> Sign Up</Text>
          </Link>
        </View>

        {/* Verifcation Mode*/}
      </View>
    </ScrollView>
  );
};

export default SignIn;
