const photo = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`

// IMPORTANT: keep these pools deliberately small and verified. Random/tag-based photo
// services previously returned unrelated scenery and animals. These are fixed Unsplash
// photo IDs chosen for the food/drink type they represent, so the menu stays predictable.
const imageSets = {
  vegetable: [
    photo('photo-1512621776951-a57141f2eefd'),
    photo('photo-1547592180-85f173990554'),
    photo('photo-1562565652-a0d8f0c59eb4'),
  ],
  starter: [
    photo('photo-1504674900247-0877df9cc836'),
    photo('photo-1541544741938-0af808871cc0'),
    photo('photo-1515003197210-e0cd71810b5f'),
  ],
  seafood: [
    photo('photo-1565680018434-b513d5e5fd47'),
    photo('photo-1563379926898-05f4575a45d8'),
    photo('photo-1551248429-40975aa4de74'),
  ],
  pasta: [
    photo('photo-1473093295043-cdd812d0e601'),
    photo('photo-1621996346565-e3dbc646d9a9'),
    photo('photo-1556761223-4c4282c73f77'),
  ],
  meat: [
    photo('photo-1544025162-d76694265947'),
    photo('photo-1558030006-450675393462'),
    photo('photo-1414235077428-338989a2e8c0'),
  ],
  burger: [
    photo('photo-1568901346375-23c9450c58cd'),
    photo('photo-1571091718767-18b5b1457add'),
  ],
  dessert: [
    photo('photo-1551024601-bec78aea704b'),
    photo('photo-1571877227200-a0d98ea607e9'),
    photo('photo-1578985545062-69928b1d9587'),
  ],

  // Beverage pools: only fixed, restaurant/bar-relevant images. Do not add dynamic
  // Flickr/LoremFlickr/source URLs here; those caused the cat / street-photo regressions.
  cocktail: [
    photo('photo-1513558161293-cdaf765ed2fd'),
    photo('photo-1536935338788-846bb9981813'),
  ],
  cocktailDark: [
    photo('photo-1513558161293-cdaf765ed2fd'),
    photo('photo-1470337458703-46ad1756a187'),
  ],
  mocktail: [
    photo('photo-1513558161293-cdaf765ed2fd'),
    photo('photo-1497534446932-c925b458314e'),
  ],
  wine: [
    photo('photo-1510812431401-41d2bd2722f3'),
    photo('photo-1506377247377-2a5b3b417ebb'),
    photo('photo-1547595628-c61a29f496f0'),
  ],
  beer: [
    photo('photo-1720110919165-49df0e4f5d49'),
    photo('photo-1704431990600-3679fea86516'),
    photo('photo-1620219365986-e27f8b86d3dd'),
  ],
  cider: [
    photo('photo-1607358049845-4360f06be5b7'),
    photo('photo-1720110919165-49df0e4f5d49'),
  ],
  whiskey: [
    photo('photo-1527281400683-1aae777175f8'),
    photo('photo-1569529465841-dfecdab7503b'),
    photo('photo-1470337458703-46ad1756a187'),
  ],
  spirit: [
    photo('photo-1569529465841-dfecdab7503b'),
    photo('photo-1527281400683-1aae777175f8'),
  ],
  coffee: [
    photo('photo-1495474472287-4d71bcdd2085'),
    photo('photo-1509042239860-f550ce710b93'),
    photo('photo-1512568400610-62da28bc8a13'),
  ],
}

function from(set, index = 0) {
  const pool = imageSets[set] || imageSets.starter
  return pool[Math.abs(index) % pool.length]
}

export function menuImageForItem(name, category, index = 0) {
  const value = `${name} ${category}`.toLowerCase()

  // Exact/specific beverage matches first. This keeps named drinks visually sensible.
  if (/espresso martini/.test(value)) return from('cocktail', 1)
  if (/old fashioned|manhattan|boulevardier|paper plane/.test(value)) return from('whiskey', index)
  if (/negroni/.test(value)) return from('cocktailDark', index)
  if (/spritz|french 75/.test(value)) return from('wine', 2)
  if (/paloma|martini|sour|golden hour|velvet night|midnight garden|cocktail/.test(value)) return from('cocktail', index)

  if (/stout/.test(value)) return from('beer', 0)
  if (/witbier/.test(value)) return from('beer', 1)
  if (/lager|pilsner|ipa|ale|beer/.test(value)) return from('beer', index)
  if (/cider/.test(value)) return from('cider', index)

  if (/zero proof|no-groni|tonic|fizz|cooler|lemonade|mocktail|highball|smash/.test(value)) return from('mocktail', index)
  if (/champagne|prosecco|sancerre|chablis|barolo|riesling|chardonnay|sauvignon|pinot|cabernet|malbec|tempranillo|syrah|rosé|wine/.test(value)) return from('wine', index)
  if (/bourbon|whisk|single malt/.test(value)) return from('whiskey', index)
  if (/tequila|mezcal|rum|gin|cognac|amaro|port|spirit/.test(value)) return from('spirit', index)
  if (/espresso|coffee|cappuccino|affogato/.test(value)) return from('coffee', index)

  // Food matching.
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
