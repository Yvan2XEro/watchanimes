import {AppSheetBackdrop} from '@/components/atoms/AppSheetBackdrop';
import { PRIMARY } from '@/lib/constants';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import {BackHandler} from 'react-native';

const AppBottomSheetContext = React.createContext({
  presentAppBottomSheet: (c: React.ReactNode) => {},
  dismissAppBottomSheet: () => {},
});

export function AppBottomSheetProvider({children}: PropsWithChildren) {
  const {colors} = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();

  const [component, setComponent] = useState<React.ReactNode>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (component) {
          dismissAppBottomSheet();
          return true;
        }
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [component]);

  const presentAppBottomSheet = useCallback(
    (c: React.ReactNode) => {
      setComponent(c);
      bottomSheetModalRef.current?.present();
    },
    [bottomSheetModalRef.current, setComponent],
  );

  const dismissAppBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setComponent(undefined);
  }, [bottomSheetModalRef.current, setComponent]);

  return (
    <AppBottomSheetContext.Provider
      value={{presentAppBottomSheet, dismissAppBottomSheet}}>
      {children}
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={['25%', '50%']}
          index={0}
          ref={bottomSheetModalRef}
          backdropComponent={props => <AppSheetBackdrop {...props} />}
          backgroundStyle={{
            borderRadius: 24,
            backgroundColor: colors.card,
          }}
          handleIndicatorStyle={{
            backgroundColor: PRIMARY,
          }}>
          {component}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </AppBottomSheetContext.Provider>
  );
}

export function useAppBottomSheet() {
  const context = React.useContext(AppBottomSheetContext);
  if (context === undefined) {
    throw new Error(
      'useAppBottomSheet must be used within a AppBottomSheetProvider',
    );
  }
  return context;
}
