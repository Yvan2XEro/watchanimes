import React, {useMemo} from 'react';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur/';
import { View } from 'react-native';

const AnimatedBlurView = Animated.createAnimatedComponent(View);

const AppSheetBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP,
    )})`,
  }));

  // styles
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style],
  );

  const blurViewProps = useAnimatedProps(() => {
    return {
      blurAmount: interpolate(
        animatedIndex.value,
        [1, 5],
        [5, 20],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <AnimatedBlurView animatedProps={blurViewProps as any} style={containerStyle} />
  );
};

export default AppSheetBackdrop;
