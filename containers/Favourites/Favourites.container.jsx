import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { getFavorites } from "../../components/utils/storage";

const FavoritesContainer = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavs = await getFavorites();
      setFavorites(storedFavs);
      setLoading(false);
    };
    loadFavorites();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0B6E6E" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-4">
        Tus favoritos ⭐
      </Text>

      {favorites.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">
          No tenés partidos favoritos todavía.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-yellow-100 p-4 mb-3 rounded-xl shadow-sm">
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Ciudad: <Text className="font-medium">{item.city}</Text>
              </Text>
              <Text className="text-sm text-gray-600">
                Distancia: <Text className="font-medium">{item.distance}</Text>
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FavoritesContainer;
