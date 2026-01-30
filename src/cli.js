#!/usr/bin/env node

/**
 * 알고리즘 샘플 CLI
 *
 * 사용법: node src/cli.js <command> [args]
 *
 * Commands:
 *   dijkstra            - 다익스트라(최단경로) 데모 실행
 *   mst                 - 크루스칼(MST) 데모 실행
 *   topsort             - 위상 정렬 데모 실행
 *   bsearch <target>    - 이분 탐색 데모 실행
 *   mergesort           - 병합 정렬 데모 실행
 *   help                - 도움말 출력
 */

const { dijkstra, reconstructPath } = require("./graph/dijkstra");
const { kruskalMST } = require("./graph/kruskalMST");
const { topologicalSort } = require("./graph/topologicalSort");
const { binarySearch, lowerBound, upperBound } = require("./search/binarySearch");
const { mergeSort } = require("./sorting/mergeSort");

function showHelp() {
  console.log(`
알고리즘 샘플 CLI

사용법: node src/cli.js <command> [args]

Commands:
  dijkstra            다익스트라(최단경로) 데모 실행
  mst                 크루스칼(MST) 데모 실행
  topsort             위상 정렬 데모 실행
  bsearch <target>    이분 탐색 데모 실행 (target: 찾을 정수)
  mergesort [nums...] 병합 정렬 데모 실행 (옵션: 공백으로 구분된 숫자들)
  help                도움말 출력

예시:
  node src/cli.js dijkstra
  node src/cli.js mst
  node src/cli.js topsort
  node src/cli.js bsearch 7
  node src/cli.js mergesort 5 2 8 1 9 3
`);
}

function runDijkstra() {
  console.log("=== 다익스트라 최단 경로 (Dijkstra) ===\n");

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

  console.log("그래프(인접 리스트):");
  console.log("  0 -> 1 (가중치: 2), 0 -> 2 (가중치: 5)");
  console.log("  1 -> 2 (가중치: 1), 1 -> 3 (가중치: 2)");
  console.log("  2 -> 3 (가중치: 1)");
  console.log("");

  const { dist, prev } = dijkstra(graph, 0);

  console.log("0번 노드에서의 최단 거리:");
  dist.forEach((d, i) => console.log(`  Node ${i}: ${d}`));
  console.log("");

  const path = reconstructPath(prev, 0, 3);
  console.log(`0 -> 3 최단 경로: ${path.join(" -> ")} (비용: ${dist[3]})`);
}

function runMST() {
  console.log("=== 크루스칼 최소 신장 트리 (Kruskal MST) ===\n");

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

  console.log(`그래프: 노드 ${n}개, 간선 ${edges.length}개`);
  console.log("간선 목록:");
  edges.forEach((e) => console.log(`  ${e.u} -- ${e.v} (가중치: ${e.w})`));
  console.log("");

  const mst = kruskalMST(n, edges);

  console.log("선택된 MST 간선:");
  mst.edges.forEach((e) => console.log(`  ${e.u} -- ${e.v} (가중치: ${e.w})`));
  console.log(`\nMST 총 가중치: ${mst.totalWeight}`);
}

function runTopSort() {
  console.log("=== 위상 정렬 (Kahn 알고리즘) ===\n");

  // Example DAG: course prerequisites
  // 0: Intro to Programming
  // 1: Data Structures (requires 0)
  // 2: Algorithms (requires 1)
  // 3: Databases (requires 1)
  // 4: Web Development (requires 2, 3)
  const graph = [
    [1],    // 0 -> 1
    [2, 3], // 1 -> 2, 3
    [4],    // 2 -> 4
    [4],    // 3 -> 4
    [],     // 4 -> (none)
  ];

  console.log("DAG(과목 선수 조건):");
  console.log("  0: 프로그래밍 입문");
  console.log("  1: 자료구조 (선수: 0)");
  console.log("  2: 알고리즘 (선수: 1)");
  console.log("  3: 데이터베이스 (선수: 1)");
  console.log("  4: 웹 개발 (선수: 2, 3)");
  console.log("");

  const order = topologicalSort(graph);

  if (order) {
    console.log(`가능한 수강 순서: ${order.join(" -> ")}`);
  } else {
    console.log("오류: 그래프에 사이클이 있습니다!");
  }

  // Demo with cycle
  console.log("\n--- 사이클 그래프 테스트 ---");
  const cyclicGraph = [
    [1], // 0 -> 1
    [2], // 1 -> 2
    [0], // 2 -> 0 (cycle!)
  ];
  const cyclicOrder = topologicalSort(cyclicGraph);
  console.log(`사이클 그래프 결과: ${cyclicOrder === null ? "null (사이클 감지)" : cyclicOrder}`);
}

function runBinarySearch(targetArg) {
  console.log("=== 이분 탐색 (Binary Search) ===\n");

  const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  console.log(`정렬된 배열: [${arr.join(", ")}]`);
  console.log("");

  const target = targetArg !== undefined ? parseInt(targetArg, 10) : 7;

  if (isNaN(target)) {
    console.log("오류: target은 정수여야 합니다");
    return;
  }

  const idx = binarySearch(arr, target);
  const lb = lowerBound(arr, target);
  const ub = upperBound(arr, target);

  console.log(`찾는 값: ${target}`);
  console.log(`  binarySearch: ${idx === -1 ? "없음" : `인덱스 ${idx}에서 발견`}`);
  console.log(`  lowerBound (첫 >= ${target}): 인덱스 ${lb}${lb < arr.length ? ` (값: ${arr[lb]})` : " (배열 끝)"}`);
  console.log(`  upperBound (첫 > ${target}): 인덱스 ${ub}${ub < arr.length ? ` (값: ${arr[ub]})` : " (배열 끝)"}`);

  // Show additional examples
  console.log("\n--- 추가 검색 예시 ---");
  [4, 11, 20, 0].forEach((t) => {
    const i = binarySearch(arr, t);
    console.log(`  binarySearch(${t}): ${i === -1 ? "없음" : `인덱스 ${i}`}`);
  });
}

function runMergeSort(numsArg) {
  console.log("=== 병합 정렬 (Merge Sort) ===\n");

  let arr;
  if (numsArg && numsArg.length > 0) {
    arr = numsArg.map((n) => parseInt(n, 10));
    if (arr.some(isNaN)) {
      console.log("오류: 숫자는 모두 정수여야 합니다");
      return;
    }
  } else {
    arr = [64, 34, 25, 12, 22, 11, 90, 5];
  }

  console.log(`원본 배열: [${arr.join(", ")}]`);

  const sorted = mergeSort(arr);

  console.log(`정렬 결과: [${sorted.join(", ")}]`);
  console.log("");
  console.log("참고: 병합 정렬은 안정 정렬이며 시간 복잡도는 O(n log n)입니다.");
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help") {
    showHelp();
    return;
  }

  switch (command) {
    case "dijkstra":
      runDijkstra();
      break;
    case "mst":
      runMST();
      break;
    case "topsort":
      runTopSort();
      break;
    case "bsearch":
      runBinarySearch(args[1]);
      break;
    case "mergesort":
      runMergeSort(args.slice(1));
      break;
    default:
      console.log(`알 수 없는 명령: ${command}`);
      console.log('사용법은 "node src/cli.js help"를 실행하세요.');
      process.exit(1);
  }
}

main();
