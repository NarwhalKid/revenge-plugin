(function (context, patcher, metro, vendetta) {
    "use strict";
    
    const { before } = patcher;
    const { findByProps } = metro;
    const SpotifyStore = findByProps("dispatch");
    const { logger } = vendetta
    

    const patch = () => {
        console.log("hi!");
        before("dispatch", SpotifyStore, ([action]) => {
            console.log(JSON.stringify(action));
            console.log(action);
            if (
                action.type === "SPOTIFY_PROFILE_UPDATE" &&
                action.payload?.isPremium === undefined
            ) {
                action.payload.isPremium = true; // Force premium
            }
        })
    }

    context.onLoad = patch;

})({}, vendetta.patcher, vendetta.metro, vendetta);