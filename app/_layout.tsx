import '@/services/firebase';
import axios from 'axios';
import { Stack, useRouter, useSegments } from 'expo-router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	const segments = useSegments();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			setUser(user);
			if (initializing) setInitializing(false);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		const syncUser = async () => {
			if (!user) return;

			try {
				await axios.post('https://<your-backend>/api/sync-user', {
					uid: user.uid,
					email: user.email,
				});
			} catch (error) {
				console.error('Error syncing user with backend:', error);
			}
		};

		syncUser();
	}, [user]);

	useEffect(() => {
		if (initializing) return;

		const inAuthGroup = segments[0]?.startsWith('(auth)');

		if (!user && inAuthGroup) {
			router.replace('/');
		} else if (user && !inAuthGroup) {
			router.replace('/(auth)/home');
		}
	}, [user, initializing]);

	if (initializing) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Login' }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	);
}
