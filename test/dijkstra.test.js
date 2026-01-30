const { dijkstra, reconstructPath } = require("../src/graph/dijkstra");

test("dijkstra finds shortest path in small graph", () => {
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
  expect(dist[3]).toBe(4); // 0->1->3 cost 4, tie with 0->1->2->3 cost 4
  const path = reconstructPath(prev, 0, 3);
  expect(path[0]).toBe(0);
  expect(path[path.length - 1]).toBe(3);
});
