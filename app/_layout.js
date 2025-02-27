import { Stack } from "expo-router";
import "../config/global.css";
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
