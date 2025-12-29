<script lang="ts">
  import type { Snippet } from "svelte"
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements"

  type Variant = "primary" | "secondary" | "tertiary" | "ghost"
  type Size = "sm" | "md" | "lg"

  type BaseProps = {
    variant?: Variant
    size?: Size
    icon?: string
    gradient?: string
    disabled?: boolean
    fullWidth?: boolean
    children: Snippet
  }

  type ButtonProps = BaseProps &
    Omit<HTMLButtonAttributes, "disabled"> & {
      href?: never
    }

  type AnchorProps = BaseProps &
    Omit<HTMLAnchorAttributes, "href"> & {
      href: string
    }

  let {
    variant = "secondary",
    size = "md",
    icon,
    gradient,
    disabled = false,
    fullWidth = false,
    href,
    children,
    class: className,
    ...restProps
  }: ButtonProps | AnchorProps = $props()

  const sizeClasses: Record<Size, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const variantClasses: Record<Variant, string> = {
    primary: "group relative overflow-hidden p-0.5 rounded-2xl",
    secondary:
      "flex items-center justify-center gap-2 font-semibold text-white/80 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 hover:text-white",
    tertiary:
      "text-center font-semibold text-white/70 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:text-white",
    ghost: "font-semibold text-white bg-white/10 rounded-xl hover:bg-white/20",
  }

  const baseClasses = "cursor-pointer transition-all active:scale-[0.98]"
  const disabledClasses = "cursor-not-allowed opacity-50"
</script>

{#if variant === "primary"}
  {#if href}
    <a
      {href}
      class={[
        variantClasses.primary,
        disabled ? disabledClasses : "hover:scale-[1.02]",
        fullWidth && "w-full",
        className,
      ]}
      style:background={gradient || "linear-gradient(135deg, #888, #666)"}
      {...restProps as HTMLAnchorAttributes}
    >
      <span
        class={[
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          "font-bold text-white",
          "bg-[#1a1a1a]",
          "rounded-[14px]",
          "transition-colors group-hover:bg-transparent group-hover:text-black",
        ]}
      >
        {#if icon}
          <i class="{icon} text-base"></i>
        {/if}
        {@render children()}
      </span>
    </a>
  {:else}
    <button
      type="button"
      class={[
        variantClasses.primary,
        disabled ? disabledClasses : "hover:scale-[1.02]",
        fullWidth && "w-full",
        className,
      ]}
      style:background={gradient || "linear-gradient(135deg, #888, #666)"}
      {disabled}
      {...restProps as HTMLButtonAttributes}
    >
      <span
        class={[
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          "font-bold text-white",
          "bg-[#1a1a1a]",
          "rounded-[14px]",
          "transition-colors group-hover:bg-transparent group-hover:text-black",
        ]}
      >
        {#if icon}
          <i class="{icon} text-base"></i>
        {/if}
        {@render children()}
      </span>
    </button>
  {/if}
{:else if href}
  <a
    {href}
    class={[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled ? disabledClasses : "",
      fullWidth && "w-full",
      className,
    ]}
    {...restProps as HTMLAnchorAttributes}
  >
    {#if icon}
      <i class="{icon} text-base"></i>
    {/if}
    {@render children()}
  </a>
{:else}
  <button
    type="button"
    class={[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled ? disabledClasses : "",
      fullWidth && "w-full",
      className,
    ]}
    {disabled}
    {...restProps as HTMLButtonAttributes}
  >
    {#if icon}
      <i class="{icon} text-base"></i>
    {/if}
    {@render children()}
  </button>
{/if}
