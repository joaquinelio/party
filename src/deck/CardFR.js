export default class CardFR {
  static SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
  static NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

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

  getSymbolText() {
    const symbols = {
      spades: "♠",
      hearts: "♥",
      diamonds: "♦",
      clubs: "♣"
    };
    return symbols[this.suit] || "?";
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

    // Número/letra
    const text = document.createElementNS(this.svgNS, "text");
    text.setAttribute("x", "10");
    text.setAttribute("y", "20");
    text.setAttribute("font-size", "18");
    text.setAttribute("fill", "black");
    text.textContent = this.number;
    card.appendChild(text);

    // Palo (como texto centrado)
    const symbol = this.getSymbolText();
    const suitText = document.createElementNS(this.svgNS, "text");
    suitText.setAttribute("x", "50");
    suitText.setAttribute("y", "90");
    suitText.setAttribute("text-anchor", "middle");
    suitText.setAttribute("font-size", "36");
    suitText.setAttribute("fill", this.suit === 'hearts' || this.suit === 'diamonds' ? "red" : "black");
    suitText.textContent = symbol;
    card.appendChild(suitText);

    return card;
  }
}
