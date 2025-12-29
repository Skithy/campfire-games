<script lang="ts">
  import { onMount, type Snippet } from "svelte"

  import { browser } from "$app/environment"
  import type { Color } from "$lib/utils/colors"

  import { Orientation, setGameContainerContext } from "./gameContainerContext.svelte"
  import Navbar from "./Navbar.svelte"
  import PageBackground from "./PageBackground.svelte"
  import { setSettingsContext } from "./settingsContext.svelte"

  const MOBILE_BREAKPOINT = 640

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
  let orientation = $state<Orientation>(Orientation.Portrait)

  let windowWidth = $state(browser ? window.innerWidth : 1024)
  let windowHeight = $state(browser ? window.innerHeight : 768)
  let isMobilePortrait = $derived(windowWidth < MOBILE_BREAKPOINT)
  let needsRotation = $derived(orientation === Orientation.Landscape && isMobilePortrait)

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
    get isRotated() {
      return needsRotation
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

  function handleResize() {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  }

  onMount(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })
</script>

<div
  class={[
    "relative overflow-hidden",
    "flex flex-col items-center",
    needsRotation
      ? "px-4 py-6"
      : orientation === Orientation.Landscape
        ? "mx-auto my-auto h-full max-h-112 w-full max-w-200 px-4 py-6 md:rounded-2xl md:border md:border-white/10 md:shadow-2xl"
        : "mx-auto my-auto h-full w-full max-w-md px-4 py-6 md:max-h-175 md:rounded-2xl md:border md:border-white/10 md:shadow-2xl",
  ]}
  style:width={needsRotation ? `${windowHeight}px` : undefined}
  style:height={needsRotation ? `${windowWidth}px` : undefined}
  style:transform={needsRotation ? "rotate(90deg)" : undefined}
  style:transform-origin={needsRotation ? "center center" : undefined}
  style:position={needsRotation ? "absolute" : undefined}
  style:top={needsRotation ? `${(windowHeight - windowWidth) / 2}px` : undefined}
  style:left={needsRotation ? `${(windowWidth - windowHeight) / 2}px` : undefined}
>
  {#if backgroundTop && backgroundBottom}
    <PageBackground top={backgroundTop} bottom={backgroundBottom} />
  {/if}
  {#if orientation !== Orientation.Landscape}
    <Navbar />
  {/if}
  <div class={["relative", "min-h-0 w-full flex-1"]}>
    {@render children()}
  </div>
</div>
