const SERVER = import.meta.env.VITE_URL_API;

// Devuelve todos los registros de las tablas
export async function getDBModules() {
    try {
        const response = await fetch(`${SERVER}/modules`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener todos los módulos: ', error);
    }
}
