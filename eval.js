// Retrieval metrics evaluation. Run with: node eval.js
const fs = require('fs');

function loadTestSet(path) {
  const lines = fs.readFileSync(path, 'utf8').trim().split('\n').slice(1);
  return lines.map(line => {
    const [query, ids] = line.split(',');
    return { query, correctIds: ids.split(';').map(Number) };
  });
}

const testSet = loadTestSet('test-set.csv');
const results = JSON.parse(fs.readFileSync('search-results.json', 'utf8'));

function rankOf(rankedIds, correctIds) {
  for (let i = 0; i < rankedIds.length; i++) {
    if (correctIds.includes(Number(rankedIds[i]))) {
      return i + 1;
    }
  }
  return null;
}

function reciprocalRank(rankedIds, correctIds) {
  const rank = rankOf(rankedIds, correctIds);
  return rank === null ? 0 : 1 / rank;
}

let keywordRRTotal = 0;
let semanticRRTotal = 0;
let keywordHits = 0;
let semanticHits = 0;
const comparisonRows = [];

for (const item of testSet) {
  const queryResults = results[item.query];

  const keywordRank = rankOf(queryResults.keyword, item.correctIds);
  const semanticRank = rankOf(queryResults.semantic, item.correctIds);

  const keywordRR = reciprocalRank(queryResults.keyword, item.correctIds);
  const semanticRR = reciprocalRank(queryResults.semantic, item.correctIds);

  keywordRRTotal += keywordRR;
  semanticRRTotal += semanticRR;

  if (keywordRR > 0) keywordHits++;
  if (semanticRR > 0) semanticHits++;

  comparisonRows.push({
    query: item.query,
    keywordRank,
    semanticRank
  });
}

const keywordMRR = keywordRRTotal / testSet.length;
const semanticMRR = semanticRRTotal / testSet.length;
const keywordRecall = keywordHits / testSet.length;
const semanticRecall = semanticHits / testSet.length;

console.log('| Query | Keyword rank | Semantic rank |');
console.log('|---|---|---|');

for (const row of comparisonRows) {
  console.log(
    `| ${row.query} | ${row.keywordRank ?? 'miss'} | ${row.semanticRank ?? 'miss'} |`
  );
}

console.log(
  `| **Summary** | **MRR ${keywordMRR.toFixed(2)} · Recall@10 ${keywordRecall.toFixed(2)}** | **MRR ${semanticMRR.toFixed(2)} · Recall@10 ${semanticRecall.toFixed(2)}** |`
);
