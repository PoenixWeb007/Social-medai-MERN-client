export function loadData(name) {
  const storedData = localStorage.getItem(`${name}`);

  // Check if data exists
  if (storedData) {
    // Parse the JSON string back to an object
    const parsedData = JSON.parse(storedData);

    // Now 'parsedData' contains the data retrieved from local storage
    return parsedData;
  } else {
    console.log("No data found in local storage.");
    return null;
  }
}
