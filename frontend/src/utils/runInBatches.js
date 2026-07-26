export async function runInBatches(items, batchSize, fn) {
  if (!Array.isArray(items)) {
    throw new TypeError("items must be an array");
  }

  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  const size = Number.isInteger(batchSize) && batchSize > 0 ? batchSize : 1;
  const results = [];

  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);

    const batchResults = await Promise.allSettled(
      batch.map((item, batchIndex) => fn(item, i + batchIndex, batch))
    );

    for (const result of batchResults) {
      if (result.status === "fulfilled") {
        results.push(result.value);
      }
    }
  }

  return results;
}