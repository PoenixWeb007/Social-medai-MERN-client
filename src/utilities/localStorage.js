export function loadData(name) {
  const savedData = localStorage.getItem(`${name}`);

  // Check if data exists
  if (savedData) {
    // Parse the JSON string back to an object
    const parsedData = JSON.parse(savedData);
    console.log(parsedData);

    // Now 'parsedData' contains the data retrieved from local storage
    return parsedData;
  } else {
    console.log("No data found in local storage.");
    return null;
  }
}
