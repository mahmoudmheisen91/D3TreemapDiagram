// API URL:
const movie_url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

// Fetch data:
document.addEventListener("DOMContentLoaded", () => {
  fetch(movie_url)
    .then(response => response.json())
    .then(data => {
      draw(data);
    })
    .catch(err => console.log(err));
});

// Draw using D3.js:
function draw(data) {
  // Globals:
  const width = 1200;
  const height = 700;
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  let w = width - margin.left - margin.right;
  let h = height - margin.top - margin.bottom;

  let color = d3.scaleOrdinal(d3.schemeCategory10);

  // Create SVG:
  let svg = d3
    .select(".vis-container")
    .append("svg")
    .attr("class", "svg-graph")
    .attr("viewBox", [0, 0, w, h])
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Tree:
  var treemap = data =>
    d3
      .treemap()
      .size([w, h])
      .paddingInner(2)(
      d3
        .hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
    );

  let root = treemap(data);

  // Leaf:
  var leaf = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  // Tile:
  let tile = leaf
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", d => d.data.name)
    .attr("data-category", d => d.data.category)
    .attr("data-value", d => d.data.value)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.data.category));
}
