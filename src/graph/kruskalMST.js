/**
 * Kruskal's algorithm for Minimum Spanning Tree.
 * Works for undirected graphs. If graph is disconnected, returns a minimum spanning forest.
 *
 * edges: Array<{ u:number, v:number, w:number }>
 */

const { UnionFind } = require("../structures/unionFind");

function kruskalMST(n, edges) {
  const sorted = [...edges].sort((a, b) => a.w - b.w);
  const uf = new UnionFind(n);
  const picked = [];
  let totalWeight = 0;

  for (const e of sorted) {
    if (uf.union(e.u, e.v)) {
      picked.push(e);
      totalWeight += e.w;
    }
  }

  return { totalWeight, edges: picked };
}

module.exports = { kruskalMST };
