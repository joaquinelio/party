
export default class Deck {
  constructor(CardClass) {
    this.CardClass = CardClass;
    this.piles = {};
    this.reset();
  }

  reset() {
    const cards = this.CardClass.SUITS.flatMap(suit =>
      this.CardClass.NUMBERS.map(number =>
        new this.CardClass(number, suit)
      )
    );
    this.piles['main'] = cards;
  }

  getPile(name) {
    if (!this.piles[name]) {
      this.piles[name] = [];
    }
    return this.piles[name];
  }

  draw(fromPile = 'main') {
    return this.getPile(fromPile).shift() || null;
  }

  add(card, toPile = 'main') {
    if (!this.validateCard(card)) {
      throw new Error(`Carta inválida: ${card.number} de ${card.suit}`);
    }
    this.getPile(toPile).push(card);
  }

  move(card, fromPile = 'main', toPile = 'mesa') {
    const from = this.getPile(fromPile);
    const index = from.findIndex(c => c.equals(card));
    if (index === -1) return false;
    const [moved] = from.splice(index, 1);
    this.getPile(toPile).push(moved);
    return true;
  }

  list(pile = 'main') {
    return [...this.getPile(pile)];
  }

  cardsLeft(pile = 'main') {
    return this.getPile(pile).length;
  }

  validateCard(card) {
    return this.CardClass.isValidSuit(card.suit) &&
           this.CardClass.isValidNumber(card.number);
  }
}
