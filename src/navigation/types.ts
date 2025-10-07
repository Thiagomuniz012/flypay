import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  LoginWithSession: undefined;
  ConnectAccount: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

