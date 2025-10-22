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
    <CustomStack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
        gestureDirection: isRTL ? 'horizontal' : 'horizontal-inverted',
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
        }}
      />
    </CustomStack>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StackNavigator />
    </LanguageProvider>
  );
}
