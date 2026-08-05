import BurntBasqueCheeseCake from "@/assets/images/burnt_basque_cheesecake.jpg";
import BiscuffCheeseCake from "@/assets/images/biscuff_cheesecake.jpg";
import BlueBerryCheeseCake from "@/assets/images/blue_berry_cheesecake.jpg";
import NutellaBurntCheeseCake from "@/assets/images/nutella_burnt_basque_cheesecake.jpg";
import StrawberryCheesecake from "@/assets/images/strawberry_cheesecake.jpg";
import BananaLoaf from "@/assets/images/banana_loaf.png";
import ChocoBrownies from "@/assets/images/choco_brownies.png";
import ChocoCrinkles from "@/assets/images/chocolate_crinkles.png";
import CookieBites from "@/assets/images/cookie_bites_with_choco_dip.jpg";
import Ensaymada from "@/assets/images/ensaymada.png";

export type Category = "Bread" | "Cheesecakes" | "Cookies" | "Brownies";

export interface ProductOption {
  id: string;
  label: string;
  priceDelta: number;
}
export interface ProductOptionGroup {
  id: string;
  label: string;
  type: "single" | "multi";
  options: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  category: Category;
  bestSeller?: boolean;
  ingredients: string[];
  allergens: string[];
  options?: ProductOptionGroup[];
}

