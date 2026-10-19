# Formulario de registro — POO y SOLID

## Probar

Necesitas Node.js 20 o posterior. No hay dependencias que instalar.

1. Descomprime el ZIP.
2. Abre una terminal en la carpeta registro-poo-completo.
3. Ejecuta `npm start` (o `node server.js`).
4. Abre http://localhost:3000/formulario.

Si tu equipo no resuelve localhost, usa http://127.0.0.1:3000/formulario. El puerto se puede cambiar con la variable PORT.

También puedes usar Live Server de VS Code o `python3 -m http.server 8000` y abrir http://localhost:8000/index.html. No abras el archivo mediante file://, porque utiliza módulos ES.

## Formulario dinámico

| Tipo | Primer parámetro propio | Segundo parámetro propio |
| --- | --- | --- |
| Alumno | codigoAlumno (privado con getter/setter) | carrera (público) |
| Maestro | especialidad (privado con getter/setter) | gradoAcademico (público) |
| PersonalAseo | areaAsignada (privado con getter/setter) | turno (público) |

Al seleccionar un rol se muestra su fieldset y se habilitan sus dos campos. Los fieldsets restantes permanecen ocultos y deshabilitados, para que sus campos obligatorios no bloqueen el envío.

El controlador lee los datos comunes y los dos valores propios del panel activo. La fábrica los pasa individualmente al constructor de la subclase. El servicio recibe el objeto completo mediante registrar(usuario) y el repositorio lo conserva. No se usa un objeto datos para almacenar los atributos de Usuario.

Cada envío agrega un usuario. La tabla muestra rol, descripción y datos propios mediante obtenerRol(), obtenerDescripcion() y obtenerDetalles(): no necesita condicionales para cada subclase. Restaurar valores solo restaura el formulario, oculta los campos específicos y conserva la tabla.

Se mantienen los valores personales de ejemplo proporcionados en el formulario original; los campos adicionales incluyen ejemplos editables.

## Organización

| Archivo o carpeta | Responsabilidad |
| --- | --- |
| server.js | Crea el servidor y delega las solicitudes |
| server/rutas/formulario.routes.js | Define las rutas HTTP del formulario y sus recursos |
| server/utilidades/servirArchivo.js | Sirve los archivos permitidos con su tipo MIME |
| js/formularioRegistro.js | Entrada del navegador; importa y conecta dependencias |
| js/contratos | Clases base que definen contratos en ejecución |
| js/modelos | Usuario, Alumno, Maestro y PersonalAseo |
| js/fabricas | Creación del objeto de la subclase seleccionada |
| js/repositorios | Colección de usuarios en memoria del navegador |
| js/servicios | Registro del objeto completo |
| js/controladores | Eventos del formulario |
| js/vistas/CamposRol.js | Cambio dinámico de campos según el selector |
| js/vistas/TablaUsuarios.js | Representación de todos los usuarios |

Las rutas HTTP y los import del navegador son responsabilidades distintas y tienen archivos separados. El servidor usa únicamente módulos nativos de Node.js. Es un servidor estático local: no guarda los usuarios ni tiene una API de registro.

## POO y SOLID

Usuario contiene #nombre, #apellido y #rol privados. Nombre y apellido tienen getters/setters que validan; rol solo tiene getter. Correo, teléfono, fechaNacimiento, género y mensaje son atributos públicos. Cada hijo tiene además un atributo privado y uno público propios. Los atributos públicos pueden modificarse directamente sin validación automática.

Cada hijo pasa un rol fijo a super() e implementa los métodos polimórficos. El constructor de Usuario recibe cada atributo individualmente. JavaScript no tiene interfaces nativas ni palabras clave abstract/public para clases: los contratos se representan con clases base que impiden su instanciación directa y lanzan errores si se llama un método no implementado. No es validación estática de TypeScript.

| SOLID | Aplicación |
| --- | --- |
| S | Creación, almacenamiento, registro, eventos, campos dinámicos, tabla y rutas tienen responsabilidades separadas. |
| O | Se pueden añadir subclases y registrarlas en formularioRegistro.js; hay que añadir su panel HTML. La fábrica, servicio y tabla no cambian mientras el nuevo rol tenga dos parámetros propios. |
| L | Los tres hijos se utilizan mediante el mismo contrato de Usuario. |
| I | Contratos pequeños para comportamiento de roles y almacenamiento. |
| D | Servicio y controlador reciben dependencias desde el archivo de entrada. |

La fábrica de este ejercicio admite exactamente dos parámetros específicos por rol. Si posteriormente un rol requiere más campos, será necesario ampliar la fábrica y la lectura del controlador.

## Persistencia y estilos

Los usuarios se guardan en memoria del navegador: recargar la página elimina los registros. Los duplicados están permitidos. Para persistir se puede implementar otro repositorio y guardar datos planos con su tipo, reconstruyendo las instancias al cargar. Para compartir datos entre equipos se necesita una API y base de datos con validación y permisos.

El CSS está incluido y no requiere Internet. Las rutas originales de Bootstrap están comentadas como opción en index.html; descoméntalas si esos assets están disponibles en tu servidor (y adapta las rutas de recursos si utilizas este servidor Node). Bootstrap no está incluido en el ZIP.

## Verificación

Ejecuta `npm test`. Hay siete pruebas de acumulación, atributos y encapsulamiento, validación de constructores, protección de la colección, tabla y métodos polimórficos, cambio dinámico de paneles y rutas. Las pruebas de vista utilizan un DOM simulado. No se realizó una prueba visual en navegador porque el entorno no tiene un navegador instalado.
