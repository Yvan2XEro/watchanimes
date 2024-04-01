import { View, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

type TProps = PropsWithChildren<{
  style?: ViewStyle;
}>;
export default function AppSkeleton({ children, style }: TProps) {
  return (
    <View style={style}>
      <SkeletonPlaceholder backgroundColor="#E0E0E0" highlightColor="#CCCCCC">
        <View>{children}</View>
      </SkeletonPlaceholder>
    </View>
  );
}
