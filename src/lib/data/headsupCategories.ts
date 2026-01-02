import Papa from "papaparse"

import { BLUE, GOLD, GREEN, ORANGE, PURPLE, RED } from "$lib/constants/colors"
import { Color } from "$lib/utils/colors"

import actionsCsv from "./headsup/actions.csv?raw"
import animalsCsv from "./headsup/animals.csv?raw"
import brandsCsv from "./headsup/brands.csv?raw"
import celebritiesCsv from "./headsup/celebrities.csv?raw"
import emojisCsv from "./headsup/emojis.csv?raw"
import foodCsv from "./headsup/food.csv?raw"
import moviesCsv from "./headsup/movies.csv?raw"
import occupationsCsv from "./headsup/occupations.csv?raw"
import pokemonGen1Csv from "./headsup/pokemon-gen1.csv?raw"
import sportsCsv from "./headsup/sports.csv?raw"
import superheroesCsv from "./headsup/superheroes.csv?raw"
import videoGamesCsv from "./headsup/video-games.csv?raw"

export interface HeadsUpCategory {
  id: string
  name: string
  icon: string
  color: Color
  prompts: string[]
}

interface PromptRow {
  prompt: string
}

function parsePrompts(csv: string): string[] {
  const { data } = Papa.parse<PromptRow>(csv, {
    header: true,
    skipEmptyLines: true,
  })
  return data.map((row) => row.prompt)
}

export const headsupCategories: HeadsUpCategory[] = [
  {
    id: "animals",
    name: "Animals",
    icon: "fa-solid fa-paw",
    color: GREEN,
    prompts: parsePrompts(animalsCsv),
  },
  {
    id: "movies",
    name: "Movies",
    icon: "fa-solid fa-film",
    color: PURPLE,
    prompts: parsePrompts(moviesCsv),
  },
  {
    id: "food",
    name: "Food & Drink",
    icon: "fa-solid fa-utensils",
    color: ORANGE,
    prompts: parsePrompts(foodCsv),
  },
  {
    id: "sports",
    name: "Sports",
    icon: "fa-solid fa-futbol",
    color: BLUE,
    prompts: parsePrompts(sportsCsv),
  },
  {
    id: "celebrities",
    name: "Famous People",
    icon: "fa-solid fa-star",
    color: GOLD,
    prompts: parsePrompts(celebritiesCsv),
  },
  {
    id: "actions",
    name: "Act It Out",
    icon: "fa-solid fa-person-running",
    color: RED,
    prompts: parsePrompts(actionsCsv),
  },
  {
    id: "pokemon-gen1",
    name: "Pokémon Gen 1",
    icon: "fa-solid fa-bolt",
    color: GOLD,
    prompts: parsePrompts(pokemonGen1Csv),
  },
  {
    id: "video-games",
    name: "Video Games",
    icon: "fa-solid fa-gamepad",
    color: PURPLE,
    prompts: parsePrompts(videoGamesCsv),
  },
  {
    id: "occupations",
    name: "Occupations",
    icon: "fa-solid fa-briefcase",
    color: BLUE,
    prompts: parsePrompts(occupationsCsv),
  },
  {
    id: "emojis",
    name: "Emojis",
    icon: "fa-solid fa-face-smile",
    color: GOLD,
    prompts: parsePrompts(emojisCsv),
  },
  {
    id: "brands",
    name: "Brands",
    icon: "fa-solid fa-tag",
    color: RED,
    prompts: parsePrompts(brandsCsv),
  },
  {
    id: "superheroes",
    name: "Superheroes",
    icon: "fa-solid fa-mask",
    color: RED,
    prompts: parsePrompts(superheroesCsv),
  },
]
