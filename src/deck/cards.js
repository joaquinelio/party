class Cards {
    constructor(svgContainer) {
        this.svgContainer = document.getElementById(svgContainer);
        this.svgNS = "http://www.w3.org/2000/svg";
    }

    // Crear los símbolos directamente en JavaScript
    createSymbol(id) {
        // Define los símbolos directamente en JS como elementos SVG
        const symbolDefs = {
            
            oro: `<circle cx="50" cy="50" r="20" fill="gold" />`, // ORO (por ejemplo, un círculo dorado)
            copa: `<rect x="30" y="30" width="40" height="40" fill="red" />`, // COPA (por ejemplo, un rectángulo)
           // espada: `<line x1="10" y1="10" x2="90" y2="90" stroke="blue" stroke-width="4" />`, // ESPADA (línea diagonal)
            basto: `<path d="M 50 10 Q 10 50 50 90 Q 90 50 50 10" fill="brown" />`, // BASTO (por ejemplo, una forma)
            
            // oro: "<circle cx='10' cy='10' r='8' fill='gold' stroke='black'/>",
            // copa: "<rect x='5' y='5' width='10' height='10' fill='red' stroke='black'/>",
            espada: "<polygon points='30,2 55,35 2,55' fill='blue' stroke='black'/>",
            // basto: "<rect x='8' y='2' width='4' height='16' fill='brown' stroke='black'/>"

        };

        return symbolDefs[id] || ''; // Devuelve el símbolo correspondiente
    }

    createCard(number, suit) {
        // Limpiar cualquier carta previa
        this.svgContainer.innerHTML = "";

        const card = document.createElementNS(this.svgNS, "svg");
        card.setAttribute("viewBox", "0 0 100 150");
        card.setAttribute("width", "100");
        card.setAttribute("height", "150");
        card.setAttribute("class", "card");

        // Fondo de la carta
        const rect = document.createElementNS(this.svgNS, "rect");
        rect.setAttribute("x", "0");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", "100");
        rect.setAttribute("height", "150");
        rect.setAttribute("fill", "white");
        rect.setAttribute("stroke", "black");
        rect.setAttribute("stroke-width", "2");
        card.appendChild(rect);

        // Número en la esquina
        const text = document.createElementNS(this.svgNS, "text");
        text.setAttribute("x", "70");
        text.setAttribute("y", "20");
        text.setAttribute("font-size", "18");
        text.setAttribute("fill", "black");
        text.textContent = number;
        card.appendChild(text);

        
        // Posiciones de los palos (Distribución según número)
        const positions = [     
            //  x   50  //  30 70  //  30 50 70 
            //  y   75  // 50 100   // 30 75 120    //  30 60 90 120    //  30 52 74 96 120     
            [[50, 75]], // 1  
            [[50, 50], [50, 100]], // 2
            [[30, 30], [50, 75], [70, 120]], // 3
            [[30, 50], [70, 50], [30, 100], [70, 100]], // 4
            [[30, 30], [70, 30], [50, 75], [30, 120], [70, 120]], // 5
            [[30, 30], [70, 30], [30, 75], [70, 75], [30, 120], [70, 120]], // 6
            [[30, 30], [70, 30], [50, 60], [30, 90], [70, 90], [30, 120], [70, 120],], // 7
            [[30, 30], [70, 30], [30, 60], [70, 60], [30, 90], [70, 90], [30, 120], [70, 120 ]], // 8
            [[30, 30], [70, 30], [30, 52], [70, 52], [50, 74], [30, 96], [70, 96], [30, 120], [70, 120]], // 9
            [[50, 75]], // 10
            [[50, 75]], // 11
            [[50, 75]], // 12
        ]        
        // escala en %
        const sizes = [
            100, 50, 50, 50, 33, 33, 25, 25, 20, 100, 100, 100,
        ]


        // Símbolo del palo junto al número
        const symbolIconHTML = this.createSymbol(suit);
        const suitIcon = document.createElementNS(this.svgNS, "g");
        suitIcon.innerHTML = symbolIconHTML;
        suitIcon.setAttribute("transform", "translate(80,1) scale(0.2)");
        card.appendChild(suitIcon);

        // Obtener el símbolo para el palo
        const symbolHTML = this.createSymbol(suit);

        // Colocar los símbolos en la carta
        if (symbolHTML && positions[number - 1]) {
            positions[number - 1].forEach(([x, y]) => {
                const symbol = document.createElementNS(this.svgNS, "g");
                symbol.innerHTML = symbolHTML; // Insertar el SVG del símbolo

                // Posicionar el símbolo
                const escala = sizes[number - 1] / 100 * 1.3
 
                symbol.setAttribute("transform", `translate(${(x - 50 * escala  ) }, ${(y - 50 * escala  ) }) scale(${escala}) `); // Ajustamos la posición según la carta
                card.appendChild(symbol);

/*              Futuro:
                Si quieres girar un símbolo 90 grados alrededor de su punto central (50, 75), lo harías así:

                symbol.setAttribute("transform", `translate(${x}, ${y}) rotate(90, ${x}, ${y})`);
                Explicación:
                translate(${x}, ${y}) → Mueve el símbolo a su posición correcta.
                
                rotate(90, ${x}, ${y}) → Rota 90 grados en torno a (x, y), que es su posición ya trasladada.

                1) Volteo 3D (flip)
                Se envuelve la carta en un div con perspective, y dentro van dos div:

                Frente (cara de la carta)

                Dorso (boca abajo, imagen de dorso)

                Al hacer rotateY(180deg), el dorso aparece y la cara desaparece.
*/


            });
        }
    

        // Añadir la carta al contenedor
        this.svgContainer.appendChild(card);
    }
}

// Instanciar el mazo
const cards = new Cards("deckContainer");

/*

// Función para actualizar la carta desde los inputs
function drawCard() {
    const number = parseInt(document.getElementById("numberSelect").value);
    const suit = document.getElementById("suitSelect").value;
    cards.createCard(number, suit);
}

// Configuración de eventos
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("numberSelect").addEventListener("change", drawCard);
    document.getElementById("suitSelect").addEventListener("change", drawCard);
    drawCard(); // Dibujar la carta inicial
});

*/
