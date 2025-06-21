import { ReactNative as RN } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";

const AudioManager = RN.NativeModules.NativeAudioManagerModule ?? RN.NativeModules.RTNAudioManager;

let unpatch;

export const onLoad = () => {
    if (!AudioManager) return;

    unpatch = before("setCommunicationModeOn", AudioManager, (args) => {
        if (args[0] === true) {
            args[0] = false;
        }
    });
};

export const onUnload = () => {
    unpatch?.();
};
