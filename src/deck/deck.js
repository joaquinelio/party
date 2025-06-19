import Card from './Card'; // asumo que Card ya expone un método .svg() que devuelve un string SVG

export default class Deck {
  constructor() {
    this.reset();
  }

  reset() {
    // Crear la baraja española: 40 cartas (1‑7, 10‑12 de oros, copas, espadas, bastos)
    const palos = ['oros', 'copas', 'espadas', 'bastos'];
    const numeros = [1,2,3,4,5,6,7,10,11,12];
    this.cards = palos.flatMap(palo =>
      numeros.map(num => new Card(num, palo))
    );
    return this; // para encadenar
  }

  shuffle() {
    // Algoritmo Fisher‑Yates
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this;
  }

  draw() {
    // Saca la primera carta del mazo
    return this.cards.shift() || null;
  }

  drawAndRender(targetDiv) {
    // targetDiv: elemento DOM o selector
    const card = this.draw();
    if (!card) {
      console.warn('No quedan cartas en el mazo');
      return null;
    }
    const svg = card.svg(); // asumo Card.svg() devuelve string de SVG
    let container;
    if (typeof targetDiv === 'string') {
      container = document.querySelector(targetDiv);
    } else {
      container = targetDiv;
    }
    if (!container) {
      console.error('Div destino no encontrado:', targetDiv);
      return null;
    }
    container.innerHTML = svg;
    return card;
  }

  cardsLeft() {
    return this.cards.length;
  }
}
