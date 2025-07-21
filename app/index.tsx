import SignIn from '@/components/signIn';
import SignUp from '@/components/signUp';
import '@/services/firebase';
import {
	View
} from 'react-native';


export default function Index() {


	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, gap: 20 }}>
			<SignIn />
			<SignUp />
		</View>
	);
}
