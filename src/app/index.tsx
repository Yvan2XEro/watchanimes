import { RecentViewSwiper } from "@/components/organisms/RecentViewSwiper";
import { AntDesign } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <View>
      //     <Image
      //       source={require("../assets/logo.png")}
      //       style={{ width: 50, height: 50, borderRadius: 100 }}
      //     />
      //   </View>
      // ),
      headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 8 }}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: "Hi Otaku!",
    });
  }, []);
  return (
    <View className="flex flex-1 bg-white">
      <RecentViewSwiper />
    </View>
  );
}
