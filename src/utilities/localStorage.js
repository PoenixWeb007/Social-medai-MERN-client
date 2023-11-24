export function loadData(name) {
  const savedData = localStorage.getItem(`${name}`);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.log("No data found in local storage.");
    return null;
  }
}
