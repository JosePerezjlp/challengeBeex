import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { storeUser } from "../../components/utils/storage";
import FormRegister from "./Register.form";
import SeparatorWithText from "../../components/SeparteWithText";
import GmailSvg from "../../assets/svg/GmailSvg";
import { Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";

const RegisterContainer = () => {
  const [visible, setVisible] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const router = useRouter();
  const handleCreateUser = useCallback(async (email, password) => {
    if (!email || !password) {
      alert("Email y contraseña son obligatorios");
      return;
    }

    const result = await storeUser({
      email,
      password,
      namePlayer: "Anonimo123",
      fullname: "",
      city: "",
      level: "",
    });

    if (result === "success") {
      router.push("/profile");
    } else if (result === "El correo ya está siendo utilizado.") {
      setAlertEmail(true);
      setTimeout(() => {
        setAlertEmail(false);
      }, 5000);
    }
  }, []);

  return (
    <View className="flex justify-center items-center mt-[24px] p-4 ">
      <Text className="text-[24px] font-bold mt-[24px] ">
        ¿Quieres ser parte de BEEX?
      </Text>
      <Text className="text-[20px] mb-[22px]">Regístrate</Text>
      <FormRegister
        onCreateUser={handleCreateUser}
        setVisible={setVisible}
        alertEmail={alertEmail}
      />

      <SeparatorWithText />

      <View className="w-full mt-[14px] mb-[27px] ">
        <TouchableOpacity className="  bg-white p-2 rounded-lg border-2 border-gray83 h-[50px] flex-row items-center justify-center">
          <GmailSvg />
          <Text className="text-black text-center font-latoRegular ml-2 text-xl">
            Continuar como Google
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        style={{ backgroundColor: "tomato" }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        Las contraseñas no coinciden
      </Snackbar>
    </View>
  );
};

export default RegisterContainer;
