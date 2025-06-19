export default class CardSP {
  static SUITS = ['oro', 'copa', 'espada', 'basto'];
  static NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(number, suit) {
    this.number = number;
    this.suit = suit;
    this.svgNS = "http://www.w3.org/2000/svg";
  }

  static isValidSuit(suit) {
    return this.SUITS.includes(suit);
  }

  static isValidNumber(number) {
    return this.NUMBERS.includes(number);
  }

  equals(otherCard) {
    return (
      otherCard &&
      otherCard.number === this.number &&
      otherCard.suit === this.suit
    );
  }

  id() {
    return `${this.number}-${this.suit}`;
  }

  createSymbolMarkup() {
    const defs = {
      oro: `<circle cx="50" cy="50" r="20" fill="gold" />`,
      copa: `<rect x="30" y="30" width="40" height="40" fill="red" />`,
      espada: `<polygon points='30,2 55,35 2,55' fill='blue' stroke='black'/>`,
      basto: `<path d="M 50 10 Q 10 50 50 90 Q 90 50 50 10" fill="brown" />`
    };
    return defs[this.suit] || '';
  }

  svg() {
    const card = document.createElementNS(this.svgNS, "svg");
    card.setAttribute("viewBox", "0 0 100 150");
    card.setAttribute("width", "100");
    card.setAttribute("height", "150");
    card.setAttribute("class", "card");

    // Fondo
    const rect = document.createElementNS(this.svgNS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100");
    rect.setAttribute("height", "150");
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2");
    card.appendChild(rect);

    // Número en esquina
    const text = document.createElementNS(this.svgNS, "text");
    text.setAttribute("x", "70");
    text.setAttribute("y", "20");
    text.setAttribute("font-size", "18");
    text.setAttribute("fill", "black");
    text.textContent = this.number;
    card.appendChild(text);

    // Posiciones por número (1 a 12)
    const positions = [
      [[50, 75]],
      [[50, 50], [50, 100]],
      [[30, 30], [50, 75], [70, 120]],
      [[30, 50], [70, 50], [30, 100], [70, 100]],
      [[30, 30], [70, 30], [50, 75], [30, 120], [70, 120]],
      [[30, 30], [70, 30], [30, 75], [70, 75], [30, 120], [70, 120]],
      [[30, 30], [70, 30], [50, 60], [30, 90], [70, 90], [30, 120], [70, 120]],
      [[30, 30], [70, 30], [30, 60], [70, 60], [30, 90], [70, 90], [30, 120], [70, 120]],
      [[30, 30], [70, 30], [30, 52], [70, 52], [50, 74], [30, 96], [70, 96], [30, 120], [70, 120]],
      [[50, 75]],
      [[50, 75]],
      [[50, 75]],
    ];

    const sizes = [
      100, 50, 50, 50, 33, 33, 25, 25, 20, 100, 100, 100,
    ];

    const symbolMarkup = this.createSymbolMarkup();

    // Palo junto al número
    if (symbolMarkup) {
      const symbolCorner = document.createElementNS(this.svgNS, "g");
      symbolCorner.innerHTML = symbolMarkup;
      symbolCorner.setAttribute("transform", "translate(80,1) scale(0.2)");
      card.appendChild(symbolCorner);
    }

    // Repetir símbolo según número
    const layout = positions[this.number - 1] || [];
    const scale = (sizes[this.number - 1] || 100) / 100 * 1.3;

    layout.forEach(([x, y]) => {
      const g = document.createElementNS(this.svgNS, "g");
      g.innerHTML = symbolMarkup;
      g.setAttribute("transform", `translate(${x - 50 * scale}, ${y - 50 * scale}) scale(${scale})`);
      card.appendChild(g);
    });

    return card;
  }
}

