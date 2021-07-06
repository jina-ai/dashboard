export const sampleResponse = {
  request_id: "35a39f01-9c18-4010-b697-30238a9cd683",
  data: {
    docs: [
      {
        id: "8130a498-de77-11eb-aecf-acde48001122",
        chunks: [
          {
            id: "82fb5980-de77-11eb-aecf-acde48001122",
            matches: [
              {
                id: "83949a46-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_0",
                granularity: 1,
                adjacency: 1,
                content_hash: "3bc89bbb23ab5f0a",
                scores: {
                  values: {
                    "chunk score": {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394a8ce-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_1",
                granularity: 1,
                adjacency: 1,
                content_hash: "d7d975fe87b7c1b3",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394b5d0-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_2",
                granularity: 1,
                adjacency: 1,
                content_hash: "a106dacc3fc86164",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394bd28-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_3",
                granularity: 1,
                adjacency: 1,
                content_hash: "b465c56848ce1ead",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
            ],
            mime_type: "text/plain",
            text: "chunk_0",
            granularity: 1,
            parent_id: "8130a498-de77-11eb-aecf-acde48001122",
            content_hash: "ac17ad4d1eea81e9",
          },
          {
            id: "82fb5ff2-de77-11eb-aecf-acde48001122",
            matches: [
              {
                id: "8394e578-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_0",
                granularity: 1,
                adjacency: 1,
                content_hash: "3bc89bbb23ab5f0a",
                scores: {
                  values: {
                    "chunk score": {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394ec76-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_1",
                granularity: 1,
                adjacency: 1,
                content_hash: "d7d975fe87b7c1b3",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394f342-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_2",
                granularity: 1,
                adjacency: 1,
                content_hash: "a106dacc3fc86164",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394f9fa-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_3",
                granularity: 1,
                adjacency: 1,
                content_hash: "b465c56848ce1ead",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
            ],
            mime_type: "text/plain",
            text: "chunk_1",
            granularity: 1,
            parent_id: "8130a498-de77-11eb-aecf-acde48001122",
            content_hash: "adedb4c0da5a123e",
          },
        ],
        matches: [
          {
            id: "842e3138-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_0",
            adjacency: 1,
            content_hash: "b5f18137400953f2",
            scores: {
              values: {
                score: {
                  value: 1.0,
                  op_name: "doc_matcher",
                  description: "final score for doc",
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
                "doc score": {
                  op_name: "doc_matcher",
                  description: "score for doc",
                  operands: [
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  ],
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "842e51ae-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_1",
            adjacency: 1,
            content_hash: "9051de68fd20ed37",
            scores: {
              values: {
                score: {
                  value: 1.0,
                  op_name: "doc_matcher",
                  description: "final score for doc",
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
                "doc score": {
                  value: 1.0,
                  op_name: "doc_matcher",
                  description: "score for doc",
                  operands: [
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  ],
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "842e8110-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_2",
            adjacency: 1,
            content_hash: "c021b58fe5060bf2",
            scores: {
              values: {
                score: {
                  value: 1.0,
                  op_name: "doc_matcher",
                  description: "final score for doc",
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
                "doc score": {
                  value: 2.0,
                  op_name: "doc_matcher",
                  description: "score for doc",
                  operands: [
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  ],
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
        ],
        tags: {},
        text: "Hello, world",
        content_hash: "fe4165b2b48c2ca6",
      },
    ],
    groundtruths: null,
  },
}

export const expectedElements = [
  {
    id: "1",
    type: "doc",
    data: {
      name: "Document",
      item: {
        id: "8130a498-de77-11eb-aecf-acde48001122",
        chunks: [
          {
            id: "82fb5980-de77-11eb-aecf-acde48001122",
            matches: [
              {
                id: "83949a46-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_0",
                granularity: 1,
                adjacency: 1,
                content_hash: "3bc89bbb23ab5f0a",
                scores: {
                  values: {
                    "chunk score": {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394a8ce-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_1",
                granularity: 1,
                adjacency: 1,
                content_hash: "d7d975fe87b7c1b3",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394b5d0-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_2",
                granularity: 1,
                adjacency: 1,
                content_hash: "a106dacc3fc86164",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394bd28-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_3",
                granularity: 1,
                adjacency: 1,
                content_hash: "b465c56848ce1ead",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
            ],
            mime_type: "text/plain",
            text: "chunk_0",
            granularity: 1,
            parent_id: "8130a498-de77-11eb-aecf-acde48001122",
            content_hash: "ac17ad4d1eea81e9",
          },
          {
            id: "82fb5ff2-de77-11eb-aecf-acde48001122",
            matches: [
              {
                id: "8394e578-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_0",
                granularity: 1,
                adjacency: 1,
                content_hash: "3bc89bbb23ab5f0a",
                scores: {
                  values: {
                    "chunk score": {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394ec76-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_1",
                granularity: 1,
                adjacency: 1,
                content_hash: "d7d975fe87b7c1b3",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394f342-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_2",
                granularity: 1,
                adjacency: 1,
                content_hash: "a106dacc3fc86164",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
              {
                id: "8394f9fa-de77-11eb-aecf-acde48001122",
                mime_type: "text/plain",
                text: "match_3",
                granularity: 1,
                adjacency: 1,
                content_hash: "b465c56848ce1ead",
                scores: {
                  values: {
                    "chunk score": {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  },
                },
              },
            ],
            mime_type: "text/plain",
            text: "chunk_1",
            granularity: 1,
            parent_id: "8130a498-de77-11eb-aecf-acde48001122",
            content_hash: "adedb4c0da5a123e",
          },
        ],
        matches: [
          {
            id: "842e3138-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_0",
            adjacency: 1,
            content_hash: "b5f18137400953f2",
            scores: {
              values: {
                score: {
                  value: 1,
                  op_name: "doc_matcher",
                  description: "final score for doc",
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
                "doc score": {
                  op_name: "doc_matcher",
                  description: "score for doc",
                  operands: [
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  ],
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "842e51ae-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_1",
            adjacency: 1,
            content_hash: "9051de68fd20ed37",
            scores: {
              values: {
                score: {
                  value: 1,
                  op_name: "doc_matcher",
                  description: "final score for doc",
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
                "doc score": {
                  value: 1,
                  op_name: "doc_matcher",
                  description: "score for doc",
                  operands: [
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  ],
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "842e8110-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_2",
            adjacency: 1,
            content_hash: "c021b58fe5060bf2",
            scores: {
              values: {
                score: {
                  value: 1,
                  op_name: "doc_matcher",
                  description: "final score for doc",
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
                "doc score": {
                  value: 2,
                  op_name: "doc_matcher",
                  description: "score for doc",
                  operands: [
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                    },
                    {
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.1,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.2,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                    {
                      value: 0.3,
                      op_name: "chunk_matcher",
                      description: "score for chunk",
                      ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                    },
                  ],
                  ref_id: "8130a498-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
        ],
        tags: {},
        text: "Hello, world",
        content_hash: "fe4165b2b48c2ca6",
      },
      hasInput: false,
    },
    position: { x: 0, y: 265 },
  },
  {
    id: "82fb5980-de77-11eb-aecf-acde48001122",
    type: "chunk",
    data: {
      name: "Chunk",
      item: {
        id: "82fb5980-de77-11eb-aecf-acde48001122",
        matches: [
          {
            id: "83949a46-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_0",
            granularity: 1,
            adjacency: 1,
            content_hash: "3bc89bbb23ab5f0a",
            scores: {
              values: {
                "chunk score": {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "8394a8ce-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_1",
            granularity: 1,
            adjacency: 1,
            content_hash: "d7d975fe87b7c1b3",
            scores: {
              values: {
                "chunk score": {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "8394b5d0-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_2",
            granularity: 1,
            adjacency: 1,
            content_hash: "a106dacc3fc86164",
            scores: {
              values: {
                "chunk score": {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "8394bd28-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_3",
            granularity: 1,
            adjacency: 1,
            content_hash: "b465c56848ce1ead",
            scores: {
              values: {
                "chunk score": {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
        ],
        mime_type: "text/plain",
        text: "chunk_0",
        granularity: 1,
        parent_id: "8130a498-de77-11eb-aecf-acde48001122",
        content_hash: "ac17ad4d1eea81e9",
      },
    },
    position: { x: 700, y: 0 },
  },
  {
    id: "edge-82fb5980-de77-11eb-aecf-acde48001122-1",
    source: "82fb5980-de77-11eb-aecf-acde48001122",
    target: "1",
    animated: false,
    label: "chunk",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "83949a46-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "83949a46-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_0",
        granularity: 1,
        adjacency: 1,
        content_hash: "3bc89bbb23ab5f0a",
        scores: {
          values: {
            "chunk score": {
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 1400, y: 0 },
  },
  {
    id:
      "edge-83949a46-de77-11eb-aecf-acde48001122-82fb5980-de77-11eb-aecf-acde48001122",
    source: "83949a46-de77-11eb-aecf-acde48001122",
    target: "82fb5980-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394a8ce-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394a8ce-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_1",
        granularity: 1,
        adjacency: 1,
        content_hash: "d7d975fe87b7c1b3",
        scores: {
          values: {
            "chunk score": {
              value: 0.1,
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 1400, y: 500 },
  },
  {
    id:
      "edge-8394a8ce-de77-11eb-aecf-acde48001122-82fb5980-de77-11eb-aecf-acde48001122",
    source: "8394a8ce-de77-11eb-aecf-acde48001122",
    target: "82fb5980-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394b5d0-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394b5d0-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_2",
        granularity: 1,
        adjacency: 1,
        content_hash: "a106dacc3fc86164",
        scores: {
          values: {
            "chunk score": {
              value: 0.2,
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 1400, y: 1000 },
  },
  {
    id:
      "edge-8394b5d0-de77-11eb-aecf-acde48001122-82fb5980-de77-11eb-aecf-acde48001122",
    source: "8394b5d0-de77-11eb-aecf-acde48001122",
    target: "82fb5980-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394bd28-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394bd28-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_3",
        granularity: 1,
        adjacency: 1,
        content_hash: "b465c56848ce1ead",
        scores: {
          values: {
            "chunk score": {
              value: 0.3,
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 1400, y: 1500 },
  },
  {
    id:
      "edge-8394bd28-de77-11eb-aecf-acde48001122-82fb5980-de77-11eb-aecf-acde48001122",
    source: "8394bd28-de77-11eb-aecf-acde48001122",
    target: "82fb5980-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "82fb5ff2-de77-11eb-aecf-acde48001122",
    type: "chunk",
    data: {
      name: "Chunk",
      item: {
        id: "82fb5ff2-de77-11eb-aecf-acde48001122",
        matches: [
          {
            id: "8394e578-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_0",
            granularity: 1,
            adjacency: 1,
            content_hash: "3bc89bbb23ab5f0a",
            scores: {
              values: {
                "chunk score": {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "8394ec76-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_1",
            granularity: 1,
            adjacency: 1,
            content_hash: "d7d975fe87b7c1b3",
            scores: {
              values: {
                "chunk score": {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "8394f342-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_2",
            granularity: 1,
            adjacency: 1,
            content_hash: "a106dacc3fc86164",
            scores: {
              values: {
                "chunk score": {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
          {
            id: "8394f9fa-de77-11eb-aecf-acde48001122",
            mime_type: "text/plain",
            text: "match_3",
            granularity: 1,
            adjacency: 1,
            content_hash: "b465c56848ce1ead",
            scores: {
              values: {
                "chunk score": {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              },
            },
          },
        ],
        mime_type: "text/plain",
        text: "chunk_1",
        granularity: 1,
        parent_id: "8130a498-de77-11eb-aecf-acde48001122",
        content_hash: "adedb4c0da5a123e",
      },
    },
    position: { x: 700, y: 480 },
  },
  {
    id: "edge-82fb5ff2-de77-11eb-aecf-acde48001122-1",
    source: "82fb5ff2-de77-11eb-aecf-acde48001122",
    target: "1",
    animated: false,
    label: "chunk",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394e578-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394e578-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_0",
        granularity: 1,
        adjacency: 1,
        content_hash: "3bc89bbb23ab5f0a",
        scores: {
          values: {
            "chunk score": {
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2100, y: 0 },
  },
  {
    id:
      "edge-8394e578-de77-11eb-aecf-acde48001122-82fb5ff2-de77-11eb-aecf-acde48001122",
    source: "8394e578-de77-11eb-aecf-acde48001122",
    target: "82fb5ff2-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394ec76-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394ec76-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_1",
        granularity: 1,
        adjacency: 1,
        content_hash: "d7d975fe87b7c1b3",
        scores: {
          values: {
            "chunk score": {
              value: 0.1,
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2100, y: 500 },
  },
  {
    id:
      "edge-8394ec76-de77-11eb-aecf-acde48001122-82fb5ff2-de77-11eb-aecf-acde48001122",
    source: "8394ec76-de77-11eb-aecf-acde48001122",
    target: "82fb5ff2-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394f342-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394f342-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_2",
        granularity: 1,
        adjacency: 1,
        content_hash: "a106dacc3fc86164",
        scores: {
          values: {
            "chunk score": {
              value: 0.2,
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2100, y: 1000 },
  },
  {
    id:
      "edge-8394f342-de77-11eb-aecf-acde48001122-82fb5ff2-de77-11eb-aecf-acde48001122",
    source: "8394f342-de77-11eb-aecf-acde48001122",
    target: "82fb5ff2-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "8394f9fa-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Chunk Match",
      item: {
        id: "8394f9fa-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_3",
        granularity: 1,
        adjacency: 1,
        content_hash: "b465c56848ce1ead",
        scores: {
          values: {
            "chunk score": {
              value: 0.3,
              op_name: "chunk_matcher",
              description: "score for chunk",
              ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2100, y: 1500 },
  },
  {
    id:
      "edge-8394f9fa-de77-11eb-aecf-acde48001122-82fb5ff2-de77-11eb-aecf-acde48001122",
    source: "8394f9fa-de77-11eb-aecf-acde48001122",
    target: "82fb5ff2-de77-11eb-aecf-acde48001122",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "842e3138-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Document Match",
      item: {
        id: "842e3138-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_0",
        adjacency: 1,
        content_hash: "b5f18137400953f2",
        scores: {
          values: {
            score: {
              value: 1,
              op_name: "doc_matcher",
              description: "final score for doc",
              ref_id: "8130a498-de77-11eb-aecf-acde48001122",
            },
            "doc score": {
              op_name: "doc_matcher",
              description: "score for doc",
              operands: [
                {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              ],
              ref_id: "8130a498-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2800, y: 0 },
  },
  {
    id: "edge-842e3138-de77-11eb-aecf-acde48001122-1",
    source: "842e3138-de77-11eb-aecf-acde48001122",
    target: "1",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "842e51ae-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Document Match",
      item: {
        id: "842e51ae-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_1",
        adjacency: 1,
        content_hash: "9051de68fd20ed37",
        scores: {
          values: {
            score: {
              value: 1,
              op_name: "doc_matcher",
              description: "final score for doc",
              ref_id: "8130a498-de77-11eb-aecf-acde48001122",
            },
            "doc score": {
              value: 1,
              op_name: "doc_matcher",
              description: "score for doc",
              operands: [
                {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              ],
              ref_id: "8130a498-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2800, y: 500 },
  },
  {
    id: "edge-842e51ae-de77-11eb-aecf-acde48001122-1",
    source: "842e51ae-de77-11eb-aecf-acde48001122",
    target: "1",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
  {
    id: "842e8110-de77-11eb-aecf-acde48001122",
    type: "match",
    data: {
      name: "Document Match",
      item: {
        id: "842e8110-de77-11eb-aecf-acde48001122",
        mime_type: "text/plain",
        text: "match_2",
        adjacency: 1,
        content_hash: "c021b58fe5060bf2",
        scores: {
          values: {
            score: {
              value: 1,
              op_name: "doc_matcher",
              description: "final score for doc",
              ref_id: "8130a498-de77-11eb-aecf-acde48001122",
            },
            "doc score": {
              value: 2,
              op_name: "doc_matcher",
              description: "score for doc",
              operands: [
                {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5980-de77-11eb-aecf-acde48001122",
                },
                {
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.1,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.2,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
                {
                  value: 0.3,
                  op_name: "chunk_matcher",
                  description: "score for chunk",
                  ref_id: "82fb5ff2-de77-11eb-aecf-acde48001122",
                },
              ],
              ref_id: "8130a498-de77-11eb-aecf-acde48001122",
            },
          },
        },
      },
      hasOutput: false,
    },
    position: { x: 2800, y: 1000 },
  },
  {
    id: "edge-842e8110-de77-11eb-aecf-acde48001122-1",
    source: "842e8110-de77-11eb-aecf-acde48001122",
    target: "1",
    animated: true,
    label: "match",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: "rgb(51, 173, 173)",
      color: "#000000",
      fillOpacity: 0.7,
    },
    style: { stroke: "#009999" },
  },
]
