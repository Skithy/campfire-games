export enum SensorPermissionStatus {
  Granted = "granted",
  Denied = "denied",
  Prompt = "prompt",
  Unsupported = "unsupported",
  Unknown = "unknown",
}

export async function checkSensorPermissions(): Promise<SensorPermissionStatus> {
  if (typeof DeviceOrientationEvent === "undefined") {
    return SensorPermissionStatus.Unsupported
  }

  if (!("permissions" in navigator)) {
    return SensorPermissionStatus.Unknown
  }

  try {
    // @ts-expect-error - gyroscope permission name not in standard typings
    const gyro = await navigator.permissions.query({ name: "gyroscope" })

    if (gyro.state === "denied") {
      return SensorPermissionStatus.Denied
    }
    if (gyro.state === "granted") {
      // Additional check: verify that gamma values are actually provided
      const hasGamma = await checkGammaAvailability()
      if (!hasGamma) {
        return SensorPermissionStatus.Unsupported
      }
      return SensorPermissionStatus.Granted
    }
    return SensorPermissionStatus.Prompt
  } catch {
    return SensorPermissionStatus.Unknown
  }
}

/**
 * Checks if DeviceOrientationEvent actually provides gamma values.
 * Returns true if gamma values are available, false otherwise.
 */
async function checkGammaAvailability(): Promise<boolean> {
  return new Promise((resolve) => {
    let hasGamma = false
    const checkGamma = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        hasGamma = true
      }
      window.removeEventListener("deviceorientation", checkGamma)
      resolve(hasGamma)
    }
    window.addEventListener("deviceorientation", checkGamma)

    // Wait up to 500ms to see if we get gamma values
    setTimeout(() => {
      window.removeEventListener("deviceorientation", checkGamma)
      resolve(hasGamma)
    }, 500)
  })
}

/**
 * Requests permission to access device motion/orientation sensors.
 * Handles both iOS DeviceOrientationEvent.requestPermission() and
 * Android/Chrome Permissions API for gyroscope.
 * @returns Promise that resolves when permission is requested (doesn't reject on denial)
 */
export async function requestGyroscopePermission(): Promise<void> {
  // Request device orientation permission
  // iOS requires DeviceOrientationEvent.requestPermission()
  if (typeof DeviceOrientationEvent !== "undefined") {
    // @ts-expect-error - requestPermission is iOS-specific
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      try {
        // @ts-expect-error - requestPermission is iOS-specific
        await DeviceOrientationEvent.requestPermission()
      } catch {
        // Permission denied or error, continue anyway (tap controls still work)
      }
    }
  }

  // Try Permissions API for gyroscope (Android/Chrome)
  if ("permissions" in navigator) {
    try {
      // @ts-expect-error - gyroscope permission name
      const result = await navigator.permissions.query({ name: "gyroscope" })
      console.log("Gyroscope permission:", result.state)
    } catch {
      // Permission query not supported, continue anyway
    }
  }
}
