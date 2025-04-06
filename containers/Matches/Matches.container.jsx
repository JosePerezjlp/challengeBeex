import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { MOCK_MATCHES } from "./Matches.constants";

const MatchesContainer = () => {
  const [search, setSearch] = useState("");
  const [matchmakingMode, setMatchmakingMode] = useState(false);
  const [userLevel, setUserLevel] = useState("intermedio"); // Simulado

  const filteredMatches = MOCK_MATCHES.filter((match) => {
    const matchesSearch = match.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLevel = matchmakingMode ? match.level === userLevel : true;
    return matchesSearch && matchesLevel;
  });

  const handleJoin = (matchTitle) => {
    Alert.alert("Solicitud enviada", `Te has unido a: ${matchTitle}`);
  };

  const toggleMatchmaking = () => {
    setMatchmakingMode(!matchmakingMode);
    setSearch(""); // limpiar búsqueda al cambiar modo
  };

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-4">
        {matchmakingMode ? "Partidos Recomendados" : "Buscar partidos"}
      </Text>

      <View className="flex-row justify-between mb-4">
        <TextInput
          placeholder="Buscar por nombre"
          className="flex-1 bg-gray-100 px-3 py-2 rounded-lg"
          value={search}
          onChangeText={setSearch}
          editable={!matchmakingMode}
        />
        <TouchableOpacity
          onPress={toggleMatchmaking}
          className="ml-2 px-4 py-2 bg-blue-500 rounded-lg"
        >
          <Text className="text-white font-medium text-sm">
            {matchmakingMode ? "Ver todos" : "Matchmaking"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-100 p-4 mb-3 rounded-xl shadow-sm">
            <Text className="text-lg font-semibold">{item.title}</Text>
            <Text className="text-sm text-gray-600 mt-1">
              Nivel mínimo: <Text className="font-medium">{item.level}</Text>
            </Text>
            <Text className="text-sm text-gray-600">
              Jugadores: <Text className="font-medium">{item.players}</Text>
            </Text>
            <View className="flex items-center">
              <TouchableOpacity
                onPress={() => handleJoin(item.title)}
                className="mt-3 bg-blue-500 px-4 py-2 rounded-full w-1/4"
              >
                <Text className="text-white text-center font-semibold">
                  Unirse
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No se encontraron partidos.
          </Text>
        }
      />
    </View>
  );
};

export default MatchesContainer;
