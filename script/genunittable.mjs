import fs from "fs";
import pqm from "../src/pqm.mjs";

// Read the unit database
let dbfile = fs.readFileSync("src/data/unitdb.json");
let unitdb = JSON.parse(dbfile)

// Create the output table
let table = "";
table += tableLine("Unit Name", "Symbol", "Aliases", "Description", true);

// Loop through each unit and put it into the table
for (let key in unitdb) {
  if (!unitdb.hasOwnProperty(key)) {
    continue;
  }
  if (key == "$schema") {
    continue;
  }
  let unit = unitdb[key];
  let aliasStr = "";
  if (unit.hasOwnProperty("aliases")) {
    aliasStr = unit.aliases.join(",");
  }
  table += tableLine(unit["name"], key, aliasStr, unit["description"], false);
}

// Write the output to a file
fs.writeFileSync("build/units/table.md", table);

function tableLine(name, symbol, addSyms, description, isHeader) {
  let output = "| ";

  addCell(name, 25);
  addCell(symbol, 15);
  addCell(addSyms, 10);
  addCell(description, 60);

  output += "\n";

  if (isHeader) {
    output += ("| " + "".padEnd(23, "-") + " | "
                    + "".padEnd(13, "-")  + " | "
                    + "".padEnd(8, "-")  + " | "
                    + "".padEnd(58, "-") + " | \n"
    )
  }

  return output;

  function addCell(value, size) {
    let pad = size - value.length - 1;
    if (pad < 1) {
      pad = 1;
    }
    output += value;
    output += "".padEnd(pad);
    output += "| ";
  }
}
