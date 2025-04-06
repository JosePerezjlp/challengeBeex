import React, { useState } from "react";
import { TouchableOpacity, Text, TextInput, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { updateUserPassword } from "../../components/utils/storage";

const ResetPasswordContainer = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const validatePassword = () => {
    const newErrors = [];

    if (password.length < 8) {
      newErrors.push("La contraseña debe tener al menos 8 caracteres.");
    }

    if (!/\d|[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.push(
        "La contraseña debe contener al menos un número o carácter especial."
      );
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.push(
        "La contraseña debe contener al menos una letra mayúscula."
      );
    }

    if (password !== confirmPassword) {
      newErrors.push("Las contraseñas no coinciden.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (validatePassword()) {
      try {
        const result = await updateUserPassword(password);
        if (result === "success") {
          Alert.alert("✅ Éxito", "Contraseña actualizada correctamente");
        } else {
          Alert.alert("❌ Error", "No se pudo actualizar la información");
        }
      } catch (error) {
        console.error("Error guardando información:", error);
        Alert.alert("❌ Error", "Hubo un problema al guardar los datos");
      }
    }
  };

  return (
    <View className="flex justify-center items-center mt-[24px] p-4">
      <Text className="font-latoRegular text-[31px] mt-[24px]">
        Ingresa nueva contraseña
      </Text>

      <View className="w-full mt-[30px] mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">
          Contraseña
        </Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
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

      <View className="w-full mb-4">
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

      {errors.length > 0 && (
        <View className="w-full mb-4">
          {errors.map((error, index) => (
            <Text key={index} className="text-red-500 text-sm">
              • {error}
            </Text>
          ))}
        </View>
      )}

      <View className="w-full">
        <TouchableOpacity
          onPress={handleSubmit}
          className="mt-[37px] flex justify-center bg-black p-2 rounded-lg border-2 border-gray83 h-[50px]  flex-row items-center justify-center"
        >
          <Text className="text-white text-center text-xl font-latoRegular">
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordContainer;
