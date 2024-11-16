import { findByProps } from "@vendetta/metro";
import { logger } from "@vendetta";
import { before } from "@vendetta/patcher";

const SpotifyStore = findByProps("dispatch")
let unpatch

export default {

    onLoad: () => {
        console.log('hey!')
        logger.log("Hey!");
        unpatch = before("dispatch", SpotifyStore, ([action]) => {
            console.log(JSON.stringify(action));
            logger.log(JSON.stringify(action));
            if (
                action.type === "SPOTIFY_PROFILE_UPDATE" &&
                action.payload?.isPremium === undefined
            ) {
                action.payload.isPremium = true; // Force premium
            }
        });
    },

    // Called when the plugin is unloaded
    onUnload: () => {
        if (typeof unpatch === "function") {
            unpatch(); // Unpatch the modification
            console.log('unpatched!')
            logger.log("Unpatched successfully!");
        }
    },
}