export async function fetchJSON(relativePath, delay = 300) {
  const url = new URL(relativePath, import.meta.url);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch ${relativePath}`);
  const data = await res.json();
  if (delay > 0) await new Promise((r) => setTimeout(r, delay));
  return data;
}
