import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import Animated from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function search() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: ()=><AppSearchbar onGoback={() => navigation.goBack()} />,
    });
  }, []);

  return (
    <View className="bg-white flex-1">
      
    </View>
  );
}

function AppSearchbar({ onGoback }) {
  return (
    <View className="mt-[24] flex-row items-center p-1">
      <TouchableOpacity
        className="bg-white flex-row items-center justify-center h-[40] w-[40] rounded-[50]"
        onPress={onGoback}
      >
        <Ionicons name="chevron-back" size={24} color={"#000"} />
      </TouchableOpacity>
      <TextInput placeholder="Search..." className="flex-auto" autoFocus />
      <Animated.View sharedTransitionTag="search">
        <AntDesign name="search1" size={24} color="black" />
      </Animated.View>
    </View>
  );
}
