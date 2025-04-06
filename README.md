## Get started

## Get started

1. Bajar el repositorio

   ```bash
   Clonar repositorio
   ```

2. Instalación de dependencias

   ```bash
    npm install
   ```

3. Arrancar la aplicacion

   ```bash
    npm expo start
   ```

## Explicacion breve

Se creó la aplicación por medio de Expo Router, rutas automáticas al estilo de Next.js; se usó AsyncStorage para la persistencia de datos e inicio de sesión. La vista inicial es el login, en el cual, si ya tienes una cuenta, pueden loguear tranquilamente y te llevaría a los complejos disponibles. En la misma vista tiene para recuperar contraseña y crear una cuenta. Crear una cuenta nueva tiene el formulario controlador con regex y corrobora que las contraseñas coincidan, tengan al menos una mayúscula y tengan más de 8 caracteres. Si el mail ya existe, no te dejará usar el mismo para otro usuario. Una vez registrado, te lleva a tu perfil para poder cambiar tus datos y también poder cambiar tu contraseña nuevamente. Hay una opción que dice "Mis favoritos"; en caso de tener ya seleccionado, te muestre cuáles son. Las demás opciones como "Lenguaje", "Políticas de privacidad" y "Términos de uso" están de adorno; el círculo gris que simula una imagen también está de adorno, pero lo demás tiene funcionalidad. También incorporé un navbar para poder tener una mejor experiencia sobre la app y así poder moverse libremente a donde se desee. Se aplicó la mayoría de los ítems que pedían (espero no haberme olvidado nada; puede pasar, es domingo). En la vista de partidos pueden buscar por nombre y al hacer clic sobre el botón 'Unirse' devuelve un mensaje simple. Está el botón Matching, el cual solo muestra los partidos según el nivel del jugador.
