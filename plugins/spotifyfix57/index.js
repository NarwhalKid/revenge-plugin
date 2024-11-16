(function (context, patcher, metro, vendetta) {
    "use strict";
    
    const { before } = patcher;
    const { findByProps } = metro;
    const SpotifyStore = findByProps("dispatch");
    const { logger } = vendetta;

    let unpatch; // Variable to hold the unpatch function

    const patch = () => {
        unpatch = before("dispatch", SpotifyStore, ([action]) => {
            if (
                action.type === "SPOTIFY_PROFILE_UPDATE" &&
                action.payload?.isPremium === undefined
            ) {
                action.payload.isPremium = true; // Force premium
            }
        });
    };

    // Called when the plugin is loaded
    context.onLoad = patch;

    // Called when the plugin is unloaded
    context.onUnload = () => {
        if (typeof unpatch === "function") {
            unpatch(); // Unpatch the modification
            logger.log("Unpatched successfully!");
        }
    };

})(vendetta.context, vendetta.patcher, vendetta.metro, vendetta);
