import { General } from "@vendetta/ui/components";

const { Text } = General;

export const onLoad = () => console.log("Plugin loaded!");
export const onUnload = () => console.log("Plugin loaded!");
export const Settings = () => <Text style={{ color: "#000" }}>Hello!</Text>;