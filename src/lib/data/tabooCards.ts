import Papa from "papaparse"

import tabooCardsCsv from "./tabooCards.csv?raw"

export interface TabooCard {
  word: string
  forbidden: string[]
}

interface CsvRow {
  word: string
  forbidden1: string
  forbidden2: string
  forbidden3: string
  forbidden4: string
  forbidden5: string
}

const { data: records } = Papa.parse<CsvRow>(tabooCardsCsv, {
  header: true,
  skipEmptyLines: true,
})

export const tabooCards: TabooCard[] = records.map((row) => ({
  word: row.word,
  forbidden: [row.forbidden1, row.forbidden2, row.forbidden3, row.forbidden4, row.forbidden5],
}))
