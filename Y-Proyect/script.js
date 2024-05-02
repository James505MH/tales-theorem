// Definimos las variables globales para el estado de la demostración
let currentStep = 1;
const totalSteps = 7; 
let failedAttempts = 0;

// Array con los enunciados
const steps = ["¿Qué figura necesitamos para comenzar?",
               "Después, necesitamos una linea que nos ayude con la construcción... ¿dónde y cómo?",
               "Hay ángulos formados entre la recta paralela y los lados del triángulo que parecen ser los mismos. Por ejemplo:",
               "Además también de:",
               "Ya por último, hay un ángulo que se comparte en uno de los vértices, el cúal es:",
               "Notemos pues, que en el triángulo formado por los puntos △ADE y el triángulo formado por los puntos △ABC tienen los mismos ángulos definidos, por lo que podemos usar:",
               "La semejanza nos dice que si dos triángulos tienen sus ángulos correspondientes iguales, entonces sus lados correspondientes son proporcionales. Por lo tanto:"
            ];

// Array con las opciones de cada paso
const stepsOptions = [
    ["Cualquier triángulo","Un polígono industrial", "Un cuadrado","Cualquier figura de 4 lados"],
    ["Una línea perpendicular a uno de los vértices y alguno de los lados","Una línea que parte en tres partes alguna de las caras ", "Un línea que extiende una de las caras", "Una linea paralela a cualquiera de los lados dentro del triángulo"],
    ["El ángulo formado en ∡ADE es igual al formado en ∡ABE" , "El ángulo formado en ∡BAE es igual  al ángulo ∡ABC","El ángulo formado en ∡ADE es igual al formado en ∡ABC","El ángulo formado en ∡BCE es igual al ángulo ∡BDE"],
    ["El ángulo formado en ∡AED es igual al formado en ∡ACB" , "El ángulo formado en ∡BAE es igual  al ángulo ∡ABC","El ángulo formado en ∡ADE es igual al formado en ∡ABE","El ángulo formado en ∡BDE es igual al ángulo ∡BCE"],
    ["El ángulo formado en el vértice B","El ángulo formado en el vértice A","El ángulo formado en el vértice C","El ángulo formado en el vértice A y el ángulo del vértice C"],
    ["El teorema de Pitágoras para ambos triángulos","La suma de los ángulos internos de cada triángulo suma 180°","El analizar la semejanza que tienen los dos triángulos dados sus ángulos", "Comparar el área de los triángulos y medir los lados"],
    ["El área del triángulo △ABC es la mitad del área del triángulo △ABC","El perímetro del tríangulo △ABC es menor al perímetro del triángulo △ADE","Como los lados son proporcionales y sus ángulos iguales, ambos triángulos son semejantes","Como sus ángulos son iguales, y sus lados proporcionales, entonces se conserva el teorema de Pitagoras"]
];

//Array con los hints
const hints = ["Pista 1","Pista 2","Pista 3","Pista 4","Pista 5","Pista 6"];

// Array con las respuestas correctas de cada paso
const correctAnswers = ["Cualquier triángulo", 
                        "Una linea paralela a cualquiera de los lados dentro del triángulo", 
                        "El ángulo formado en ∡ADE es igual al formado en ∡ABC",
                        "El ángulo formado en ∡AED es igual al formado en ∡ACB",
                        "El ángulo formado en el vértice A",
                        "El analizar la semejanza que tienen los dos triángulos dados sus ángulos",
                        "Como los lados son proporcionales y sus ángulos iguales, ambos triángulos son semejantes"
                    ];

// Función para actualizar la interfaz de usuario con el paso actual
function updateUI() {
    // Mostrar el enunciado del paso actual
    const proofStepsElement = document.getElementById("proof-steps");
    const stepText = steps[currentStep - 1]; 
    // Reemplazar ciertas palabras con span para resaltarlas
    const highlightedText = stepText.replace(/\b(figura|linea|parecen|también|uno|triángulo formado|proporcionales)\b/gi, function(matched) {
        // Devolver la palabra resaltada con una clase de estilo
        return `<span class="highlighted">${matched}</span>`;
    });
    // Aquí agregamos el enunciado del paso actual con palabras resaltadas
    proofStepsElement.innerHTML = `<p>Paso ${currentStep}: ${highlightedText}</p>`;

    // Mostrar las opciones del paso actual
    document.getElementById("hint").textContent = "";
    const options = stepsOptions[currentStep - 1];
    const optionsHTML = options.map(option => `<button class="proof-step-button" onclick="checkAnswer('${option}')">${option}</button>`).join('');
    proofStepsElement.innerHTML += optionsHTML;
}

function checkAnswer(selectedOption) {
    const proofStepsElement = document.getElementById("proof-steps");
    const hintElement = document.getElementById("hint");
    const selectedButton = event.target; // Obtener el botón seleccionado

    if (selectedOption === correctAnswers[currentStep - 1]) {
        // Respuesta correcta, pasar al siguiente paso
        currentStep++;
        if (currentStep <= totalSteps) {
            document.getElementById("image").innerHTML = '<img src= "/images/paso' + currentStep + '.jpg">';
            updateUI();
        } else {
            // Si es el último paso, finaliza
            proofStepsElement.innerHTML = "<p>¡Demostración completada con éxito!</p>";

            // Agregar las respuestas correctas al div proof-steps
            const ulElement = document.createElement("ul");
            correctAnswers.forEach((answer, index) => {
                const liElement = document.createElement("li");
                liElement.textContent = `Paso ${index + 1}: ${answer}`;
                ulElement.appendChild(liElement);
            });
            proofStepsElement.appendChild(ulElement);
            
            const failedAtElement = document.getElementById("failedA")
            failedAtElement.textContent = `Número de Fallos: ${failedAttempts} `;

            const TimeElement = document.getElementById("Time")
            TimeElement.textContent = `Tiempo: ${time} segundos`;
        }
    } else {
        failedAttempts++; // Cuenta errores
        // Respuesta incorrecta
        if (!hintElement.textContent) {
            // Mostrar la pista en el primer intento fallido
            hintElement.textContent = hints[currentStep - 1];
        } else {
            // Remarcar la pista en el 2do intento
            hintElement.textContent += " Atento a la pista!";
        }

        // Cambiar estilo solo del botón seleccionado
        selectedButton.disabled = true;
        selectedButton.style.backgroundColor = "red";
    }
}

// Función para ocultar las preguntas al principio
function hideProofSteps() {
    document.getElementById("proof-steps").style.display = "none";
}

// Función para mostrar las preguntas y comenzar la actividad
function showProofSteps() {
    document.getElementById("proof-steps").style.display = "block";
    startButton.style.display = "none";
    document.getElementById("image").innerHTML = '<img src= "/images/pensar.jpg">';

    // Llamar a la función para comenzar la actividad
    updateUI();
}

// Agregar event listener al botón "Comenzar"
document.getElementById("startButton").addEventListener("click", showProofSteps);


// Al cargar la página, ocultar las preguntas al principio
window.onload = function() {
    hideProofSteps();
};



 