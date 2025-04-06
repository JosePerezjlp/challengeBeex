import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormLogin from "./Login.form";
import { useRouter } from "expo-router";
import {
  checkSession,
  getUser,
  loginUser,
  updateUserInfo,
} from "../../components/utils/storage";
import { Snackbar } from "react-native-paper";

export default function LoginContainer() {
  const router = useRouter();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const result = await checkSession();
      if (result === "success") {
        router.push("/complexes");
      }
    };

    verifySession();
  }, []);

  const handleLogin = async (data) => {
    const { emailUser, passwordUser } = data;

    const storedUser = await loginUser(emailUser, passwordUser);
    if (storedUser === "success") {
      await updateUserInfo({ sesionStatus: true });
      router.push("/complexes");
    } else if (storedUser === "Correo o contraseña incorrectos.") {
      setAlert(true);
    }
  };

  return (
    <View className="flex justify-center flex-1 p-2">
      <View>
        <Text className="text-[25px] font-bold text-center mb-[6px]">
          Bienvenido a BEEX
        </Text>
      </View>
      <View>
        <Text className="text-2xl text-center mt-[20px] mb-[6px]">
          Iniciar Sesión
        </Text>
        <FormLogin onLoginUser={handleLogin} />
      </View>
      <View className="mt-[30px]">
        <Text className="text-[13px] text-center text-gray10">
          ¿Nuevo en BEEX?
          <TouchableOpacity
            className="mt-[8px]"
            onPress={() => router.push("/register")}
          >
            <Text className="text-bold ml-2">Crea una cuenta</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View className="mt-[20px] ">
        <Snackbar
          style={{ backgroundColor: "tomato" }}
          visible={alert}
          onDismiss={() => setAlert(false)}
        >
          Correo o contraseña incorrectos.
        </Snackbar>
      </View>
    </View>
  );
}
