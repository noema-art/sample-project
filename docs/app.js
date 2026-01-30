/*
  Browser-only implementations of a few classic algorithms.
  (Duplicated from Node versions intentionally to avoid build/bundling.)
*/

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

// ---------------------------
// Dijkstra (non-negative weights)
// ---------------------------
class MinHeap {
  constructor() { this.a = []; }
  size() { return this.a.length; }
  push(item) {
    this.a.push(item);
    this._up(this.a.length - 1);
  }
  pop() {
    if (this.a.length === 0) return null;
    const top = this.a[0];
    const last = this.a.pop();
    if (this.a.length) {
      this.a[0] = last;
      this._down(0);
    }
    return top;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.a[p][0] <= this.a[i][0]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }
  _down(i) {
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
    if (d !== dist[u]) continue;

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
  if (!path.length || path[0] !== start) return null;
  return path;
}

// ---------------------------
// Union-Find + Kruskal MST
// ---------------------------
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }
  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;
  }
  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    return true;
  }
}

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

// ---------------------------
// Topological Sort (Kahn)
// ---------------------------
function topologicalSort(graph) {
  const n = graph.length;
  const inDeg = Array(n).fill(0);
  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) inDeg[v]++;
  }
  const q = [];
  for (let i = 0; i < n; i++) if (inDeg[i] === 0) q.push(i);
  const res = [];
  for (let head = 0; head < q.length; head++) {
    const u = q[head];
    res.push(u);
    for (const v of graph[u]) {
      inDeg[v]--;
      if (inDeg[v] === 0) q.push(v);
    }
  }
  return res.length === n ? res : null;
}

// ---------------------------
// Binary search + bounds
// ---------------------------
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

function lowerBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function upperBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// ---------------------------
// Merge sort
// ---------------------------
function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  while (i < left.length) res.push(left[i++]);
  while (j < right.length) res.push(right[j++]);
  return res;
}

// ---------------------------
// Demo inputs
// ---------------------------
const demoInputs = {
  dijkstra: {
    start: 0,
    target: 3,
    graph: [
      [{ to: 1, w: 2 }, { to: 2, w: 5 }],
      [{ to: 2, w: 1 }, { to: 3, w: 2 }],
      [{ to: 3, w: 1 }],
      [],
    ],
  },
  kruskal: {
    n: 5,
    edges: [
      { u: 0, v: 1, w: 4 },
      { u: 0, v: 2, w: 3 },
      { u: 1, v: 2, w: 1 },
      { u: 1, v: 3, w: 2 },
      { u: 2, v: 3, w: 4 },
      { u: 3, v: 4, w: 2 },
      { u: 2, v: 4, w: 5 },
    ],
  },
  topsort: {
    graph: [
      [1],
      [2, 3],
      [4],
      [4],
      [],
    ],
  },
  bsearch: {
    arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
    target: 7,
  },
  mergesort: {
    arr: [64, 34, 25, 12, 22, 11, 90, 5],
  },
};

function runDemo(kind, input) {
  switch (kind) {
    case "dijkstra": {
      const { graph, start, target } = input;
      const { dist, prev } = dijkstra(graph, start);
      const path = reconstructPath(prev, start, target);
      return {
        dist,
        path,
        cost: dist[target],
      };
    }
    case "kruskal": {
      const { n, edges } = input;
      return kruskalMST(n, edges);
    }
    case "topsort": {
      const { graph } = input;
      return { order: topologicalSort(graph) };
    }
    case "bsearch": {
      const { arr, target } = input;
      const idx = binarySearch(arr, target);
      const lb = lowerBound(arr, target);
      const ub = upperBound(arr, target);
      return {
        index: idx,
        lowerBound: lb,
        upperBound: ub,
        found: idx !== -1,
      };
    }
    case "mergesort": {
      const { arr } = input;
      return { sorted: mergeSort(arr) };
    }
    default:
      throw new Error(`Unknown demo: ${kind}`);
  }
}

// ---------------------------
// UI Wiring
// ---------------------------
const demoSelect = document.getElementById("demoSelect");
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");

function setInputFor(kind) {
  inputEl.value = pretty(demoInputs[kind]);
  outputEl.textContent = "";
}

function safeParseJSON(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function renderOutput(obj) {
  outputEl.textContent = pretty(obj);
}

demoSelect.addEventListener("change", () => setInputFor(demoSelect.value));

resetBtn.addEventListener("click", () => {
  setInputFor(demoSelect.value);
});

runBtn.addEventListener("click", () => {
  const kind = demoSelect.value;
  const parsed = safeParseJSON(inputEl.value);
  if (!parsed.ok) {
    outputEl.textContent = `Invalid JSON input: ${parsed.error}`;
    return;
  }

  try {
    const result = runDemo(kind, parsed.value);
    renderOutput({ kind, input: parsed.value, result });
  } catch (e) {
    outputEl.textContent = `Error while running demo: ${String(e)}`;
  }
});

// initial
setInputFor(demoSelect.value);
