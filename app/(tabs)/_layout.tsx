import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Platform, StyleSheet, Image, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useUser } from '@/contexts/UserContext';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { Home } from '@/icons/Home';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image as ExpoImage } from 'expo-image';

// Helper component for cross-platform icons
function TabIcon({ ionIcon, color }: { ionIcon: 'person' | 'home-sharp' | 'play-square'; color: string }) {
  return <TabBarIcon name={ionIcon} color={color} />;
}

// Netflix profile image component
function ProfileImage({ focused }: { focused: boolean }) {
  const { selectedProfile } = useUser();

  return (
    <React.Fragment>
      <ExpoImage
        source={{ uri: selectedProfile?.avatar }}
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          opacity: focused ? 1 : 0.5,
          borderWidth: 2,
          borderColor: focused ? 'white' : 'transparent',
        }}
        cachePolicy="memory-disk"
        transition={200}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -20,
          alignSelf: 'center',
          width: 5,
          height: 5,
          borderRadius: 2,
          backgroundColor: '#db0000',
        }}
      />
    </React.Fragment>
  );
}

export const TAB_SCREENS = [
  {
    name: 'index',
    title: 'Home',
    icon: ({ color, focused }: { color: string; focused: boolean }) => (
      <Home color={color} isActive={focused} />
    ),
  },
  {
    name: 'new',
    title: 'New & Hot',
    icon: ({ color, focused }: { color: string; focused: boolean }) => (
      <ExpoImage
        source={focused ? require('../../assets/images/replace-these/new-netflix.png') : require('../../assets/images/replace-these/new-netflix-outline.png')}
        style={{ width: 24, height: 24 }}
        cachePolicy="memory-disk"
        contentFit="contain"
      />
    ),
  },
  {
    name: '(profile)/profile',
    title: 'My Netflix',
    icon: ({ focused }: { focused: boolean }) => (
      <ProfileImage focused={focused} />
    ),
  },
];

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
  }
});

export default function TabLayout() {
  const pathname = usePathname();
  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#ffffff3f',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 84,
          paddingTop: 0,
          paddingBottom: 30,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={99}
            style={styles.blurView}
          />
        ),
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={(e) => {
              handleTabPress();
              props.onPress?.(e);
            }}
          />
        ),
      }}>
      {TAB_SCREENS.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: screen.icon,
          }}
        />
      ))}

    </Tabs>
  );
}
