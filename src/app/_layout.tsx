import { CustomStack } from '../components/CustomStack'; // Use your custom stack
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';

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
