const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],  // Almacenar información del usuario registrado
            currentUser: null, // Almacenar el usuario actualmente logueado
            error: null, // Para almacenar errores
        },
        actions: {
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
                        // Intenta extraer información del error en formato JSON
                        let errorData;
                        try {
                            errorData = await response.json();
                        } catch (jsonError) {
                            console.error("Error al parsear la respuesta del error:", jsonError);
                            errorData = { msg: "Error desconocido" }; // Mensaje de error genérico
                        }

                        console.error("Error en la respuesta del servidor:", errorData); // Muestra el error del servidor
                        return { success: false, msg: errorData.msg || "Error en el registro" }; // Retorna falso y el mensaje de error
                    }
                } catch (error) {
                    console.error("Error durante el registro del usuario:", error); // Muestra el error de la solicitud
                    return { success: false, msg: "Error de red" }; // Retorna falso y un mensaje de error
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
						const errorData = await resp.json(); // Para obtener información adicional sobre el error
						console.error("Error durante el inicio de sesión:", errorData); // Agregado para depuración
						throw new Error(errorData.message || 'Error en el inicio de sesión');
					}
			
					const data = await resp.json();
					setStore({ currentUser: data.user, error: null }); // Guardamos el usuario logueado en el estado
					return { success: true, user: data.user }; // Devuelve un objeto con success y user
				} catch (error) {
					console.error("Error durante el inicio de sesión:", error);
					setStore({ error: error.message }); // Guardamos el error en el estado
					return { success: false, msg: error.message }; // Retorna un objeto de error
				}
			},

            // Función para cerrar sesión
            logoutUser: async () => {
                try {
                    setStore({ currentUser: null, error: null }); // Limpiar el estado del usuario
                } catch (error) {
                    console.error("Error durante el cierre de sesión:", error);
                    setStore({ error: error.message }); // Guardamos el error en el estado
                }
            },
            // Función para obtener todos los usuarios
            getAllUsers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/usuarios`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const users = await response.json();
                        setStore({ users: users }); // Actualiza el estado con la lista de usuarios
                        return { success: true, users }; // Devuelve los usuarios obtenidos
                    } else {
                        console.error("Error al obtener los usuarios");
                        return { success: false, msg: "Error al obtener los usuarios" };
                    }
                } catch (error) {
                    console.error("Error en la solicitud GET de usuarios:", error);
                    return { success: false, msg: "Error de red" };
                }
            },

            // Función para obtener un usuario por su ID
            getUser: async (userId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/usuarios/${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const user = await response.json();
                        return { success: true, user }; // Devuelve el usuario obtenido
                    } else {
                        console.error("Error al obtener el usuario por ID");
                        return { success: false, msg: "Error al obtener el usuario por ID" };
                    }
                } catch (error) {
                    console.error("Error en la solicitud GET de usuario por ID:", error);
                    return { success: false, msg: "Error de red" };
                }
            },
        }
    };
};

export default getState;