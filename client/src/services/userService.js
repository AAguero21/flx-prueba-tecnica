const API_URL = "http://localhost:4000/usuarios";

export async function getUsuarios() {
    const res = await fetch(API_URL);
    return await res.json();
    
}

// Crear un nuevo usuario
export async function createUsuario(date) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },

        body: JSON.stringify(date),

    });
    return await res.json();
}

// Actualizar un usuario existente por ID
export async function updateUsuario(id, date) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",  
        },

        body: JSON.stringify(date),

    });
    return await res.json();
}

// Eliminar un usuario por ID
export async function deleteUsuario(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    
    // Verificar que la respuesta sea exitosa antes de continuar
    if (!res.ok) {
        throw new Error('Error al eliminar el usuario');
    }
}




