# Rick and Morty Character Management App

## Descripción

La **Rick and Morty Character Management App** es una aplicación web desarrollada con Angular 12 que permite a los usuarios gestionar personajes del universo de Rick and Morty. Los usuarios pueden listar, ver detalles, editar, eliminar y crear nuevos personajes. La aplicación utiliza la API de Rick and Morty para cargar los datos iniciales de los personajes.

## Características

- **Listar Personajes**: Muestra una lista paginada de personajes con detalles básicos como ID, nombre, especie y estado.
- **Ver Detalles**: Permite ver todos los detalles de un personaje seleccionado.
- **Editar Personajes**: Permite editar los detalles de un personaje existente.
- **Eliminar Personajes**: Permite eliminar un personaje de la lista.
- **Crear Personajes**: Permite añadir nuevos personajes a la lista.
- **Paginación**: Navegación entre páginas de personajes.
- **Responsive Design**: Diseño adaptable a dispositivos móviles y de escritorio.
- **Mensajes de Confirmación**: Muestra mensajes de éxito al guardar o editar personajes.

## Tecnologías Utilizadas

- **Angular 12**: Framework principal para el desarrollo de la aplicación.
- **Angular Material**: Biblioteca de componentes de UI para Angular.
- **RxJS**: Librería para programación reactiva.
- **TypeScript**: Lenguaje de programación utilizado para desarrollar la aplicación.

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación localmente:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/bloodblues/RickAndMortyApp.git
    cd RickAndMortyApp
    ```

2. **Instalar dependencias**:
    ```bash
    npm install
    ```

3. **Ejecutar la aplicación**:
    ```bash
    ng serve
    ```

4. **Abrir en el navegador**:
    - Abre tu navegador y navega a `http://localhost:4200`.

## Scripts Disponibles

### Servidor de Desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

### Scaffolding de Código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

### Ejecutar Tests Unitarios

Ejecuta `ng test` para ejecutar los tests unitarios a través de [Karma](https://karma-runner.github.io).

### Ejecutar Tests de Extremo a Extremo

Ejecuta `ng e2e` para ejecutar los tests de extremo a extremo a través de una plataforma de tu elección. Para usar este comando, primero debes añadir un paquete que implemente capacidades de testing de extremo a extremo.

## Estructura del Proyecto

- **src/app/componentes**: Contiene los componentes de la aplicación.
  - `lista-personajes`: Componente para listar los personajes.
  - `detalles-personaje`: Componente para ver detalles de un personaje.
  - `formulario-personaje`: Componente para editar y crear personajes.
  - `success-dialog`: Componente para mostrar mensajes de éxito.
- **src/app/servicios**: Contiene los servicios de la aplicación.
  - `rick-and-morty.service.ts`: Servicio para gestionar los datos de los personajes.
- **src/assets**: Contiene los recursos estáticos, como imágenes.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir al proyecto:

1. **Fork** el repositorio.
2. **Crea una rama** para tu feature o fix:
    ```bash
    git checkout -b mi-feature
    ```
3. **Commit** tus cambios:
    ```bash
    git commit -m 'Añadir mi feature'
    ```
4. **Push** a la rama:
    ```bash
    git push origin mi-feature
    ```
5. **Abre un Pull Request**.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
