/**
 * Topological Sort using Kahn's algorithm (BFS-based).
 *
 * Graph format:
 *   adjacency list where graph[u] is an array of destination nodes
 * Nodes are 0..n-1.
 *
 * Returns null if graph has a cycle, otherwise returns a valid topological order.
 */

function topologicalSort(graph) {
  const n = graph.length;
  const inDegree = Array(n).fill(0);

  // Calculate in-degrees
  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) {
      inDegree[v]++;
    }
  }

  // Initialize queue with nodes having in-degree 0
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const result = [];
  let head = 0;

  while (head < queue.length) {
    const u = queue[head++];
    result.push(u);

    for (const v of graph[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  // If not all nodes are in result, there's a cycle
  if (result.length !== n) {
    return null;
  }

  return result;
}

module.exports = { topologicalSort };
