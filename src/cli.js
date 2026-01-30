#!/usr/bin/env node

/**
 * Algorithm Sample CLI
 *
 * Usage: node src/cli.js <command> [args]
 *
 * Commands:
 *   dijkstra            - Run Dijkstra's shortest path demo
 *   mst                 - Run Kruskal's MST demo
 *   topsort             - Run topological sort demo
 *   bsearch <target>    - Run binary search demo
 *   mergesort           - Run merge sort demo
 *   help                - Show this help message
 */

const { dijkstra, reconstructPath } = require("./graph/dijkstra");
const { kruskalMST } = require("./graph/kruskalMST");
const { topologicalSort } = require("./graph/topologicalSort");
const { binarySearch, lowerBound, upperBound } = require("./search/binarySearch");
const { mergeSort } = require("./sorting/mergeSort");

function showHelp() {
  console.log(`
Algorithm Sample CLI

Usage: node src/cli.js <command> [args]

Commands:
  dijkstra            Run Dijkstra's shortest path demo
  mst                 Run Kruskal's MST demo
  topsort             Run topological sort demo
  bsearch <target>    Run binary search demo (target: integer to search)
  mergesort [nums...] Run merge sort demo (optional: space-separated numbers)
  help                Show this help message

Examples:
  node src/cli.js dijkstra
  node src/cli.js mst
  node src/cli.js topsort
  node src/cli.js bsearch 7
  node src/cli.js mergesort 5 2 8 1 9 3
`);
}

function runDijkstra() {
  console.log("=== Dijkstra's Shortest Path ===\n");

  // Example graph (directed):
  // 0 -> 1 (2), 0 -> 2 (5)
  // 1 -> 2 (1), 1 -> 3 (2)
  // 2 -> 3 (1)
  const graph = [
    [
      { to: 1, w: 2 },
      { to: 2, w: 5 },
    ],
    [
      { to: 2, w: 1 },
      { to: 3, w: 2 },
    ],
    [{ to: 3, w: 1 }],
    [],
  ];

  console.log("Graph (adjacency list):");
  console.log("  0 -> 1 (weight: 2), 0 -> 2 (weight: 5)");
  console.log("  1 -> 2 (weight: 1), 1 -> 3 (weight: 2)");
  console.log("  2 -> 3 (weight: 1)");
  console.log("");

  const { dist, prev } = dijkstra(graph, 0);

  console.log("Shortest distances from node 0:");
  dist.forEach((d, i) => console.log(`  Node ${i}: ${d}`));
  console.log("");

  const path = reconstructPath(prev, 0, 3);
  console.log(`Shortest path from 0 to 3: ${path.join(" -> ")} (cost: ${dist[3]})`);
}

function runMST() {
  console.log("=== Kruskal's Minimum Spanning Tree ===\n");

  const n = 5;
  const edges = [
    { u: 0, v: 1, w: 4 },
    { u: 0, v: 2, w: 3 },
    { u: 1, v: 2, w: 1 },
    { u: 1, v: 3, w: 2 },
    { u: 2, v: 3, w: 4 },
    { u: 3, v: 4, w: 2 },
    { u: 2, v: 4, w: 5 },
  ];

  console.log(`Graph: ${n} nodes, ${edges.length} edges`);
  console.log("Edges:");
  edges.forEach((e) => console.log(`  ${e.u} -- ${e.v} (weight: ${e.w})`));
  console.log("");

  const mst = kruskalMST(n, edges);

  console.log("MST edges selected:");
  mst.edges.forEach((e) => console.log(`  ${e.u} -- ${e.v} (weight: ${e.w})`));
  console.log(`\nTotal MST weight: ${mst.totalWeight}`);
}

function runTopSort() {
  console.log("=== Topological Sort (Kahn's Algorithm) ===\n");

  // Example DAG: course prerequisites
  // 0: Intro to Programming
  // 1: Data Structures (requires 0)
  // 2: Algorithms (requires 1)
  // 3: Databases (requires 1)
  // 4: Web Development (requires 2, 3)
  const graph = [
    [1],    // 0 -> 1
    [2, 3], // 1 -> 2, 3
    [4],    // 2 -> 4
    [4],    // 3 -> 4
    [],     // 4 -> (none)
  ];

  console.log("DAG (course prerequisites):");
  console.log("  0: Intro to Programming");
  console.log("  1: Data Structures (requires 0)");
  console.log("  2: Algorithms (requires 1)");
  console.log("  3: Databases (requires 1)");
  console.log("  4: Web Development (requires 2, 3)");
  console.log("");

  const order = topologicalSort(graph);

  if (order) {
    console.log(`Valid course order: ${order.join(" -> ")}`);
  } else {
    console.log("Error: Graph contains a cycle!");
  }

  // Demo with cycle
  console.log("\n--- Testing with cyclic graph ---");
  const cyclicGraph = [
    [1], // 0 -> 1
    [2], // 1 -> 2
    [0], // 2 -> 0 (cycle!)
  ];
  const cyclicOrder = topologicalSort(cyclicGraph);
  console.log(`Cyclic graph result: ${cyclicOrder === null ? "null (cycle detected)" : cyclicOrder}`);
}

function runBinarySearch(targetArg) {
  console.log("=== Binary Search ===\n");

  const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  console.log(`Sorted array: [${arr.join(", ")}]`);
  console.log("");

  const target = targetArg !== undefined ? parseInt(targetArg, 10) : 7;

  if (isNaN(target)) {
    console.log("Error: Please provide a valid integer as target");
    return;
  }

  const idx = binarySearch(arr, target);
  const lb = lowerBound(arr, target);
  const ub = upperBound(arr, target);

  console.log(`Searching for: ${target}`);
  console.log(`  binarySearch: ${idx === -1 ? "not found" : `found at index ${idx}`}`);
  console.log(`  lowerBound (first >= ${target}): index ${lb}${lb < arr.length ? ` (value: ${arr[lb]})` : " (past end)"}`);
  console.log(`  upperBound (first > ${target}): index ${ub}${ub < arr.length ? ` (value: ${arr[ub]})` : " (past end)"}`);

  // Show additional examples
  console.log("\n--- Additional searches ---");
  [4, 11, 20, 0].forEach((t) => {
    const i = binarySearch(arr, t);
    console.log(`  binarySearch(${t}): ${i === -1 ? "not found" : `found at index ${i}`}`);
  });
}

function runMergeSort(numsArg) {
  console.log("=== Merge Sort ===\n");

  let arr;
  if (numsArg && numsArg.length > 0) {
    arr = numsArg.map((n) => parseInt(n, 10));
    if (arr.some(isNaN)) {
      console.log("Error: Please provide valid integers");
      return;
    }
  } else {
    arr = [64, 34, 25, 12, 22, 11, 90, 5];
  }

  console.log(`Original array: [${arr.join(", ")}]`);

  const sorted = mergeSort(arr);

  console.log(`Sorted array:   [${sorted.join(", ")}]`);
  console.log("");
  console.log("Note: Merge sort is stable and runs in O(n log n) time.");
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help") {
    showHelp();
    return;
  }

  switch (command) {
    case "dijkstra":
      runDijkstra();
      break;
    case "mst":
      runMST();
      break;
    case "topsort":
      runTopSort();
      break;
    case "bsearch":
      runBinarySearch(args[1]);
      break;
    case "mergesort":
      runMergeSort(args.slice(1));
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log('Run "node src/cli.js help" for usage information.');
      process.exit(1);
  }
}

main();
