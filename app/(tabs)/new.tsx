import React from 'react';
import { Text, Image, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/index';
import { newStyles } from '@/styles/new';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname } from 'expo-router';
import COMING_SOON_DATA from '@/data/new.json';
import { useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';

interface ComingSoonItem {
    id: string;
    imageUrl: string;
    logo: string;
    logoWidth: number;
    logoHeight: number;
    subText: string;
    type?: string;
    description: string;
    rated: string;
}

const TAB_OPTIONS = [
    {
        id: 'coming-soon',
        icon: require('../../assets/images/replace-these/coming-soon.png'),
        label: 'Coming Soon',
    },
    {
        id: 'everyone-watching',
        icon: require('../../assets/images/replace-these/everyone-watching.webp'),
        label: "Everyone's Watching"
    },
    {
        id: 'top-10-shows',
        icon: require('../../assets/images/replace-these/top10.png'),
        label: 'Top 10 TV Shows'
    },
    {
        id: 'top-10-movies',
        icon: require('../../assets/images/replace-these/top10.png'),
        label: 'Top 10 Movies'
    }
];

export default function NewScreen() {
    const pathname = usePathname();
    const isActive = pathname === '/new';



    const currentTabIndex = TAB_SCREENS.findIndex(screen =>
        screen.name === 'new'
    );
    const activeTabIndex = TAB_SCREENS.findIndex(screen =>
        pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
    );

    const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';

    const router = useRouter();
    const insets = useSafeAreaInsets();
    const scrollY = useSharedValue(0);
    const [activeTab, setActiveTab] = React.useState('coming-soon');

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const scrollViewRef = useRef(null);
    useScrollToTop(scrollViewRef);

    const renderComingSoonItem = (item: ComingSoonItem) => (
        <View key={item.id} style={newStyles.comingSoonItem}>


            <View style={newStyles.contentContainer}>
                <View style={newStyles.previewCard}>
                    <View style={newStyles.ratedContainer}>
                        <Text style={newStyles.rated}>{item.rated}</Text>
                    </View>

                    <Pressable
                        style={newStyles.soundButton}
                    >
                        <Ionicons
                            name={"volume-mute"}
                            size={18}
                            color="white"
                        />
                    </Pressable>

                    <ExpoImage
                        source={{ uri: item.imageUrl }}
                        style={newStyles.previewImage}
                        cachePolicy="memory-disk"
                        transition={200}
                    />

                </View>


                <View style={newStyles.featuredContainer}>

                    <View style={{ gap: 6, }}>
                        <ExpoImage
                            source={{ uri: item.logo }}
                            style={{ width: item.logoWidth, height: item.logoHeight, marginRight: 4, marginLeft: 12 }}
                            cachePolicy="memory-disk"
                            transition={200}
                        />

                    </View>

                </View>

                <View style={newStyles.titleContainer}>
                    <Text style={newStyles.eventDate}>{item.subText}</Text>


                    {item.type && (<>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: 2 }}>
                            <ExpoImage
                                source={{ uri: 'https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png' }}
                                style={{ width: 20, height: 20, top: -4, position: 'absolute', left: 0 }}
                                cachePolicy="memory-disk"
                                transition={200}
                            />
                            {item.type && <Text style={newStyles.netflixTag}>{item.type}</Text>}
                        </View>
                        {/* <Text style={newStyles.title}>{item.title}</Text> */}

                    </>)}

                    <Text style={newStyles.description}>{item.description}</Text>
                </View>

                <View style={newStyles.actionButtons}>
                    <Pressable style={newStyles.actionButton}>
                        <Ionicons name="notifications-outline" size={20} color="#000" />
                        <Text style={newStyles.actionButtonText}>Remind Me</Text>
                    </Pressable>

                </View>
            </View>
        </View>
    );

    const renderTab = (tab: typeof TAB_OPTIONS[0]) => (
        <Pressable
            key={tab.id}
            style={[newStyles.categoryTab, activeTab === tab.id && newStyles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
        >
            <ExpoImage
                source={tab.icon}
                style={[newStyles.tabIcon]}
                cachePolicy="memory-disk"
            />
            <Text style={[
                newStyles.categoryTabText,
                activeTab === tab.id && newStyles.activeTabText
            ]}>
                {tab.label}
            </Text>
        </Pressable>
    );

    return (
        <TabScreenWrapper isActive={isActive} slideDirection={slideDirection}>
            <View style={newStyles.container}>
                <StatusBar style="light" />
                <SafeAreaView>
                    <View style={[newStyles.header]}>
                        <View style={newStyles.headerContent}>
                            <Text style={newStyles.headerTitle}>New & Hot</Text>
                            <View style={newStyles.headerRight}>
                                <Pressable onPress={() => router.push('/downloads')}>
                                    {/* Replace this with actual Netflix download icon, I am using this placeholder for now */}
                                    <ExpoImage
                                        source={require('../../assets/images/replace-these/download-netflix-icon.png')}
                                        style={{ width: 24, height: 24 }}
                                        cachePolicy="memory-disk"
                                        contentFit="contain"
                                    />
                                </Pressable>
                                <Pressable onPress={() => router.push('/search')}>
                                    <Ionicons name="search" size={24} color="#fff" />
                                </Pressable>
                            </View>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={newStyles.categoryTabs}
                        >
                            {TAB_OPTIONS.map(renderTab)}
                        </ScrollView>
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* 

                        <View style={newStyles.activeTabContainer}>

                            <Image
                                source={{ uri: TAB_OPTIONS[0].icon }}
                                style={newStyles.activeTabIcon}
                            />
                            <Text style={newStyles.activeTabTitle}>Coming Soon</Text>
                        </View> */}



                        <View style={newStyles.comingSoonList}>
                            {COMING_SOON_DATA.events.map(renderComingSoonItem)}
                        </View>
                    </ScrollView>
                </SafeAreaView>

            </View>
        </TabScreenWrapper>
    );
}