export const categories: Category[] = [
  "Bread",
  "Brownies",
  "Cheesecakes",
  "Cookies",
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const products: Product[] = [
  {
    id: "b1599b20-39de-47e1-80d6-a511ae4e6a4f",
    name: "Choco Fudge Brownies",
    description:
      "Rich, fudgy chocolate brownies topped with a chocolate drizzle or crushed nuts.",
    longDescription:
      "A box of six dense, fudgy chocolate brownies baked to a deep, glossy crackle-top finish. Half the batch is finished with a swirl of melted chocolate drizzle, the other half topped with crushed nuts for a bit of crunch.",
    price: 250,
    image: ChocoBrownies,
    category: "Brownies",
    bestSeller: true,
    ingredients: [
      "Dark chocolate",
      "Butter",
      "Eggs",
      "Sugar",
      "All-purpose flour",
      "Cocoa powder",
      "Crushed nuts",
    ],
    allergens: ["Eggs", "Milk", "Wheat/Gluten", "Tree nuts"],
  },
  {
    id: "cad60d8b-6580-427d-839f-5a4dc7d76125",
    name: "Chocolate Crinkles",
    description:
      "Soft, fudgy chocolate cookies rolled in powdered sugar with a signature crackled top.",
    longDescription:
      "Classic chocolate crinkle cookies with a soft, brownie-like center and a delicate crackled sugar coating. Rich cocoa flavor in every bite, generously dusted with powdered sugar for that signature marbled look.",
    price: 150,
    image: ChocoCrinkles,
    category: "Cookies",
    ingredients: [
      "Cocoa powder",
      "All-purpose flour",
      "Eggs",
      "Butter",
      "Sugar",
      "Powdered sugar",
    ],
    allergens: ["Eggs", "Milk", "Wheat/Gluten"],
  },
  {
    id: "71b2f2e5-1667-474e-afcb-7f807954c082",
    name: "Cookie Bites with Chocolate Dip",
    description:
      "Bite-sized chocolate chip cookie bites served with a warm chocolate dipping sauce.",
    longDescription:
      "Soft, chewy chocolate chip cookie bites baked to golden perfection and served with a rich, warm chocolate dipping sauce on the side. A fun, shareable treat that's equal parts cozy and indulgent.",
    price: 120,
    image: CookieBites,
    category: "Cookies",
    bestSeller: true,
    ingredients: [
      "All-purpose flour",
      "Butter",
      "Brown sugar",
      "Eggs",
      "Chocolate chips",
      "Chocolate dipping sauce",
    ],
    allergens: ["Eggs", "Milk", "Wheat/Gluten"],
  },
  {
    id: "191cb68d-bbf2-4f70-b7b5-c2945530340a",
    name: "Cheese Ensaymada",
    description:
      "Soft, buttery ensaymada roll generously topped with grated cheese.",
    longDescription:
      "A pillowy soft, buttery Filipino brioche roll brushed with butter and generously topped with a mound of grated cheese. Slightly sweet, slightly salty, and best enjoyed warm with coffee or hot chocolate.",
    price: 85,
    image: Ensaymada,
    category: "Bread",
    ingredients: [
      "Flour",
      "Butter",
      "Eggs",
      "Sugar",
      "Yeast",
      "Grated cheese",
      "Milk",
    ],
    allergens: ["Eggs", "Milk", "Wheat/Gluten"],
  },
  {
    id: "33b3fa14-afe1-4480-8d4e-c51dbea9e0a9",
    name: "Nutella Burnt Basque Cheesecake",
    description:
      "Creamy burnt Basque-style cheesecake topped with a generous swirl of Nutella.",
    longDescription:
      "Our signature crustless burnt Basque cheesecake with its caramelized top and creamy, custardy center, finished with a thick swirl of Nutella hazelnut spread. Rich, indulgent, and impossible to resist.",
    price: 350,
    image: NutellaBurntCheeseCake,
    category: "Cheesecakes",
    bestSeller: true,
    ingredients: [
      "Cream cheese",
      "Eggs",
      "Sugar",
      "Heavy cream",
      "Nutella hazelnut spread",
    ],
    allergens: ["Eggs", "Milk", "Tree nuts (Hazelnut)"],
  },
  {
    id: "d1326b75-1d60-48d6-bb4a-84ce9446ee94",
    name: "Strawberry Burnt Cheesecake",
    description:
      "Burnt Basque cheesecake topped with a glossy homemade strawberry compote.",
    longDescription:
      "Creamy burnt Basque cheesecake crowned with a vibrant, glossy strawberry compote made from fresh strawberries. The tartness of the fruit balances beautifully with the rich, caramelized cheesecake base.",
    price: 250,
    image: StrawberryCheesecake,
    category: "Cheesecakes",
    ingredients: [
      "Cream cheese",
      "Eggs",
      "Sugar",
      "Heavy cream",
      "Fresh strawberries",
      "Strawberry compote",
    ],
    allergens: ["Eggs", "Milk"],
  },
  {
    id: "349f2715-acab-4132-a440-778f4a667ece",
    name: "Cashew Banana Loaf",
    description: "Moist banana bread loaf topped with whole cashews.",
    longDescription:
      "A moist, dense banana bread loaf made with ripe bananas and baked until golden, topped generously with whole roasted cashews for added crunch and nutty flavor. A comforting classic, great for breakfast or an afternoon snack.",
    price: 150,
    image: BananaLoaf,
    category: "Bread",
    ingredients: [
      "Ripe bananas",
      "All-purpose flour",
      "Eggs",
      "Butter",
      "Sugar",
      "Cashews",
    ],
    allergens: ["Eggs", "Milk", "Wheat/Gluten", "Tree nuts (Cashew)"],
  },
  {
    id: "d3aabc42-1c09-4b14-bf86-ba7235e295cb",
    name: "Biscoff Burnt Cheesecake",
    description:
      "Burnt Basque cheesecake layered with Biscoff spread and topped with a Lotus Biscoff cookie.",
    longDescription:
      "Creamy burnt Basque cheesecake generously layered with warm, gooey Biscoff cookie butter spread and topped with a whole Lotus Biscoff cookie. A caramelized, spiced treat for Biscoff lovers.",
    price: 250,
    image: BiscuffCheeseCake,
    category: "Cheesecakes",
    bestSeller: true,
    ingredients: [
      "Cream cheese",
      "Eggs",
      "Sugar",
      "Heavy cream",
      "Biscoff spread",
      "Lotus Biscoff cookie",
    ],
    allergens: ["Eggs", "Milk", "Wheat/Gluten", "Soy"],
  },
  {
    id: "179e652b-f183-4d52-aa68-6a6453f6581a",
    name: "Blueberry Burnt Cheesecake",
    description:
      "Burnt Basque cheesecake topped with a rich homemade blueberry compote.",
    longDescription:
      "Creamy, caramelized burnt Basque cheesecake topped with a thick, glossy blueberry compote loaded with whole blueberries. Sweet, slightly tart, and beautifully rich.",
    price: 250,
    image: BlueBerryCheeseCake,
    category: "Cheesecakes",
    ingredients: [
      "Cream cheese",
      "Eggs",
      "Sugar",
      "Heavy cream",
      "Blueberries",
      "Blueberry compote",
    ],
    allergens: ["Eggs", "Milk"],
  },
  {
    id: "d6d0731a-783f-4bdf-af17-c881f859bf5f",
    name: "Classic Burnt Basque Cheesecake",
    description:
      "Our original crustless burnt Basque cheesecake with a deep caramelized top and creamy center.",
    longDescription:
      "The classic burnt Basque cheesecake, baked at high heat until the top turns deeply caramelized and almost bitter-sweet, while the inside stays lusciously creamy and custardy. No crust, no fuss — just rich, unadulterated cheesecake.",
    price: 200,
    image: BurntBasqueCheeseCake,
    category: "Cheesecakes",
    bestSeller: true,
    ingredients: ["Cream cheese", "Eggs", "Sugar", "Heavy cream"],
    allergens: ["Eggs", "Milk"],
  },
];
