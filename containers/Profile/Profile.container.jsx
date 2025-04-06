import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  clearOldFavorites,
  getUser,
  logoutUser,
} from "../../components/utils/storage";
import PencilSvg from "../../assets/svg/PencilSvg";
import { useRouter } from "expo-router";
import OptionsAccount from "./Profile.options";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileContainer() {
  const [user, setUser] = useState({
    name: "",
    city: "",
    level: "",
    email: "",
  });
  const [progress] = useState(new Animated.Value(0));
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const storedUser = await getUser();
        if (storedUser) {
          setUser(storedUser);
          animateProgress(calculateProgress(storedUser));
        }
      };

      fetchUser();
    }, [])
  );

  const calculateProgress = (data) => {
    let filledFields = ["fullName", "city", "level"].filter(
      (field) => data[field]
    ).length;
    return filledFields / 3;
  };

  const animateProgress = (value) => {
    Animated.timing(progress, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result === "success") {
      router.push("/");
    }
  };

  return (
    <View className="flex justify-center flex-1">
      <View className="-mt-[150px]">
        <View>
          <Text className="font-semibold text-[15px] text-center ">
            {Math.round(calculateProgress(user) * 100)}% perfil completo
          </Text>
        </View>

        <View className="h-[10px] w-full bg-gray-300 rounded-full overflow-hidden my-2">
          <Animated.View
            style={[styles.progressBar, { width: widthInterpolated }]}
            className="h-full bg-green-500 rounded-full"
          />
        </View>
      </View>

      <View className="flex flex-row justify-center items-center gap-2 mt-[40px]">
        <View className="flex flex-col justify-center items-center ">
          <View>
            <View className="w-28 h-28 ml-[20px] bg-gray-600 rounded-full " />
          </View>
          <View className="flex flex-row">
            <Text className="font-bold text-center text-[20px] ">
              {user.namePlayer ? user.namePlayer : "Anonimo123"}{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/editProfile")}>
              <PencilSvg />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text className="font-semibold text-center text-[16px] ">
        {user.email}{" "}
      </Text>
      <OptionsAccount onLogout={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    backgroundColor: "#4caf50",
  },
});
