'use strict';

// fetching jacket details from API
export async function getJackets() {
  const url = 'https://v2.api.noroff.dev/rainy-days';

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch jackets details');
  }

  const json = await response.json();
  const jackets = json.data;

  return jackets;
};
