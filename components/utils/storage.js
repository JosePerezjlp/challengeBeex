import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUser = async (newUser) => {
  try {
    const existingData = await AsyncStorage.getItem("users");
    const users = existingData ? JSON.parse(existingData) : [];

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (emailExists) {
      throw new Error("El correo ya está siendo utilizado.");
    }

    users.push(newUser);

    await AsyncStorage.setItem("users", JSON.stringify(users));
    if (newUser) {
      await AsyncStorage.setItem("login", JSON.stringify(newUser));
      return "success";
    }
    return "success";
  } catch (error) {
    console.error("Error guardando usuario:", error.message);
    return error.message;
  }
};
export const loginUser = async (email, password) => {
  try {
    const existingData = await AsyncStorage.getItem("users");
    const users = existingData ? JSON.parse(existingData) : [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      await AsyncStorage.setItem("login", JSON.stringify(user));
      return "success";
    } else {
      return "Correo o contraseña incorrectos.";
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return "Error al iniciar sesión.";
  }
};
export const checkSession = async () => {
  const userData = await AsyncStorage.getItem("login");

  if (userData) {
    return "success";
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("login");

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error leyendo usuario", error);
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("login");
    return "success";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return "error";
  }
};

export const updateUserInfo = async (newInfo) => {
  try {
    const currentUser = await getUser();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      ...newInfo,
    };

    await AsyncStorage.setItem("login", JSON.stringify(updatedUser));

    const usersRaw = await AsyncStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const updatedUsers = users.map((user) =>
      user.email.toLowerCase() === currentUser.email.toLowerCase()
        ? updatedUser
        : user
    );

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

    return "success";
  } catch (error) {
    console.error("Error actualizando info del usuario:", error);
    return "error";
  }
};

export const updateUserPassword = async (newPassword) => {
  try {
    const currentUser = await getUser();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      password: newPassword,
    };

    await AsyncStorage.setItem("login", JSON.stringify(updatedUser));

    const usersRaw = await AsyncStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const updatedUsers = users.map((user) =>
      user.email.toLowerCase() === currentUser.email.toLowerCase()
        ? updatedUser
        : user
    );

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

    return "success";
  } catch (error) {
    console.error("Error actualizando la contraseña", error);
    return "error";
  }
};

export const storeFavorites = async (newFavorite) => {
  try {
    const user = await getUser();
    if (!user) return;

    const key = `favorites_${user.email.toLowerCase()}`;
    const currentValue = await AsyncStorage.getItem(key);
    let favorites = currentValue ? JSON.parse(currentValue) : [];

    const alreadyExists = favorites.some((fav) => fav.id === newFavorite.id);

    favorites = alreadyExists
      ? favorites.filter((fav) => fav.id !== newFavorite.id)
      : [...favorites, newFavorite];

    await AsyncStorage.setItem(key, JSON.stringify(favorites));
    return favorites;
  } catch (e) {
    console.error("Error guardando/eliminando favorito", e);
  }
};

export const getFavorites = async () => {
  try {
    const user = await getUser();
    if (!user) return [];

    const key = `favorites_${user.email.toLowerCase()}`;

    const value = await AsyncStorage.getItem(key);

    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.error("Error leyendo favoritos", e);
    return [];
  }
};

export const clearOldFavorites = async () => {
  try {
    const user = await getUser();
    if (!user) return [];

    const key = `favorites_${user.email.toLowerCase()}`;
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error eliminando favoritos antiguos", e);
  }
};
