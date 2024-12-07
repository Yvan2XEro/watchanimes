import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { PropsWithChildren } from "react";
import FullScreenPlayer from "./FullScreenPlayer";
import PlayerModal from "./PlayerModal";

export default function WithPlayerWaraper({ children }: PropsWithChildren) {
  return (
    <>
      <BottomSheetModalProvider>
        {children}
        <PlayerModal />
        <FullScreenPlayer />
      </BottomSheetModalProvider>
    </>
  );
}
