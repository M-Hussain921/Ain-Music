export async function withFallback(primaryFn, fallbackFn) {
  try {
    return await primaryFn();
  } catch (error) {
    console.warn("Primary failed switching to fallback:", error.message);

    try {
      return await fallbackFn();
    } catch (fallbackErr) {
      console.error("Both APIs failed:", fallbackErr.message);
      throw new Error("All APIs failed");
    }
  }
}