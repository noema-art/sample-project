const { topologicalSort } = require("../src/graph/topologicalSort");

test("topologicalSort returns valid order for DAG", () => {
  // DAG: 0 -> 1 -> 3
  //      0 -> 2 -> 3
  //      1 -> 2
  const graph = [
    [1, 2], // 0 -> 1, 2
    [2, 3], // 1 -> 2, 3
    [3],    // 2 -> 3
    [],     // 3 -> (none)
  ];

  const order = topologicalSort(graph);
  expect(order).not.toBeNull();
  expect(order.length).toBe(4);

  // Verify topological property: for each edge u->v, u appears before v
  const pos = {};
  order.forEach((node, idx) => (pos[node] = idx));

  for (let u = 0; u < graph.length; u++) {
    for (const v of graph[u]) {
      expect(pos[u]).toBeLessThan(pos[v]);
    }
  }
});

test("topologicalSort returns null for cyclic graph", () => {
  // Cycle: 0 -> 1 -> 2 -> 0
  const graph = [
    [1], // 0 -> 1
    [2], // 1 -> 2
    [0], // 2 -> 0 (cycle)
  ];

  const order = topologicalSort(graph);
  expect(order).toBeNull();
});

test("topologicalSort handles disconnected DAG", () => {
  // Two disconnected components: 0->1 and 2->3
  const graph = [
    [1], // 0 -> 1
    [],  // 1
    [3], // 2 -> 3
    [],  // 3
  ];

  const order = topologicalSort(graph);
  expect(order).not.toBeNull();
  expect(order.length).toBe(4);

  const pos = {};
  order.forEach((node, idx) => (pos[node] = idx));
  expect(pos[0]).toBeLessThan(pos[1]);
  expect(pos[2]).toBeLessThan(pos[3]);
});
