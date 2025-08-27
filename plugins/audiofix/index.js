import { ReactNative as RN } from "@vendetta/metro/common";
import { instead } from "@vendetta/patcher";

export const onUnload = instead("setCommunicationModeOn", RNReactNative.TurboModuleRegistry.get("NativeAudioManagerModule") === null ? RN.TurboModuleRegistry.get("RTNAudioManager") : RN.TurboModuleRegistry.get("NativeAudioManagerModule"), () => {});