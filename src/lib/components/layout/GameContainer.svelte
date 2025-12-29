<script lang="ts">
  import type { Snippet } from "svelte"

  import { browser } from "$app/environment"
  import type { Color } from "$lib/utils/colors"

  import { type Orientation, setGameContainerContext } from "./gameContainerContext.svelte"
  import Navbar from "./Navbar.svelte"
  import PageBackground from "./PageBackground.svelte"
  import { setSettingsContext } from "./settingsContext.svelte"

  const MUSIC_STORAGE_KEY = "settings:musicEnabled"
  const VIBRATION_STORAGE_KEY = "settings:vibrationEnabled"

  function loadSetting(key: string, defaultValue: boolean): boolean {
    if (!browser) return defaultValue
    const stored = localStorage.getItem(key)
    return stored !== null ? stored === "true" : defaultValue
  }

  function saveSetting(key: string, value: boolean) {
    if (browser) {
      localStorage.setItem(key, String(value))
    }
  }

  let {
    children,
  }: {
    children: Snippet
  } = $props()

  let backgroundTop = $state<Color | undefined>(undefined)
  let backgroundBottom = $state<Color | undefined>(undefined)
  let orientation = $state<Orientation>("portrait")

  let isMusicEnabled = $state(loadSetting(MUSIC_STORAGE_KEY, true))
  let isVibrationEnabled = $state(loadSetting(VIBRATION_STORAGE_KEY, true))

  function setBackground(top: Color, bottom: Color) {
    backgroundTop = top
    backgroundBottom = bottom
  }

  function setOrientation(newOrientation: Orientation) {
    orientation = newOrientation
  }

  function toggleMusic() {
    isMusicEnabled = !isMusicEnabled
    saveSetting(MUSIC_STORAGE_KEY, isMusicEnabled)
  }

  function toggleVibration() {
    isVibrationEnabled = !isVibrationEnabled
    saveSetting(VIBRATION_STORAGE_KEY, isVibrationEnabled)
  }

  setGameContainerContext({
    get backgroundTop() {
      return backgroundTop
    },
    get backgroundBottom() {
      return backgroundBottom
    },
    get orientation() {
      return orientation
    },
    setBackground,
    setOrientation,
  })

  setSettingsContext({
    get isMusicEnabled() {
      return isMusicEnabled
    },
    get isVibrationEnabled() {
      return isVibrationEnabled
    },
    toggleMusic,
    toggleVibration,
  })
</script>

<div
  class={[
    "relative overflow-hidden",
    "flex flex-col items-center",
    orientation === "landscape"
      ? "h-full w-full max-h-112 max-w-200"
      : "h-full w-full max-w-md md:max-h-175",
    "mx-auto my-auto px-4 py-6",
    "md:rounded-2xl md:border md:border-white/10",
    "md:shadow-2xl",
  ]}
>
  {#if backgroundTop && backgroundBottom}
    <PageBackground top={backgroundTop} bottom={backgroundBottom} />
  {/if}
  {#if orientation !== "landscape"}
    <Navbar />
  {/if}
  <div class={["relative", "min-h-0 w-full flex-1"]}>
    {@render children()}
  </div>
</div>
