import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MOCKCOMPLEXES } from "./Complexes.constanst";
import { getFavorites, storeFavorites } from "../../components/utils/storage";

const ComplexesContainer = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavs = await getFavorites();
      setFavorites(storedFavs);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (complex) => {
    const updatedFavs = await storeFavorites(complex);
    setFavorites(updatedFavs);
  };

  const filteredComplexes = MOCKCOMPLEXES.filter((complex) => {
    const query = search.toLowerCase();
    return (
      complex.name.toLowerCase().includes(query) ||
      complex.city.toLowerCase().includes(query)
    );
  });

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 mt-[10px] ">
      <Text className="text-xl font-bold mb-4 text-center mt-[10px]">
        Complejos deportivos
      </Text>

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-2 mb-4 text-base"
        placeholder="Buscar por nombre o ciudad"
        value={search}
        onChangeText={setSearch}
      />

      {filteredComplexes.map((complex) => {
        const isFavorite = favorites.includes(complex.id);

        return (
          <View
            key={complex.id}
            className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-200"
          >
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-lg font-semibold text-gray-800">
                  {complex.name}
                </Text>
                <Text className="text-sm text-gray-600">
                  Ciudad: {complex.city}
                </Text>
                <Text className="text-sm text-gray-500">
                  Distancia: {complex.distance}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggleFavorite(complex)}>
                <FontAwesome
                  name={
                    favorites.some((fav) => fav.id === complex.id)
                      ? "heart"
                      : "heart-o"
                  }
                  size={24}
                  color={
                    favorites.some((fav) => fav.id === complex.id)
                      ? "red"
                      : "gray"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {filteredComplexes.length === 0 && (
        <Text className="text-center text-gray-400 mt-10">
          No se encontraron complejos.
        </Text>
      )}
    </ScrollView>
  );
};

export default ComplexesContainer;
