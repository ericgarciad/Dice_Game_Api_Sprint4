# DICE GAME API

## Instrucciones para empezar a utilizar el juego:

### Instalación y uso del juego:
    Crear base de datos:
    - Acceder al archivo "createDbDiceGame.sql" ubicado en la carpeta scripts/.
    - Copiar y pegar el código en el programa de MySQL que uses para crear 
      la base de datos y las tablas.

    Iniciar el juego:
    - Posicionarse en la raiz del proyecto mediante una terminal 
      (ejemplo: visual code).
    - Acceder a la carpeta src/config/server e introducir tus credenciales de MySQL.
    - ejecutar el comando: "npm start".
 
    Si todo va bien debería aparecer los siguientes mensajes:
    - El servidor se esta ejecutando
    - El juego de los dados esta listo

### Rutas
------------- 
Nota: Para introducir valores en Postman, acceder a la pestaña "Body", 
seleccionar "raw" y "JSON".

#### POST: /players:

    Con esta ruta puedes crear un jugador. Para crearlo puedes hacerlo de las siguientes maneras:
        - Anonimo: En postman introduce {"username":""}. Se creará un usuario anonimo correlativo, e irá incrementando el numero en función del último usuario anonimo creado.
        - Nombre : Rellena el campo username para darle un nombre personalizado {"username":"nombre"}

#### PUT /players:

    Con esta ruta puedes actualizar un jugador añadiendo en OLD el nombre del jugador que quieres cambiar de nombre y en NEW el nuevo nombre que quieres.
    
    {"old_username": "<Usuario a cambiar nombre>",
    "new_username": "<Nuevo nombre>"}

#### POST /players/{id}/games/:

    Con esta ruta puedes empezar a jugar al juego y por l otanto tirarás los dados y obtendrás el resultado. Para hacerlo, introducie el ID de tu jugador.

#### DELETE /players/{id}/games:

    Con esta ruta puedes eliminar las partidas jugadas con un jugador.
    Introduce el ID del jugador y se eliminarán todas las partidas.

#### GET /players/:

    Con esta ruta se mostrarán todos los usuarios creados en el juego, tanto si han jugado como si aun no lo han hecho y con el porcetage de éxito.

#### GET /players/{id}/games:

    Con esta ruta podrás ver el listado de jugadas de un jugador.

#### GET /players/ranking: 

    Con esta ruta podrás ver el ranking medio de todos los jugadores creados.

#### GET /players/ranking/loser:

    Con esta ruta podrás ver el jugador con un porcetage de éxito peor que el resto.

#### GET /players/ranking/winner:

    Con esta ruta podrás ver el jugador con un porcetage de éxito mayor que el resto.

#### NOTA

Se han introducido varios readme.txt en cada carpeta para explicar que función en el proyecto desempeña cada carpeta y poder estructurar mediante las buenas prácticas que nos han enseñado para que el proyecto pueda ser extensible en un futuro. 

Además el código está totalmente comentado.
