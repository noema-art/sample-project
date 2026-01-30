const { kruskalMST } = require("../src/graph/kruskalMST");

test("kruskalMST returns correct total weight for sample", () => {
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

  const { totalWeight, edges: picked } = kruskalMST(n, edges);
  // One MST: (1-2=1), (1-3=2), (3-4=2), (0-2=3) => total 8
  expect(totalWeight).toBe(8);
  expect(picked.length).toBe(n - 1);
});
