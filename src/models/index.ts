interface IHit {
  recipe: IRecipe;
  _links: ILinks;
}

interface ILink {
  href: string;
  title: string;
}

interface ILinks {
  self: ILink;
  next: ILink;
}

interface IImagesInfo {
  THUMBNAIL: IImageInfo;
  SMALL: IImageInfo;
  REGULAR: IImageInfo;
  LARGE: IImageInfo;
}

interface IImageInfo {
  url: string;
  width: number;
  height: number;
}

interface IIngredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodId: string;
}

interface INutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

interface IDigestSub {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
}

interface IDigest {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: IDigestSub[];
}

enum Co2EmissionsClass {
  'A+' = 'A+',
  'A' = 'A',
  'B' = 'B',
  'C' = 'B',
  'D' = 'D',
  'E' = 'E',
  'F' = 'F',
  'G' = 'G',
}

export interface IRecipe {
  id: string;
  uri: string;
  label: string;
  image: string;
  images: IImagesInfo;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: IIngredient[];
  calories: number;
  glycemicIndex: number;
  inflammatoryIndex: number;
  totalCO2Emissions: number;
  co2EmissionsClass: Co2EmissionsClass;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  instructions: string[];
  tags: string[];
  externalId: string;
  totalNutrients: Record<string, INutrientInfo>;
  totalDaily: Record<string, INutrientInfo>;
  digest: IDigest[];
}

export interface ISearchRecipesResponse {
  from: number;
  to: number;
  count: number;
  _links: ILinks;
  hits: IHit[];
}

export interface ISearchRecipesParams {
  search: string;
  next: string;
}

export interface ISearchRecipeByIdResponse {
  recipe: IRecipe;
  _links: ILinks;
}
