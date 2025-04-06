import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { getUser } from "../../components/utils/storage";
import { Picker } from "@react-native-picker/picker";
import { updateUserInfo } from "../../components/utils/storage";

const EditProfileContainer = () => {
  const [user, setUser] = useState({
    namePlayer: "",
    fullName: "",
    city: "",
    level: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };
    fetchUser();
  }, []);

  const handleChangeLevel = (level) => {
    setUser((prev) => ({ ...prev, level }));
  };

  const handleSaveInformation = async () => {
    try {
      const result = await updateUserInfo(user);
      if (result === "success") {
        Alert.alert("✅ Éxito", "Información actualizada correctamente");
      } else {
        Alert.alert("❌ Error", "No se pudo actualizar la información");
      }
    } catch (error) {
      console.error("Error guardando información:", error);
      Alert.alert("❌ Error", "Hubo un problema al guardar los datos");
    }
  };
  return (
    <View className="w-full px-4">
      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">
          Nombre jugador
        </Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Nombre jugador"
          value={user.namePlayer}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, namePlayer: text }))
          }
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">
          Nombre completo
        </Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Nombre completo"
          value={user.fullName}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, fullName: text }))
          }
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">Ciudad</Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Ciudad"
          value={user.city}
          onChangeText={(text) => setUser((prev) => ({ ...prev, city: text }))}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 text-base h-[48px]"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={user.email}
          onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-latoBold font-medium mb-2">Nivel</Text>
        <Picker selectedValue={user.level} onValueChange={handleChangeLevel}>
          <Picker.Item label="Seleccionar" value="" />
          <Picker.Item label="Novato" value="novato" />
          <Picker.Item label="Intermedio" value="intermedio" />
          <Picker.Item label="Avanzado" value="avanzado" />
        </Picker>
      </View>

      <TouchableOpacity
        className="mt-6 flex justify-center bg-black p-2 rounded-lg border-2 border-gray-300 h-[50px] flex-row items-center"
        onPress={handleSaveInformation}
      >
        <Text className="text-white text-center text-xl font-latoRegular">
          Guardar cambios
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileContainer;
