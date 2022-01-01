Proyecto construido en express bajo el ambiente de nodeJS
Ejecutar bajo la instruccion ''''npm start ''''
### Descripcion de carpetas
###### controllers
>Contiene el CRUD (Crear, Leer, Modificar y Actualizar) para los modelos necesarios
###### database
>Contiene la configuracion de conexion hacia la base de datos
###### helpers
>Contiene funciones que se utilizan en diferentes rutas
###### middlewares
>Contiene validaciones que se ejecutan antes de realizar alguna operacion de los controllers para manejar errores de usuario, falta de informacion, validar informacion contra la BD, etc.
###### models
>Contiene los modelos de datos que son almacenado en Mongo DB e implementados bajo el ORM mongoose
###### public
>Contiene los archivos estaticos(html, css, js). Tambien sirve para ejecutar aplicaciones de ReactJS o AngularJS.
###### routes
>Contiene las rutas para cada direccion registrada en el archivo ./models/server.js

### Descripcion de archivos
###### .env
> Contiene variables globales que pueden ser utilizadas en cualquier archivo del proyecto
###### .gitignore
>Permite ignorar archivos y carpetas al subirlas al repositorio GIT
###### index.js
> Aplicacion principal la cual es ejecutada
###### package-lock.json / package.json
> Contiene los modulos, configuraciones, scripts del sistema

