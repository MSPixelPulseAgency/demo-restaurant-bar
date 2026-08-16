const photo = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`

const imageSets = {
  vegetable: [
    photo('photo-1512621776951-a57141f2eefd'),
    photo('photo-1547592180-85f173990554'),
    photo('photo-1543353071-873f17a7a088'),
    photo('photo-1562565652-a0d8f0c59eb4'),
  ],
  starter: [
    photo('photo-1504674900247-0877df9cc836'),
    photo('photo-1541544741938-0af808871cc0'),
    photo('photo-1515003197210-e0cd71810b5f'),
    photo('photo-1559339352-11d035aa65de'),
  ],
  seafood: [
    photo('photo-1565680018434-b513d5e5fd47'),
    photo('photo-1563379926898-05f4575a45d8'),
    photo('photo-1551248429-40975aa4de74'),
    photo('photo-1547592166-23ac45744acd'),
  ],
  pasta: [
    photo('photo-1473093295043-cdd812d0e601'),
    photo('photo-1621996346565-e3dbc646d9a9'),
    photo('photo-1556761223-4c4282c73f77'),
    photo('photo-1608897013039-887f21d8c804'),
  ],
  meat: [
    photo('photo-1544025162-d76694265947'),
    photo('photo-1558030006-450675393462'),
    photo('photo-1547592166-23ac45744acd'),
    photo('photo-1414235077428-338989a2e8c0'),
  ],
  burger: [
    photo('photo-1568901346375-23c9450c58cd'),
    photo('photo-1571091718767-18b5b1457add'),
    photo('photo-1528735602780-2552fd46c7af'),
  ],
  dessert: [
    photo('photo-1551024601-bec78aea704b'),
    photo('photo-1571877227200-a0d98ea607e9'),
    photo('photo-1578985545062-69928b1d9587'),
    photo('photo-1563729784474-d77dbb933a9e'),
  ],
  cocktail: [
    photo('photo-1513558161293-cdaf765ed2fd'),
    photo('photo-1551024709-8f23befc6f87'),
    photo('photo-1551538827-9c037cb4f32a'),
    photo('photo-1536935338788-846bb9981813'),
  ],
  negroni: [
    'https://unsplash.com/photos/h8gggTw2CO4/download?force=true',
    photo('photo-1513558161293-cdaf765ed2fd'),
  ],
  mocktail: [
    photo('photo-1551538827-9c037cb4f32a'),
    photo('photo-1544145945-f90425340c7e'),
    photo('photo-1497534446932-c925b458314e'),
    photo('photo-1523677011781-c91d1bbe2f9d'),
  ],
  wine: [
    photo('photo-1510812431401-41d2bd2722f3'),
    photo('photo-1506377247377-2a5b3b417ebb'),
    photo('photo-1516594915697-87eb3b1c14ea'),
    photo('photo-1547595628-c61a29f496f0'),
  ],
  beer: [
    photo('photo-1651980935475-db8f6cd1c3a4'),
    photo('photo-1704431990600-3679fea86516'),
    photo('photo-1620219365986-e27f8b86d3dd'),
    photo('photo-1720110919165-49df0e4f5d49'),
  ],
  cider: [
    'https://unsplash.com/photos/d6lNTwBs5bo/download?force=true',
    photo('photo-1607358049845-4360f06be5b7'),
  ],
  whiskey: [
    photo('photo-1527281400683-1aae777175f8'),
    photo('photo-1569529465841-dfecdab7503b'),
    photo('photo-1470337458703-46ad1756a187'),
  ],
  spirit: [
    photo('photo-1569529465841-dfecdab7503b'),
    photo('photo-1527281400683-1aae777175f8'),
    photo('photo-1470337458703-46ad1756a187'),
  ],
  coffee: [
    photo('photo-1495474472287-4d71bcdd2085'),
    photo('photo-1509042239860-f550ce710b93'),
    photo('photo-1512568400610-62da28bc8a13'),
  ],
}

function from(set, index = 0) {
  const pool = imageSets[set] || imageSets.starter
  return pool[index % pool.length]
}

export function menuImageForItem(name, category, index = 0) {
  const value = `${name} ${category}`.toLowerCase()

  if (/stout/.test(value)) return from('beer', 3)
  if (/cider/.test(value)) return from('cider', name.toLowerCase().includes('pear') ? 1 : 0)
  if (/lager|pilsner|ipa|ale|witbier|beer/.test(value)) return from('beer', index)

  if (/negroni/.test(value)) return from('negroni', index)
  if (/zero proof|no-groni|tonic|fizz|cooler|lemonade|mocktail|highball|smash/.test(value)) return from('mocktail', index)
  if (/cocktail|martini|spritz|paloma|collins|daiquiri|french 75|paper plane|sour/.test(value)) return from('cocktail', index)

  if (/champagne|prosecco|sancerre|chablis|barolo|riesling|chardonnay|sauvignon|pinot|cabernet|malbec|tempranillo|syrah|rosé|wine/.test(value)) return from('wine', index)
  if (/bourbon|whisk|single malt|manhattan|boulevardier|old fashioned/.test(value)) return from('whiskey', index)
  if (/tequila|mezcal|rum|gin|cognac|amaro|port|spirit/.test(value)) return from('spirit', index)
  if (/espresso|coffee|cappuccino|affogato/.test(value)) return from('coffee', index)

  if (/oyster|shrimp|prawn|salmon|tuna|hamachi|crudo|scallop|octopus|branzino|cod|lobster|seafood|calamari|mussel/.test(value)) return from('seafood', index)
  if (/pasta|pappardelle|tagliatelle|tagliolini|rigatoni|ravioli|gnocchi|linguine|cacio/.test(value)) return from('pasta', index)
  if (/burger|slider|grilled cheese/.test(value)) return from('burger', index)
  if (/beef|steak|ribeye|filet|striploin|lamb|pork|duck|chicken/.test(value)) return from('meat', index)
  if (/beet|greens|broccolini|cauliflower|eggplant|mushroom|salad|feta|burrata|olive|vegetable/.test(value)) return from('vegetable', index)
  if (/dessert|cake|torte|panna cotta|cheesecake|tiramisu|pudding|crème|semifreddo|chocolate/.test(value)) return from('dessert', index)

  if (category === 'Desserts') return from('dessert', index)
  if (category === 'Pasta') return from('pasta', index)
  if (category === 'Raw Bar' || category === 'Steak & Seafood') return from('seafood', index)
  if (category === 'Cocktails') return from('cocktail', index)
  if (category === 'Zero Proof') return from('mocktail', index)
  if (category === 'Wine') return from('wine', index)
  if (category === 'Beer & Cider') return from('beer', index)
  if (category === 'Spirits') return from('spirit', index)
  if (category === 'After Dinner') return from('coffee', index)

  return from('starter', index)
}
