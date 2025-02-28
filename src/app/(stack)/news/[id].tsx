import { AppLoader } from "@/components/atoms/AppLoader";
import { Text } from "@/components/ui/text";
import { getNewInfo } from "@/lib/api/news";
import { SLASH_REPLACE } from "@/lib/constants";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useQuery } from "react-query";

export default function Page() {
  let { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const newDetailsQuery = useQuery({
    queryKey: ["news", id.replaceAll(SLASH_REPLACE, "/")],
    queryFn: () => getNewInfo(id.replaceAll(SLASH_REPLACE, "/")),
  });

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { text, card } = useThemeColor()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[
            { borderBottomWidth: StyleSheet.hairlineWidth ,height:100, backgroundColor: card},
            headerAnimatedStyle,
          ]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View className="flex-row items-center gap-1">
          <TouchableOpacity className="bg-card flex-row items-center justify-center h-[40] w-[40] rounded-[50]">
            <Ionicons name="share-outline" size={22} color={text} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-card flex-row items-center justify-center h-[40] w-[40] rounded-[50]">
            <Ionicons name="heart-outline" size={22} color={text} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          className="bg-card flex-row items-center justify-center h-[40] w-[40] rounded-[50]"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={text} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    } as any;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  if (newDetailsQuery.isLoading)
    return (
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <AppLoader />
      </Animated.ScrollView>
    );

  return (
    <View className="flex-1">
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 105 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{
            uri: newDetailsQuery.data.thumbnail,
          }}
          style={[{ height: IMG_HEIGHT, width }, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View className="bg-card px-3">
          <View>
            <Image
              source={{
                uri: newDetailsQuery.data.thumbnail,
              }}
            />

            <Text className="text-2xl font-bold text-violet-600" style={{
              
            }}>
              {newDetailsQuery.data.title}
            </Text>
            <View>
              <Text>{newDetailsQuery.data.description}</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      <Animated.View
        className="absolute h-[100] bottom-0 left-0 right-0 bg-card py-[10] px-[20]"
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "gray",
        }}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text>€57</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[{}, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={{}}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
const IMG_HEIGHT = 400;
const { width } = Dimensions.get("window");
