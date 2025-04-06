import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FormLogin = (props) => {
  const { onLoginUser = () => undefined } = props;
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginUser = () => {
    onLoginUser({ emailUser, passwordUser });
  };

  return (
    <View className="w-full">
      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">
          Usuario o correo electrónico
        </Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Ingresa tu correo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailUser}
          onChangeText={setEmailUser}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">
          Contraseña
        </Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={!showPassword}
          value={passwordUser}
          onChangeText={setPasswordUser}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ position: "absolute", right: 10, top: 40 }}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-center">
        <View>
          <TouchableOpacity
            className=" space-x-2 mt-2"
            onPress={() => route.push("/resetPassword")}
          >
            <Text className="text-[13px] font-latoRegular text-gray">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="mt-[37px] flex justify-center bg-black p-2 rounded-lg border-2 border-gray83 h-[50px]  flex-row items-center justify-center"
        onPress={handleLoginUser}
      >
        <Text className="text-white text-center text-xl font-latoRegular">
          Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};
FormLogin.propTypes = {
  onLoginUser: PropTypes.func,
};

export default FormLogin;
