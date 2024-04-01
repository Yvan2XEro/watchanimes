import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { Audio, Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function watch() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShow: true,
      headerTransparent: true,
    });
  }, []);
  return (
    <View style={{ top }}>
      <Video className="w-full" />

      <Text>gh</Text>
    </View>
  );
}
