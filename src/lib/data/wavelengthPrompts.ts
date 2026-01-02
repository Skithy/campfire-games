import Papa from "papaparse"

import wavelengthPromptsCsv from "./wavelengthPrompts.csv?raw"

export type Prompt = [string, string]

interface PromptRow {
  left: string
  right: string
}

const { data: records } = Papa.parse<PromptRow>(wavelengthPromptsCsv, {
  header: true,
  skipEmptyLines: true,
})

export const wavelengthPrompts: Prompt[] = records.map((row) => [row.left, row.right])
