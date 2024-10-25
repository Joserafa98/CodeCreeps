const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],  
            currentUser: null, 
            error: null, 
            clasificaciones: [], 
        },
        actions: {
            // Función para inicializar el estado
            initializeStore: () => {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");

                if (token && userId) {
                    // Si hay un token y un ID de usuario, los establece en el store
                    setStore({ currentUser: { id: userId }, error: null });
                }
            },

            // Función para registrar un usuario
            signupUser: async (userData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    });

                    console.log("Response:", response); // Muestra la respuesta completa

                    if (response.ok) {
                        const newUser = await response.json(); // Extrae la respuesta JSON
                        console.log("Nuevo usuario creado:", newUser); // Muestra los datos del nuevo usuario

                        // Actualiza el estado con el nuevo usuario
                        setStore({ users: [...getStore().users, newUser] });

                        return { success: true, newUser }; // Retorna verdadero si la operación es exitosa
                    } else {
                        let errorData;
                        try {
                            errorData = await response.json();
                        } catch (jsonError) {
                            console.error("Error al parsear la respuesta del error:", jsonError);
                            errorData = { msg: "Error desconocido" };
                        }

                        console.error("Error en la respuesta del servidor:", errorData);
                        return { success: false, msg: errorData.msg || "Error en el registro" };
                    }
                } catch (error) {
                    console.error("Error durante el registro del usuario:", error);
                    return { success: false, msg: "Error de red" };
                }
            },

            // Función para iniciar sesión
            loginUser: async (userData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        console.error("Error durante el inicio de sesión:", errorData);
                        throw new Error(errorData.msg || 'Error en el inicio de sesión');
                    }

                    const data = await resp.json();
                    
                    // Agregamos console.log para depurar
                    console.log('Datos de respuesta del servidor:', data);

                    // Asegúrate de que el token y el ID del usuario estén presentes
                    if (data.access_token && data.user_id) {
                        localStorage.setItem('userId', data.user_id);
                        localStorage.setItem('token', data.access_token);

                        console.log('ID del usuario:', data.user_id);
                        console.log('Token del usuario:', data.access_token);

                        // Actualiza el store con el usuario actual
                        setStore({ currentUser: { id: data.user_id }, error: null });
                        return { success: true, user: { id: data.user_id } };
                    } else {
                        throw new Error('La respuesta no contiene los datos esperados.');
                    }
                } catch (error) {
                    console.error("Error durante el inicio de sesión:", error);
                    setStore({ error: error.message });
                    return { success: false, msg: error.message };
                }
            },

            // Función para cerrar sesión
            logoutUser: async () => {
                try {
                    // Limpia el estado del usuario
                    setStore({ currentUser: null, error: null });
            
                    // Limpia el token y los datos del usuario del localStorage
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId"); // Cambié "userData" a "userId"
            
                    console.log("Usuario cerrado sesión correctamente.");
                } catch (error) {
                    console.error("Error durante el cierre de sesión:", error);
                    setStore({ error: error.message });
                }
            },
            
            // Función para crear una clasificación
            createClasificacion: async (userId, retoId) => {
                const token = localStorage.getItem('token'); // Obtén el token del localStorage
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/clasificacion`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Agrega el token aquí
                        },
                        body: JSON.stringify({ userId, retoId }),
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        return { success: false, msg: errorData.msg || 'Error al crear la clasificación' };
                    }
            
                    const data = await response.json();
                    return { success: true, data };
                } catch (error) {
                    console.error("Error al crear la clasificación:", error);
                    return { success: false, msg: error.message };
                }
            },            
        }
    };
};

export default getState;