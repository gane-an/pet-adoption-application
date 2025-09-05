const API_BASE = "http://localhost:8080";

async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(API_BASE + endpoint, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `Error: ${res.status}`);
    }

    // Handle empty responses (204 No Content)
    if (res.status === 204) return {};

    // Otherwise parse JSON
    return res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}
