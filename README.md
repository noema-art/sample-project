# sample-project

알고리즘 구현 샘플 프로젝트입니다. **로컬에서 바로 실행/테스트 가능**하고, **웹 데모(GitHub Pages)**도 제공합니다.

- 웹 데모: https://noema-art.github.io/sample-project/
- 저장소: https://github.com/noema-art/sample-project

## 포함된 알고리즘

### Graph
- Dijkstra (최단경로, non-negative weights): `src/graph/dijkstra.js`
- Kruskal (MST/최소 신장 트리): `src/graph/kruskalMST.js`
- Topological Sort (위상 정렬, Kahn/BFS): `src/graph/topologicalSort.js`

### Data Structure
- Union-Find (DSU): `src/structures/unionFind.js`

### Search / Sorting
- Binary Search + lower/upper bound: `src/search/binarySearch.js`
- Merge Sort (+ in-place variant): `src/sorting/mergeSort.js`

## 설치

```bash
npm install
```

## 실행 (CLI 데모)

```bash
npm run cli -- help
npm run cli -- dijkstra
npm run cli -- mst
npm run cli -- topsort
npm run cli -- bsearch 7
npm run cli -- mergesort 5 2 8 1 9 3
```

(동일하게 `node src/cli.js ...` 로 직접 실행해도 됩니다.)

## 실행 (Node 데모)

```bash
npm run start
```

## 테스트

```bash
npm test
```

## 웹 데모 로컬 실행

`docs/`는 GitHub Pages 용 정적 사이트입니다.

```bash
python3 -m http.server 5173 --directory docs
# 브라우저에서 http://127.0.0.1:5173
```
