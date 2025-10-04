# 💻 Cliente CLI de Productos (Fake Store API)

Este es un **cliente de línea de comandos (CLI)** simple escrito en Node.js que permite interactuar con la **Fake Store API** para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la colección de productos.

El script traduce los comandos de tu terminal en peticiones HTTP (GET, POST, PUT, DELETE) para gestionar los datos.

##  Comandos de Uso

El script se ejecuta con `npm run start --`, aquí están los comandos que puedes usar, simulando operaciones REST:

| Operación      | Método | Recurso       | Argumentos Adicionales                |  Ejemplo                        |
| :---           | :---   | :---          | :---                                  | :---                            |
| **Leer Todos** | `GET`  | `products`    | (Ninguno)                             |`npm run start -- GET products` |
| **Leer Uno**   | `GET`  | `products/ID` | (Ninguno)                             |`npm run start -- GET products/15` |
| **Crear**      | `POST` | `products`    | **Título**, **Precio**, **Categoría** | `npm run start -- POST products "Remera Negra" 350 remeras` |
| **Actualizar** | `PUT`  | `products/ID` | **Título**, **Precio**, **Categoría**  | `npm run start -- PUT products/5 "Remera Azul" 600 remeras` |
| **Eliminar** | `DELETE` | `products/ID` | (Ninguno)                             | `npm run start -- DELETE products/5` |

---

### Nota sobre el Body

Para las operaciones **POST** y **PUT**, el script espera los datos de forma simplificada: **Título** (string), **Precio** (número) y **Categoría** (string) en ese orden. Esto simplifica el uso y evita problemas con el parseo de JSON en la terminal.