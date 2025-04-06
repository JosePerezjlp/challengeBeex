import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import { OPTIONS_ACCOUNT } from "./Profile.contants";
import { useRouter } from "expo-router";
import ClosedSesionSvg from "../../assets/svg/ClosedSesion";

const OptionsAccount = (props) => {
  const { onLogout = () => undefined } = props;
  const router = useRouter();
  return (
    <View className="p-8">
      <Text className="font-bold mb-[10px] ">Mi cuenta</Text>
      {Object.entries(OPTIONS_ACCOUNT).map(([key, option]) => (
        <TouchableOpacity
          key={key}
          className="flex flex-row gap-4 mb-[10px] "
          onPress={() => router.push(option.path)}
        >
          {option.icon}
          <Text>{option.name}</Text>
        </TouchableOpacity>
      ))}
      <View className="mt-[20px]">
        <TouchableOpacity className="flex flex-row gap-6" onPress={onLogout}>
          <ClosedSesionSvg />
          <Text className="text-red-500">Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

OptionsAccount.propTypes = {
  onLogout: PropTypes.func,
};

export default OptionsAccount;
