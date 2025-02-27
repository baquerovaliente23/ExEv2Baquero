// URL de la API
const apiURL = "https://www.zaragoza.es/sede/servicio/informacion-polen.json";

// URL de la API CRUD
const apiCrudUrl = "https://crudcrud.com/api/1a253f4bad8f4f94a49a671a4deb6951/polen";

// Función para obtener los datos de la API
function obtenerInformacionPolen() {
    fetch(apiURL)
        .then(response => response.json())  // Convertimos la respuesta a JSON
        .then(data => {
            console.log(data);  // Mostramos los datos completos en la consola
            mostrarDatos(data.result);  // Llamamos a la función para mostrar los datos en la tabla
        })
        .catch(error => console.error('Error al obtener los datos de la API:', error));  // Manejo de errores
}
// Función para mostrar los datos en formato de tabla
function mostrarDatos(datos) {
    const contenedor = document.getElementById('polen-info');
    
    // Limpiamos el contenedor antes de agregar la nueva tabla
    contenedor.innerHTML = '';  

    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('table-polen');  // Clase para estilizar la tabla

    // Crear la fila de cabecera de la tabla
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Fecha</th>
        <th>Especie</th>
        <th>Imagen</th>
        <th>Concentración</th>
    `;
    table.appendChild(headerRow);

    // Recorrer los datos de cada especie
    datos.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.observation[0].publicationDate}</td>  <!-- Fecha -->
            <td>${item.title}</td>                          <!-- Especie -->
            <td><img src="${item.image}" alt="Imagen de ${item.title}" class="imagen-polen" /></td> <!-- Imagen -->
            <td>${item.observation[0].value}</td>            <!-- Concentración -->
        `;

        // Añadir cada fila a la tabla
        table.appendChild(row);
    });

    // Agregar la tabla al contenedor
    contenedor.appendChild(table);
}

function guardarDatos() {
    // Obtener los datos de la tabla o de la API
    fetch(apiURL)
        .then(response => response.json())  // Convertimos la respuesta a JSON
        .then(data => {
            // Iterar sobre cada especie
            data.result.forEach(item => {
                // Preparar los datos para guardar
                const datos = {
                    nombre: "Ivan Baquero Valiente",  // Tu nombre
                    fecha: item.observation[0].publicationDate,  // La fecha de la observación
                    especie: item.title,  // Nombre de la especie
                    concentracion: item.observation[0].value  // Concentración
                };

                // Hacer una solicitud POST a la API de CRUDCRUD
                fetch(apiCrudUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)  // Convertir el objeto de datos a JSON
                })
                .then(response => response.json())  // Parsear la respuesta a JSON
                .then(data => {
                    console.log("Datos guardados:", data);
                })
                .catch(error => {
                    console.error('Error al guardar los datos:', error);
                });
            });

            alert("Todos los datos han sido guardados correctamente.");
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API para guardar:', error);
            alert("Hubo un error al obtener los datos.");
        });
}

// Llamar a la función para obtener y mostrar los datos
obtenerInformacionPolen();

// Agregar evento de clic al botón "Guardar Datos"
document.getElementById('guardarDatos').addEventListener('click', guardarDatos);