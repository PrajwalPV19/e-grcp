export function delay(ms = 400) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function simulateRequest(data, ms = 400) {
  await delay(ms);
  return structuredClone(data);
}
