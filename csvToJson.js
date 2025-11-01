const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { error } = require("console");

//path to the csv file
const csvFilePath = path.join(__dirname, "data.csv");

//an array to store csv data
const results = [];

//read the csv file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const jsonFilePath = path.join(__dirname, "data.json");

    try {
      fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error("Error writing the JSON file: ", error);
    }
  })
  .on("error", (error) => {
    console.error("Error reading the CSV file: ", error);
  });
