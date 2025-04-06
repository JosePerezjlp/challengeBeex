import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import HomeSvg from "@/assets/svg/HomeSvg.js";
import ProfileSvg from "@/assets/svg/ProfileSvg";
import FlagSvg from "@/assets/svg/FlagSvg";
import { useRouter } from "expo-router";

const Navbar = ({ showFooter, pathname }) => {
  const router = useRouter();

  return (
    <View>
      {showFooter && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 flex-row justify-around items-center">
          <TouchableOpacity
            onPress={() => router.push("/complexes")}
            className="items-center"
          >
            <HomeSvg
              color={`${pathname === "/complexes" ? "#0B6E6E" : "gray"}`}
            />
            <Text
              className={`${
                pathname === "/complexes" ? "text-green10" : "gray"
              } text-xs`}
            >
              Complejos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/matches")}
            className="items-center"
          >
            <FlagSvg
              color={`${pathname === "/matches" ? "#0B6E6E" : "gray"}`}
            />
            <Text
              className={`${
                pathname === "/matches" ? "text-green10" : "gray"
              } text-xs`}
            >
              Partidos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="items-center"
          >
            <ProfileSvg
              color={`${pathname === "/profile" ? "#0B6E6E" : "gray"}`}
            />
            <Text
              className={`${
                pathname === "/profile" ? "text-green10" : "text-gray"
              } text-xs`}
            >
              Cuenta
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Navbar;
