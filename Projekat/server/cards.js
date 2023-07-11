var express = require('express')
var router = express.Router();

var cards = [
  {
    id: 1,
    name: 'Krenko, Mob Boss',
    imageUrl: 'https://cards.scryfall.io/large/front/c/d/cd9fec9d-23c8-4d35-97c1-9499527198fb.jpg?1601078209',
    price: 4.76,
    onSale: true,
    quantity: 10,
  },
  {
    id: 2,
    name: 'Hordeling Outburst',
    imageUrl: 'https://cards.scryfall.io/border_crop/front/e/4/e4138531-ef42-4c56-864e-d3525a4f2082.jpg?1562442178',
    price: 0.15,
    onSale: false,
    quantity: 36
  },
  {
    id: 3,
    name: 'Jace, Arcane Strategist',
    imageUrl: 'https://cards.scryfall.io/border_crop/front/b/6/b6a857fb-159f-40c4-8988-da91d8521a60.jpg?1558667625',
    price: 0.76,
    onSale: true,
    quantity: 12
  },
  {
    id: 4,
    name: "Shirei, Shizo's Caretaker",
    imageUrl: "https://cards.scryfall.io/border_crop/front/0/7/0757cb66-7aa2-41a2-8efc-f3f35b70ab9e.jpg?1559959257",
    price: 0.47,
    onSale: false,
    quantity: 28
  }
];

var cardsInCart = [];

router.get('/', (req, res) => {
  return res.status(200).json(cards);
});

router.get("/cart", (req, res) => {
  return res.status(200).json(cardsInCart);
});

router.post('/', (req, res) => {
  let card = req.body;
  console.log(card);
  if (card.id) {
    return res.status(400)
        .json({msg: 'Card seems to already have an id assigned'});
  }
  card.id = cards.length + 1;
  cards.push(card);
  console.log(cards);
  return res.status(200).json(card);
});

router.patch('/:id', (req, res) => {
  console.log("PATCH");
  let cardId = req.params.id;
  let foundCard = cards.find((card) => card.id == cardId);
  if (foundCard) {
    let changeInQuantity = req.body.changeInQuantity;
    let foundCardInCart = cardsInCart.find((card) => card.id === cardId);
    if (foundCardInCart) {
      foundCardInCart.quantity += changeInQuantity;
      console.log("Successfully updated cart list")
    } else {
      let cardInCart = {...foundCard};
      cardInCart.id = cardsInCart.length + 1;
      cardInCart.quantity = changeInQuantity;
      cardsInCart.push(cardInCart);
      console.log(cardInCart);
      console.log("Successfully updated cart")
    }
    foundCard.quantity -= changeInQuantity;
    // console.log(cards);
    return res.status(200).json({msg: 'Successfully updated listing'});
  }
  return res.status(400).json({msg: 'Card with id ' + cardId + ' not found.'});
});

router.patch("/cart/:id", (req, res) => {
  console.log("PATCH");
  let cardId = req.params.id;
  let lenght = cardsInCart.length;
  for (let i = 1; i <= lenght; i++) {
    if (i === cardId) {
      cardsInCart.splice(i, 1);
      console.log(cardsInCart)
      return res.status(200).json({msg: "Successfuly deleted item from cart!"});
    }
  }
  return res.status(400).json({msg: "There was a problem with removing an item from cart!"});
})

router.delete("/cart", (req, res) => {
  console.log("DELETE");
  let length = cardsInCart.length;
  for (let i = 0; i < length; i++) {
    cardsInCart.pop();
  }
  if (cardsInCart.length == 0) {
    return res.status(200).json({msg: "Successful order"});
  }
  return res.status(400).json({msg: "Failed to order! " + cardsInCart.length});
})

// router.patch("/cart/:id", (req, res) => {
//   console.log("PATCHING CART");
//   let cardId = req.params.id;
//   let foundCardInCart = cardsInCart.find((card) => card.id === cardId);
//   const changeInQuantity = req.body.changeInQuantity;
//   if (foundCardInCart) {
//     foundCardInCart.quantity += changeInQuantity;
//     console.log(cardsInCart);
//     return res.status(200).json({msg: "Successfully updated cart"});
//   }
//   const foundCard = cards.find((card) => card.id == cardId);
//   if (foundCard) {
//     cardsInCart.push(foundCard);
//     console.log("Card not found in cart. Addind to cart");
//     return res.status(200).json({msg: "Successfully updated cart"});
//   }
//   return res.status(400).json({msg: "Error with updating cart"});
// })

module.exports = router;