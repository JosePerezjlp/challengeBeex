import React from "react";
import { View, Text } from "react-native";

const SeparatorWithText = () => {
  return (
    <View className="flex-row items-center justify-center my-2 mt-[28px] mb-[14px] ">
      <View className="flex-1 border-b border-gray-300" />
      <Text className="mx-3 text-gray-500"> O continúa con</Text>
      <View className="flex-1 border-b border-gray-300" />
    </View>
  );
};

export default SeparatorWithText;
