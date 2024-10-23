import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Contexto inicial
export const Context = React.createContext(null);

// Función para inyectar el contexto
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState((prevState) => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions },
                    })),
            })
        );

        useEffect(() => {
            // Aquí puedes hacer solicitudes AJAX o inicializar datos
            // Ejemplo: Puedes hacer una solicitud de usuarios o configuración inicial
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
