
// Stores all repos fetched from API.
// Used by renderRepos() to sort and filter without re-fetching.
let allRepos = [];

// Holds the Chart.js instance.
// Saved here so it can be destroyed before drawing a new chart.
let chartInstance = null;

// Language name → hex color lookup table.
// Used by chart.js and repos.js to color-code languages.
const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python:     "#3572a5",
  Java:       "#b07219",
  "C++":      "#f34b7d",
  Go:         "#00add8",
  Rust:       "#dea584",
  Ruby:       "#701516",
  PHP:        "#4f5d95",
  Swift:      "#f05138",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Shell:      "#89e051",
  Kotlin:     "#a97bff",
  "C#":       "#178600",
  C:          "#555555"
};
