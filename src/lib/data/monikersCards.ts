import Papa from "papaparse"

import conceptCsv from "./monikers/concept.csv?raw"
import entertainmentCsv from "./monikers/entertainment.csv?raw"
import geographyCsv from "./monikers/geography.csv?raw"
import historyCsv from "./monikers/history.csv?raw"
import mythologyCsv from "./monikers/mythology.csv?raw"
import personCsv from "./monikers/person.csv?raw"

export interface MonikersCard {
  name: string
  description: string
  category: "person" | "concept" | "mythology" | "history" | "geography" | "entertainment"
}

interface CardRow {
  name: string
  description: string
}

function parseCards(
  csv: string,
  category: MonikersCard["category"]
): MonikersCard[] {
  const { data } = Papa.parse<CardRow>(csv, {
    header: true,
    skipEmptyLines: true,
  })
  return data.map((row) => ({
    name: row.name,
    description: row.description,
    category,
  }))
}

export const monikersCards: MonikersCard[] = [
  ...parseCards(personCsv, "person"),
  ...parseCards(conceptCsv, "concept"),
  ...parseCards(mythologyCsv, "mythology"),
  ...parseCards(historyCsv, "history"),
  ...parseCards(geographyCsv, "geography"),
  ...parseCards(entertainmentCsv, "entertainment"),
]
