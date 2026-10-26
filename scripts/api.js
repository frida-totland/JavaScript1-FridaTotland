'use strict';

// fetching jacket details from API
async function fetchJacketDetails() {
    const url = 'https://v2.api.noroff.dev/rainy-days';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch jackets details');
    }

    const json = await response.json();
    const jackets = json.data;

    return jackets;

  } catch (error) {
    console.log(error);
  };
};

export const jackets = await fetchJacketDetails();