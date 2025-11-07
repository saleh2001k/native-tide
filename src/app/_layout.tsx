import { TransitionPresets } from '@react-navigation/stack';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { CustomStack } from '../components/CustomStack'; // Use your custom stack
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
if (process.env.NODE_ENV === 'development') {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  import('../devtools/ReactotronConfig');
}

function StackNavigator() {
  const { isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      <CustomStack
        screenOptions={{
          headerStyle: {
            // backgroundColor: 'red',
          },
          // animation: 'slide_from_right',
          gestureDirection: isRTL ? 'horizontal-inverted' : 'horizontal',
        }}
      >
        <CustomStack.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: true,
          }}
        />
        <CustomStack.Screen
          name="about"
          options={{
            title: 'About',
            headerShown: true,
            presentation: 'modal',
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: 'transparent' },
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </CustomStack>
    </View>
  );
}

{
  /* <ModalStack.Navigator
initialRouteName="RootStack"
detachInactiveScreens={shouldDetachInactiveScreens}
screenOptions={({ route: _route, navigation: _navigation }) => ({
  headerShown: false,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'transparent' },
  presentation: 'modal',
  // NOTE(brentvatne): it is unclear what this was intended for, it doesn't appear to be needed?
  // headerStatusBarHeight: navigation.getState().routes.indexOf(route) > 0 ? 0 : undefined,
  ...TransitionPresets.ModalPresentationIOS,
})}> */
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StackNavigator />
    </LanguageProvider>
  );
}
const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
}));
