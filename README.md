# Retrieval Metrics Mini Project

## Result Table

| Query | Keyword rank | Semantic rank |
|---|---|---|
| my redis cache keeps showing old data | 8 | 1 |
| how do I add semantic search to a table I already have | miss | 2 |
| redis or memcached for caching | 1 | 2 |
| why did my query get slower after I added an index | miss | 1 |
| what does ACID actually guarantee | 2 | 1 |
| how do I keep my postgres online while changing the schema | 6 | 3 |
| my background jobs stop after every deploy | miss | 2 |
| how do I let my database accept more writes per second | 4 | 1 |
| sql or nosql for a new product | 1 | 3 |
| why does my redis memory keep climbing | miss | 2 |
| **Summary** | **MRR 0.30 · Recall@10 0.60** | **MRR 0.67 · Recall@10 1.00** |

## Interpretation

Semantic search is better overall because it has a higher MRR of 0.67 compared with keyword search at 0.30, and it also has perfect Recall@10 of 1.00 compared with 0.60 for keyword search. Keyword search wins on “redis or memcached for caching,” “what does ACID actually guarantee,” and “sql or nosql for a new product,” which have more direct and specific technical keywords that match the search terms. Semantic search wins on “my redis cache keeps showing old data,” “how do I add semantic search to a table I already have,” “why did my query get slower after I added an index,” “my background jobs stop after every deploy,” “how do I let my database accept more writes per second,” and “why does my redis memory keep climbing,” where understanding the meaning of the query helps match related concepts. The keyword wins are mostly short, direct comparison or concept queries, while the semantic wins tend to describe a problem or goal in natural language. A team would still keep keyword search because it performs well when exact technical terms matter and complements semantic search on queries where semantic matching is less precise.
