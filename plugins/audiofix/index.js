(function (context, patcher, metro) {
    "use strict";
// import { findByProps } from '@vendetta/metro';
const { findByProps } = metro;

    const patch = () => {
        if (findByProps("setCommunicationModeOn").setCommunicationModeOn) {
            findByProps("setCommunicationModeOn").setCommunicationModeOnBackup = findByProps("setCommunicationModeOn").setCommunicationModeOn;
            findByProps("setCommunicationModeOn").setCommunicationModeOn = () => {};
        }
    }

    const unpatch = () => {
        if (findByProps("setCommunicationModeOn").setCommunicationModeOn) {
            findByProps("setCommunicationModeOn").setCommunicationModeOn = findByProps("setCommunicationModeOn").setCommunicationModeOnBackup;
        }
    }

    context.onUnload = unpatch;
    context.onLoad = patch;

})({}, vendetta.patcher, vendetta.metro);