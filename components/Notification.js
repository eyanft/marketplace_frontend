import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Bell } from "lucide-react-native";

export default function NotificationIcon() {
  return (
    <TouchableOpacity className="absolute right-4 top-4 bg-white p-3 rounded-full shadow-sm">
      <Bell size={20} color="gray" />
    </TouchableOpacity>
  );
}