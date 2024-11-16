import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const SpotifyStore = findByProps("dispatch")
let unpatch

export default {

    onLoad: () => {
        unpatch = before("dispatch", SpotifyStore, ([action]) => {
            if (
                action.type === "SPOTIFY_PLAYER_STATE" &&
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