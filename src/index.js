const { dijkstra, reconstructPath } = require("./graph/dijkstra");
const { kruskalMST } = require("./graph/kruskalMST");

function demoDijkstra() {
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

  const { dist, prev } = dijkstra(graph, 0);
  const path = reconstructPath(prev, 0, 3);

  console.log("[Dijkstra] dist from 0:", dist);
  console.log("[Dijkstra] path 0 -> 3:", path, "cost=", dist[3]);
}

function demoKruskal() {
  // Undirected edges for 5 nodes
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

  const mst = kruskalMST(n, edges);
  console.log("[Kruskal] totalWeight:", mst.totalWeight);
  console.log("[Kruskal] edges:", mst.edges);
}

function main() {
  demoDijkstra();
  console.log("---");
  demoKruskal();
}

if (require.main === module) {
  main();
}
