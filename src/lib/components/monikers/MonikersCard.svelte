<script lang="ts">
  import type { MonikersCard } from "$lib/data/monikersCards"
  import type { Color } from "$lib/utils/colors"

  let {
    card,
    teamColor,
    showDescription = true,
  }: {
    card: MonikersCard
    teamColor: Color
    showDescription?: boolean
  } = $props()

  const categoryIcons: Record<string, string> = {
    person: "fa-solid fa-user",
    concept: "fa-solid fa-lightbulb",
    mythology: "fa-solid fa-dragon",
    history: "fa-solid fa-landmark",
    geography: "fa-solid fa-earth-americas",
    entertainment: "fa-solid fa-film",
  }
</script>

<div
  class={[
    "flex flex-col",
    "w-72",
    "bg-white",
    "rounded-2xl",
    "overflow-hidden shadow-xl",
  ]}
>
  <!-- Header with name -->
  <div class="px-6 py-5 text-center" style:background-color={teamColor.toRgb()}>
    <h2
      class={[
        "font-black text-white uppercase",
        card.name.length > 20 ? "text-xl" : "text-2xl",
      ]}
    >
      {card.name}
    </h2>
  </div>

  <!-- Description -->
  {#if showDescription}
    <div class="flex flex-1 flex-col gap-4 px-6 py-5">
      <p class="text-center text-sm leading-relaxed text-gray-600">
        {card.description}
      </p>

      <!-- Category badge -->
      <div class="flex justify-center">
        <span
          class={[
            "inline-flex items-center gap-2",
            "px-3 py-1",
            "text-xs font-medium capitalize",
            "bg-gray-100 text-gray-500",
            "rounded-full",
          ]}
        >
          <i class={categoryIcons[card.category]}></i>
          {card.category}
        </span>
      </div>
    </div>
  {/if}
</div>
