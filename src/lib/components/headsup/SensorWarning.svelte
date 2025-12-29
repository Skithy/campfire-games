<script lang="ts">
  import Modal from "$lib/components/layout/Modal.svelte"
  import { Button } from "$lib/components/ui"
  import { SensorPermissionStatus } from "$lib/utils/sensors"

  let {
    permissionStatus,
  }: {
    permissionStatus: SensorPermissionStatus | null
  } = $props()

  let showSensorHelp = $state(false)

  let sensorWarning = $derived.by(() => {
    switch (permissionStatus) {
      case SensorPermissionStatus.Granted:
      case null:
        return null
      case SensorPermissionStatus.Denied:
        return "Tilt controls blocked"
      case SensorPermissionStatus.Unsupported:
        return "Tilt not supported"
      case SensorPermissionStatus.Prompt:
        return "Tilt permission needed"
      case SensorPermissionStatus.Unknown:
        return "Tilt status unknown"
    }
  })
</script>

{#if sensorWarning}
  <button
    class={[
      "fixed top-4 left-1/2 -translate-x-1/2",
      "flex items-center gap-2",
      "px-3 py-2",
      "text-xs font-medium text-white",
      "bg-yellow-500/80",
      "rounded-full",
      "cursor-pointer",
    ]}
    onclick={() => (showSensorHelp = true)}
  >
    <i class="fa-solid fa-triangle-exclamation"></i>
    {sensorWarning}
  </button>

  <Modal bind:isOpen={showSensorHelp} title="Enable Tilt Controls">
    <div class="space-y-4 p-6 text-sm text-white/80">
      {#if permissionStatus === SensorPermissionStatus.Denied}
        <p>
          Your browser is blocking access to motion sensors. Tilt controls won't work, but you can
          still use <strong class="text-white">tap controls</strong>.
        </p>

        <div class="space-y-3">
          <p class="font-medium text-white">To enable tilt controls:</p>
          <ol class="ml-4 list-decimal space-y-2">
            <li>Check your browser's site settings or privacy controls</li>
            <li>Allow "Motion sensors" or "Device orientation" access</li>
            <li>Refresh the page after changing settings</li>
          </ol>
        </div>

        <div class="pt-2 text-xs text-white/50">
          Common locations: Shield icon (Brave), Lock icon (Chrome), or Settings → Site permissions
        </div>
      {:else if permissionStatus === SensorPermissionStatus.Unsupported}
        <p>
          Your device or browser doesn't support motion sensors. You can still use
          <strong class="text-white">tap controls</strong> or
          <strong class="text-white">keyboard arrows</strong>.
        </p>

        <p class="text-white/60">
          Tilt controls work on mobile devices with gyroscope sensors and browsers that support the
          DeviceOrientation API.
        </p>
      {:else if permissionStatus === SensorPermissionStatus.Prompt}
        <p>
          Tilt controls require permission to access motion sensors. Click the button below to grant
          permission.
        </p>

        <div class="space-y-3">
          <p class="font-medium text-white">After granting permission:</p>
          <ol class="ml-4 list-decimal space-y-2">
            <li>Allow "Motion sensors" or "Device orientation" when prompted</li>
            <li>The page will automatically use tilt controls</li>
          </ol>
        </div>
      {:else}
        <p>
          Tilt controls status is unknown. You can still use
          <strong class="text-white">tap controls</strong> or
          <strong class="text-white">keyboard arrows</strong>.
        </p>
      {/if}

      <div class="flex justify-end pt-2">
        <Button variant="standard" onclick={() => (showSensorHelp = false)}>Got it</Button>
      </div>
    </div>
  </Modal>
{/if}
