/**
 * Dijkstra's algorithm (non-negative edge weights).
 *
 * Graph format:
 *   adjacency list where graph[u] is an array of { to, w }
 * Nodes are 0..n-1.
 */

class MinHeap {
  constructor() {
    this.a = [];
  }
  size() {
    return this.a.length;
  }
  push(item) {
    this.a.push(item);
    this._siftUp(this.a.length - 1);
  }
  pop() {
    if (this.a.length === 0) return null;
    const top = this.a[0];
    const last = this.a.pop();
    if (this.a.length > 0) {
      this.a[0] = last;
      this._siftDown(0);
    }
    return top;
  }
  _siftUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.a[p][0] <= this.a[i][0]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }
  _siftDown(i) {
    const n = this.a.length;
    while (true) {
      let m = i;
      const l = i * 2 + 1;
      const r = l + 1;
      if (l < n && this.a[l][0] < this.a[m][0]) m = l;
      if (r < n && this.a[r][0] < this.a[m][0]) m = r;
      if (m === i) break;
      [this.a[m], this.a[i]] = [this.a[i], this.a[m]];
      i = m;
    }
  }
}

function dijkstra(graph, start) {
  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  dist[start] = 0;

  const pq = new MinHeap();
  pq.push([0, start]);

  while (pq.size() > 0) {
    const [d, u] = pq.pop();
    if (d !== dist[u]) continue; // stale

    for (const e of graph[u]) {
      const v = e.to;
      const nd = d + e.w;
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = u;
        pq.push([nd, v]);
      }
    }
  }

  return { dist, prev };
}

function reconstructPath(prev, start, target) {
  const path = [];
  for (let cur = target; cur !== -1; cur = prev[cur]) {
    path.push(cur);
    if (cur === start) break;
  }
  path.reverse();
  if (path.length === 0 || path[0] !== start) return null;
  return path;
}

module.exports = { dijkstra, reconstructPath };
