import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const SpotifyStore = findByProps("dispatch")
let unpatch

export default {

    onLoad: () => {
        unpatch = before("dispatch", SpotifyStore, ([action]) => {
            if (action.type.toLowerCase().includes("spotify")) console.log(action);
            if (
                action.type === "SPOTIFY_PROFILE_UPDATE" &&
                action.payload?.isPremium === undefined
            ) {
                action.payload.isPremium = true;
            }
        });
    },

    onUnload: () => {
        if (typeof unpatch === "function") {
            unpatch();
        }
    },
}