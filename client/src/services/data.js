const base = import.meta.env.BASE_URL;

export const materials = [
  {
    id: 1,
    name: 'Sodium Lauryl Sulfate (SLS)',
    formula: 'C₁₂H₂₅SO₄Na',
    quantity: '25 ml',
    image: `${base}SLS.png`,
    description: 'Sodium Lauryl Sulfate is a surfactant with the chemical formula C₁₂H₂₅SO₄Na. It is the main cleaning agent used in liquid soap. It helps remove dirt and oil by reducing surface tension and also produces foam or lather, which improves the cleaning efficiency of the soap.'
  },
  {
    id: 2,
    name: 'Glycerol (Glycerin)',
    formula: 'C₃H₈O₃',
    quantity: '10 ml',
    image: `${base}Glyserol.png`,
    description: 'Glycerol has the chemical formula C₃H₈O₃ and acts as a humectant in liquid soap. It helps retain moisture in the skin, preventing dryness. It makes the soap gentle and keeps the skin soft, smooth, and hydrated.'
  },
  {
    id: 3,
    name: 'Sodium Hydroxide (NaOH)',
    formula: 'NaOH',
    quantity: '5 g',
    image: `${base}NaOH.png`,
    description: 'Sodium Hydroxide has the chemical formula NaOH and is a strong base (alkali). It plays an important role in the soap-making process by helping in the formation of soap through chemical reactions. It must be handled carefully as it is corrosive in nature.'
  },
  {
    id: 4,
    name: 'Castor Oil',
    formula: 'C₁₈H₃₄O₃',
    quantity: '10 ml',
    image: `${base}Castor oil.png`,
    description: 'Castor oil mainly contains ricinoleic acid with the formula C₁₈H₃₄O₃. It is used to provide moisture and improve the texture of the liquid soap. It makes the soap smoother and enhances its consistency and skin-friendly properties.'
  },
  {
    id: 5,
    name: 'Distilled Water',
    formula: 'H₂O',
    quantity: '20 ml',
    image: `${base}Distilled Water.png`,
    description: 'Distilled water has the chemical formula H₂O and acts as a solvent in liquid soap preparation. It helps dissolve all the ingredients and forms the base of the solution. It ensures uniform mixing and proper consistency of the final product.'
  },
];

export const steps = [
  {
    id: 1,
    title: 'Mixing',
    description: 'Dissolve SLS and NaOH in distilled water. Add glycerol and castor oil incrementally while stirring.',
    animationState: 'mixing'
  },
  {
    id: 2,
    title: 'Heating',
    description: 'Heat the mixture gently to promote saponification and ensure all ingredients are well combined.',
    animationState: 'heating'
  },
  {
    id: 3,
    title: 'Cooling',
    description: 'Allow the mixture to cool down slowly to room temperature to stabilize the soap base.',
    animationState: 'cooling'
  },
  {
    id: 4,
    title: 'Filtration',
    description: 'Filter the liquid to remove any undissolved particles or impurities for a clear finish.',
    animationState: 'filtration'
  },
  {
    id: 5,
    title: 'Final Liquid Soap',
    description: 'The final product is ready! A smooth, effective, and hygienic liquid soap.',
    animationState: 'final'
  },
];

export const media = {
  video: `${base}chem_AI.mp4`, 
  diagrams: [
    { title: 'Block Diagram', image: `${base}Block Diagram_liquid Soap.png` },
    { title: 'Process Flow Diagram', image: `${base}Process Flow Diagram.png` },
  ]
};
