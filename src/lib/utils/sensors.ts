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
      return SensorPermissionStatus.Granted
    }
    return SensorPermissionStatus.Prompt
  } catch {
    return SensorPermissionStatus.Unknown
  }
}
