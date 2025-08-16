import { Platform } from "react-native";

let useStripe: any;
let StripeProvider: any;

if (Platform.OS !== "web") {
  const stripe = require("@stripe/stripe-react-native");
  useStripe = stripe.useStripe;
  StripeProvider = stripe.StripeProvider;
} else {
  useStripe = () => ({
    initPaymentSheet: async () => ({ error: null }),
    presentPaymentSheet: async () => ({ error: null }),
  });

  StripeProvider = ({ children }: { children: React.ReactNode }) => children;
}

export { useStripe, StripeProvider };
