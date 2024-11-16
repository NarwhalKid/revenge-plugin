(function (context, patcher, metro, vendetta) {
    "use strict";
    
    const { before } = patcher;
    const { findByProps } = metro;
    const SpotifyStore = findByProps("dispatch");
    const { logger } = vendetta;

    let unpatch; // Variable to hold the unpatch function

    console.log('hi!')
    logger.log("Hi!");
    const patch = () => {
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
    };

    // Called when the plugin is loaded
    context.onLoad = patch;

    // Called when the plugin is unloaded
    context.onUnload = () => {
        if (typeof unpatch === "function") {
            unpatch(); // Unpatch the modification
            console.log('unpatched!')
            logger.log("Unpatched successfully!");
        }
    };

})(vendetta.context, vendetta.patcher, vendetta.metro, vendetta);
