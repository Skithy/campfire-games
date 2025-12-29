<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements"

  type Shape = "circle" | "square"
  type Size = "sm" | "md" | "lg"
  type Variant = "filled" | "outline" | "ghost"

  type BaseProps = {
    icon: string
    shape?: Shape
    size?: Size
    variant?: Variant
    label: string
  }

  type ButtonProps = BaseProps &
    Omit<HTMLButtonAttributes, "class"> & {
      href?: never
      class?: string
    }

  type AnchorProps = BaseProps &
    Omit<HTMLAnchorAttributes, "href" | "class"> & {
      href: string
      class?: string
    }

  let {
    icon,
    shape = "circle",
    size = "md",
    variant = "filled",
    label,
    href,
    class: className,
    ...restProps
  }: ButtonProps | AnchorProps = $props()

  const sizeClasses: Record<Size, string> = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-14 w-14 text-lg",
  }

  const shapeClasses: Record<Shape, string> = {
    circle: "rounded-full",
    square: "rounded-xl",
  }

  const variantClasses: Record<Variant, string> = {
    filled: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-white/20 text-white/60 hover:bg-white/10 hover:text-white",
    ghost: "text-white/60 hover:bg-white/10 hover:text-white",
  }

  const baseClasses =
    "flex items-center justify-center cursor-pointer transition-all active:scale-95"
</script>

{#if href}
  <a
    {href}
    class={[
      baseClasses,
      sizeClasses[size],
      shapeClasses[shape],
      variantClasses[variant],
      className,
    ]}
    aria-label={label}
    {...restProps as HTMLAnchorAttributes}
  >
    <i class={icon}></i>
  </a>
{:else}
  <button
    type="button"
    class={[
      baseClasses,
      sizeClasses[size],
      shapeClasses[shape],
      variantClasses[variant],
      className,
    ]}
    aria-label={label}
    {...restProps as HTMLButtonAttributes}
  >
    <i class={icon}></i>
  </button>
{/if}
