<script lang="ts">
  import { Button, IconButton } from "$lib/components/ui"

  type Variant = "primary" | "standard" | "outline"

  type ButtonProps = {
    label: string
    onclick: () => void
    variant?: Variant
    icon?: string
    color?: string
    iconOnly?: boolean
    disabled?: boolean
  }

  // eslint-disable-next-line svelte/no-unused-props
  let {
    left,
    right,
  }: {
    left?: ButtonProps
    right: ButtonProps
  } = $props()
</script>

{#if left}
  <div class="flex w-full items-center gap-3">
    {#if left.iconOnly && left.icon}
      <IconButton
        icon={left.icon}
        shape="square"
        size="lg"
        variant="outline"
        label={left.label}
        disabled={left.disabled}
        onclick={left.onclick}
      />
    {:else}
      <Button
        variant={left.variant ?? "outline"}
        size="lg"
        icon={left.icon}
        color={left.color}
        disabled={left.disabled}
        class="flex-1"
        onclick={left.onclick}
      >
        {left.label}
      </Button>
    {/if}
    <Button
      variant={right.variant ?? "standard"}
      size="lg"
      icon={right.icon}
      color={right.color}
      disabled={right.disabled}
      class="flex-1"
      onclick={right.onclick}
    >
      {right.label}
    </Button>
  </div>
{:else}
  <div class="w-full">
    <Button
      variant={right.variant ?? "standard"}
      size="lg"
      icon={right.icon}
      color={right.color}
      disabled={right.disabled}
      fullWidth
      onclick={right.onclick}
    >
      {right.label}
    </Button>
  </div>
{/if}
