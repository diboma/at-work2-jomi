// ID-nummers:
// 1-7: Functies
// 8-14: Activiteiten en participatie
// 15-27: Omgevingsfactoren en externe factoren
// 28-40: Persoonlijke factoren
// 41-47: Andere werkvaardigheden

const icfRatings = [
  // Functies (1-7)
  {
    id: 1,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.0',
    description: 'GEEN stoornis (geen, afwezig, verwaarloosbaar, ...) 0-4%',
    icf_category_id: 1,
  },
  {
    id: 2,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.1',
    description: 'LICHTE stoornis (gering, laag, ...) 5-24%',
    icf_category_id: 1,
  },
  {
    id: 3,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.2',
    description: 'MATIGE stoornis (tamelijk, ...) 25-49%',
    icf_category_id: 1,
  },
  {
    id: 4,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.3',
    description: 'ERNSTIGE stoornis (aanzienlijk, hoog, sterk, ...) 50-95%',
    icf_category_id: 1,
  },
  {
    id: 5,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.4',
    description: 'VOLLEDIGE stoornis (totaal, ...) 96-100%',
    icf_category_id: 1,
  },
  {
    id: 6,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.8',
    description: 'niet gespecificeerd',
    icf_category_id: 1,
  },
  {
    id: 7,
    title: 'Mate of omvang stoornis',
    rating: 'xxx.9',
    description: 'niet van toepassing',
    icf_category_id: 1,
  },
  // Activiteiten en participatie (8-14)
  {
    id: 8,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.0',
    description:
      'GEEN beperking/participatieprobleem (geen, afwezig, verwaarloosbaar) 0-4%',
    icf_category_id: 2,
  },
  {
    id: 9,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.1',
    description: 'LICHTE beperking/participatieprobleem (gering, laag) 5-24%',
    icf_category_id: 2,
  },
  {
    id: 10,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.2',
    description: 'MATIGE beperking/participatieprobleem (tamelijk) 25-49%',
    icf_category_id: 2,
  },
  {
    id: 11,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.3',
    description:
      'ERNSTIGE beperking/participatieprobleem (hoog, sterk, aanzienlijk) 50-95%',
    icf_category_id: 2,
  },
  {
    id: 12,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.4',
    description: 'VOLLEDIGE beperking/participatieprobleem (totaal) 96-100%',
    icf_category_id: 2,
  },
  {
    id: 13,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.8',
    description: 'niet gespecificeerde beperking/participatieprobleem',
    icf_category_id: 2,
  },
  {
    id: 14,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.9',
    description: 'niet van toepassing',
    icf_category_id: 2,
  },
  // Omgevingsfactoren en externe factoren (15-27)
  {
    id: 15,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.0',
    description:
      'GEEN belemmerende factor (geen, afwezig, verwaarloosbaar,....) 0-4%',
    icf_category_id: 3,
  },
  {
    id: 16,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.1',
    description: 'LICHT belemmerende factor (gering, laag,...) 5-24%',
    icf_category_id: 3,
  },
  {
    id: 17,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.2',
    description: 'MATIG belemmerende factor (tamelijk,...) 25-49%',
    icf_category_id: 3,
  },
  {
    id: 18,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.3',
    description:
      'AANZIENLIJK belemmerende factor (hoog, sterk, ernstig,...) 50-95%',
    icf_category_id: 3,
  },
  {
    id: 19,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.4',
    description: 'VOLLEDIG belemmerende factor (totaal,...) 96-100%',
    icf_category_id: 3,
  },
  {
    id: 20,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+0',
    description:
      'GEEN ondersteunende factor (geen, afwezig, verwaarloosbaar,....) 0-4%',
    icf_category_id: 3,
  },
  {
    id: 21,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+1',
    description: 'LICHT ondersteunende factor (gering, laag,...) 5-24%',
    icf_category_id: 3,
  },
  {
    id: 22,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+2',
    description: 'MATIG ondersteunende factor (tamelijk,...) 25-49%',
    icf_category_id: 3,
  },
  {
    id: 23,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+3',
    description:
      'AANZIENLIJK ondersteunde factor (hoog, sterk, ernstig,...) 50-95%',
    icf_category_id: 3,
  },
  {
    id: 24,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+4',
    description: 'VOLLEDIG ondersteunende factor (totaal,...) 96-100%',
    icf_category_id: 3,
  },
  {
    id: 25,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.8',
    description: 'belemmerende factor, niet gespecificeerd',
    icf_category_id: 3,
  },
  {
    id: 26,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+8',
    description: 'ondersteunende factor, niet gespecificeerd',
    icf_category_id: 3,
  },
  {
    id: 27,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.9',
    description: 'niet van toepassing',
    icf_category_id: 3,
  },
  // Persoonlijke factoren (28-40)
  {
    id: 28,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.0',
    description:
      'GEEN belemmerende factor (geen, afwezig, verwaarloosbaar,....) 0-4%',
    icf_category_id: 4,
  },
  {
    id: 29,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.1',
    description: 'LICHT belemmerende factor (gering, laag,...) 5-24%',
    icf_category_id: 4,
  },
  {
    id: 30,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.2',
    description: 'MATIG belemmerende factor (tamelijk,...) 25-49%',
    icf_category_id: 4,
  },
  {
    id: 31,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.3',
    description:
      'AANZIENLIJK belemmerende factor (hoog, sterk, ernstig,...) 50-95%',
    icf_category_id: 4,
  },
  {
    id: 32,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.4',
    description: 'VOLLEDIG belemmerende factor (totaal,...) 96-100%',
    icf_category_id: 4,
  },
  {
    id: 33,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+0',
    description:
      'GEEN ondersteunende factor (geen, afwezig, verwaarloosbaar,....) 0-4%',
    icf_category_id: 4,
  },
  {
    id: 34,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+1',
    description: 'LICHT ondersteunende factor (gering, laag,...) 5-24%',
    icf_category_id: 4,
  },
  {
    id: 35,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+2',
    description: 'MATIG ondersteunende factor (tamelijk,...) 25-49%',
    icf_category_id: 4,
  },
  {
    id: 36,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+3',
    description:
      'AANZIENLIJK ondersteunde factor (hoog, sterk, ernstig,...) 50-95%',
    icf_category_id: 4,
  },
  {
    id: 37,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+4',
    description: 'VOLLEDIG ondersteunende factor (totaal,...) 96-100%',
    icf_category_id: 4,
  },
  {
    id: 38,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.8',
    description: 'belemmerende factor, niet gespecificeerd',
    icf_category_id: 4,
  },
  {
    id: 39,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.+8',
    description: 'ondersteunende factor, niet gespecificeerd',
    icf_category_id: 4,
  },
  {
    id: 40,
    title: 'Belemmerende - bevorderende factor',
    rating: 'xxx.9',
    description: 'niet van toepassing',
    icf_category_id: 4,
  },
  // Andere werkvaardigheden (41-47)
  {
    id: 41,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.0',
    description:
      'GEEN beperking/participatieprobleem (geen, afwezig, verwaarloosbaar) 0-4%',
    icf_category_id: 5,
  },
  {
    id: 42,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.1',
    description: 'LICHTE beperking/participatieprobleem (gering, laag) 5-24%',
    icf_category_id: 5,
  },
  {
    id: 43,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.2',
    description: 'MATIGE beperking/participatieprobleem (tamelijk) 25-49%',
    icf_category_id: 5,
  },
  {
    id: 44,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.3',
    description:
      'ERNSTIGE beperking/participatieprobleem (hoog, sterk, aanzienlijk) 50-95%',
    icf_category_id: 5,
  },
  {
    id: 45,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.4',
    description: 'VOLLEDIGE beperking/participatieprobleem (totaal) 96-100%',
    icf_category_id: 5,
  },
  {
    id: 46,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.8',
    description: 'niet gespecificeerde beperking/participatieprobleem',
    icf_category_id: 5,
  },
  {
    id: 47,
    title: 'Uitvoering en vermogen',
    rating: 'xxx.9',
    description: 'niet van toepassing',
    icf_category_id: 5,
  },
];

export default icfRatings;

/*

  { id: null, title: '', rating: '', description: '', icf_category_id: null},

*/
