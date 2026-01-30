# sample-project

알고리즘 구현 샘플 프로젝트입니다. **로컬에서 바로 실행/테스트 가능**하도록 구성했습니다.

## 포함된 알고리즘

### Graph
- Dijkstra (최단경로, non-negative weights): `src/graph/dijkstra.js`
- Kruskal (MST/최소 신장 트리): `src/graph/kruskalMST.js`
- Topological Sort (Kahn/BFS): `src/graph/topologicalSort.js`

### Data Structure
- Union-Find (DSU): `src/structures/unionFind.js`

### Search / Sorting
- Binary Search + lower/upper bound: `src/search/binarySearch.js`
- Merge Sort (+ in-place variant): `src/sorting/mergeSort.js`

## 설치

```bash
npm install
```

## 실행 (데모)

기존 데모 실행:

```bash
npm run start
```

CLI로 실행:

```bash
npm run cli -- help
npm run cli -- dijkstra
npm run cli -- mst
npm run cli -- topsort
npm run cli -- bsearch 7
npm run cli -- mergesort 5 2 8 1 9 3
```

(동일하게 `node src/cli.js ...` 로 직접 실행해도 됩니다.)

## 테스트

```bash
npm test
```
