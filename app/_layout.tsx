import '@/services/firebase';
import { Stack } from 'expo-router';
import { getAuth } from 'firebase/auth';


export default function RootLayout() {
	if (!getAuth().currentUser) {
		return (
			<Stack>
				<Stack.Screen name="index" options={{ title: 'Login' }} />
			</Stack>
		);
	}
	return (
		<Stack>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	);
}
