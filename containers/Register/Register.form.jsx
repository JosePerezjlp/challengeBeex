import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormRegister = (props) => {
  const { alertEmail, onCreateUser, setVisible } = props;
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const validatePassword = () => {
    const newErrors = [];

    if (passwordUser.length < 8) {
      newErrors.push("La contraseña debe tener al menos 8 caracteres.");
    }

    if (!/\d|[!@#$%^&*(),.?":{}|<>]/.test(passwordUser)) {
      newErrors.push(
        "La contraseña debe contener al menos un número o carácter especial."
      );
    }

    if (!/[A-Z]/.test(passwordUser)) {
      newErrors.push(
        "La contraseña debe contener al menos una letra mayúscula."
      );
    }

    if (passwordUser !== confirmPassword) {
      newErrors.push("Las contraseñas no coinciden.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };
  const handleRegisterUser = () => {
    if (passwordUser !== confirmPassword) {
      setVisible(true);
      return;
    } else if (validatePassword()) {
      onCreateUser(emailUser, passwordUser);
    }
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
        {alertEmail && (
          <Text className="text-red-600 mt-[4px] ">
            El correo ya está siendo utilizado.
          </Text>
        )}
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
      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">
          Confirmar tu contraseña
        </Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={!showPasswordConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibilityConfirm}
          style={{ position: "absolute", right: 10, top: 40 }}
        >
          <Ionicons
            name={showPasswordConfirm ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errors && <Text className="text-red-600 mt-[4px] ">{errors}</Text>}

      <TouchableOpacity
        className="mt-[37px] flex justify-center bg-black p-2 rounded-lg border-2 border-gray83 h-[50px]  flex-row items-center justify-center"
        onPress={handleRegisterUser}
      >
        <Text className="text-white text-center text-xl font-latoRegular">
          Registrarme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

FormRegister.propTypes = {
  onLogout: PropTypes.func,
};
export default FormRegister;
