import { ReactNative as RN } from "@vendetta/metro/common";
import { instead } from "@vendetta/patcher";

export const onUnload = instead("setCommunicationModeOn", RN.NativeModules.NativeAudioManagerModule === null ? RN.NativeModules.RTNAudioManager : RN.NativeModules.NativeAudioManagerModule, () => {});