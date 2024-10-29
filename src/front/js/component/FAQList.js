import React from 'react';
import "../../styles/FAQList.css"; // Asegúrate de tener este archivo para estilos personalizados

const faqs = [
    {
        question: "¿Cuál es la mejor manera de organizar mi código y archivos en un proyecto?",
        answer: "La organización del código y archivos depende del tipo de proyecto, pero algunas buenas prácticas incluyen: crear carpetas separadas para componentes, estilos, imágenes y utilidades; utilizar nombres descriptivos y consistentes; y comentar tu código para mayor comprensión."
    },
    {
        question: "¿Qué herramientas debo utilizar para depurar mi código?",
        answer: "Existen varias herramientas útiles para depurar código, como las herramientas de desarrollador del navegador, debuggers en editores como Visual Studio Code y el uso de console.log para rastrear valores."
    },
    {
        question: "¿Cómo puedo aprender más sobre accesibilidad web?",
        answer: "Consulta guías como las Pautas de Accesibilidad para el Contenido Web (WCAG), usa herramientas de evaluación como WAVE o Lighthouse, y considera realizar pruebas con usuarios que tengan discapacidades."
    },
    {
        question: "¿Cuáles son las mejores prácticas para optimizar el rendimiento de una página web?",
        answer: "Minifica CSS y JavaScript, optimiza imágenes usando formatos como WebP y implementa la carga diferida para recursos que no son críticos."
    },
    {
        question: "¿Cómo puedo mejorar mis habilidades en cualquier lenguaje de programación?",
        answer: "Realiza pequeños proyectos regularmente, contribuye a proyectos de código abierto y participa en foros o meetups relacionados con el lenguaje."
    }
];

const FAQList = () => {
    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4" id='home-title'>Preguntas Frecuentes</h2>
            <ul className="list-group">
                {faqs.map((faq, index) => (
                    <li key={index} className="list-group-item mb-3 shadow" id='home-title'>
                        <h5 id='Question'>{faq.question}</h5>
                        <p id='Answer'>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQList;