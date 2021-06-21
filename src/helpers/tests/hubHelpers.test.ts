import { HubImage } from "../../redux/hub/hub.types"
import {
  sortHubImagesAuthorsDecreasing,
  sortHubImagesAuthorsIncreasing,
  sortHubImagesNamesDecreasing,
  sortHubImagesNamesIncreasing,
} from "../hubHelpers"

const humImagesNamesIncreasing: HubImage[] = [
  {
    "docker-name": "jinahub/pod.crafter.albumentationscrafter",
    version: "0.0.7",
    "jina-version": "1.2.2",
    "docker-command":
      "docker pull jinahub/pod.crafter.albumentationscrafter:0.0.7-1.2.2",
    name: "AlbumentationsCrafter",
    description:
      "Apply transformations from the Albumentations package to the image.",
    type: "pod",
    kind: "crafter",
    keywords: ["image", "transform", "augmentation", "albumentations"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/image/AlbumentationsCrafter/README.md",
    author: "Author D",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.onehottextencoder",
    version: "0.0.9",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.onehottextencoder:0.0.9-1.2.3",
    name: "OneHotTextEncoder",
    description:
      "One-hot Encoder encodes the characters into one-hot vectors. ONLY FOR TESTING USAGES.",
    type: "pod",
    kind: "encoder",
    keywords: ["encoder", "testing"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/OneHotTextEncoder/README.md",
    author: "Author B",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.spellchecker",
    version: "0.0.2",
    "jina-version": "1.2.0",
    "docker-command":
      "docker pull jinahub/pod.crafter.spellchecker:0.0.2-1.2.0",
    name: "SpellChecker",
    description:
      "Crafter using a pretrained spelling correcting model to correct input text",
    type: "pod",
    kind: "crafter",
    keywords: ["nlp", "spell correction"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/nlp/SpellChecker/README.md",
    author: "Author A",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.transformertfencoder",
    version: "0.0.20",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.transformertfencoder:0.0.20-1.2.3",
    name: "TransformerTFEncoder",
    description:
      "TransformerTFEncoder wraps the tensorflow-version of transformers from huggingface, encodes data from an array of string in size `B` into an ndarray in size `B x D`",
    type: "pod",
    kind: "encoder",
    keywords: ["huggingface", "transformers", "nlp", "BERT", "tensorflow"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/TransformerTFEncoder/README.md",
    author: "Author C",
    avatar: null,
  },
]

const humImagesNamesDecreasing: HubImage[] = [
  {
    "docker-name": "jinahub/pod.encoder.transformertfencoder",
    version: "0.0.20",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.transformertfencoder:0.0.20-1.2.3",
    name: "TransformerTFEncoder",
    description:
      "TransformerTFEncoder wraps the tensorflow-version of transformers from huggingface, encodes data from an array of string in size `B` into an ndarray in size `B x D`",
    type: "pod",
    kind: "encoder",
    keywords: ["huggingface", "transformers", "nlp", "BERT", "tensorflow"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/TransformerTFEncoder/README.md",
    author: "Author C",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.spellchecker",
    version: "0.0.2",
    "jina-version": "1.2.0",
    "docker-command":
      "docker pull jinahub/pod.crafter.spellchecker:0.0.2-1.2.0",
    name: "SpellChecker",
    description:
      "Crafter using a pretrained spelling correcting model to correct input text",
    type: "pod",
    kind: "crafter",
    keywords: ["nlp", "spell correction"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/nlp/SpellChecker/README.md",
    author: "Author A",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.onehottextencoder",
    version: "0.0.9",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.onehottextencoder:0.0.9-1.2.3",
    name: "OneHotTextEncoder",
    description:
      "One-hot Encoder encodes the characters into one-hot vectors. ONLY FOR TESTING USAGES.",
    type: "pod",
    kind: "encoder",
    keywords: ["encoder", "testing"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/OneHotTextEncoder/README.md",
    author: "Author B",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.albumentationscrafter",
    version: "0.0.7",
    "jina-version": "1.2.2",
    "docker-command":
      "docker pull jinahub/pod.crafter.albumentationscrafter:0.0.7-1.2.2",
    name: "AlbumentationsCrafter",
    description:
      "Apply transformations from the Albumentations package to the image.",
    type: "pod",
    kind: "crafter",
    keywords: ["image", "transform", "augmentation", "albumentations"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/image/AlbumentationsCrafter/README.md",
    author: "Author D",
    avatar: null,
  },
]

const hubImagesAuthorIncreasing: HubImage[] = [
  {
    "docker-name": "jinahub/pod.crafter.spellchecker",
    version: "0.0.2",
    "jina-version": "1.2.0",
    "docker-command":
      "docker pull jinahub/pod.crafter.spellchecker:0.0.2-1.2.0",
    name: "SpellChecker",
    description:
      "Crafter using a pretrained spelling correcting model to correct input text",
    type: "pod",
    kind: "crafter",
    keywords: ["nlp", "spell correction"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/nlp/SpellChecker/README.md",
    author: "Author A",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.onehottextencoder",
    version: "0.0.9",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.onehottextencoder:0.0.9-1.2.3",
    name: "OneHotTextEncoder",
    description:
      "One-hot Encoder encodes the characters into one-hot vectors. ONLY FOR TESTING USAGES.",
    type: "pod",
    kind: "encoder",
    keywords: ["encoder", "testing"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/OneHotTextEncoder/README.md",
    author: "Author B",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.transformertfencoder",
    version: "0.0.20",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.transformertfencoder:0.0.20-1.2.3",
    name: "TransformerTFEncoder",
    description:
      "TransformerTFEncoder wraps the tensorflow-version of transformers from huggingface, encodes data from an array of string in size `B` into an ndarray in size `B x D`",
    type: "pod",
    kind: "encoder",
    keywords: ["huggingface", "transformers", "nlp", "BERT", "tensorflow"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/TransformerTFEncoder/README.md",
    author: "Author C",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.albumentationscrafter",
    version: "0.0.7",
    "jina-version": "1.2.2",
    "docker-command":
      "docker pull jinahub/pod.crafter.albumentationscrafter:0.0.7-1.2.2",
    name: "AlbumentationsCrafter",
    description:
      "Apply transformations from the Albumentations package to the image.",
    type: "pod",
    kind: "crafter",
    keywords: ["image", "transform", "augmentation", "albumentations"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/image/AlbumentationsCrafter/README.md",
    author: "Author D",
    avatar: null,
  },
]

const hubImagesAuthorDecreasing: HubImage[] = [
  {
    "docker-name": "jinahub/pod.crafter.albumentationscrafter",
    version: "0.0.7",
    "jina-version": "1.2.2",
    "docker-command":
      "docker pull jinahub/pod.crafter.albumentationscrafter:0.0.7-1.2.2",
    name: "AlbumentationsCrafter",
    description:
      "Apply transformations from the Albumentations package to the image.",
    type: "pod",
    kind: "crafter",
    keywords: ["image", "transform", "augmentation", "albumentations"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/image/AlbumentationsCrafter/README.md",
    author: "Author D",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.transformertfencoder",
    version: "0.0.20",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.transformertfencoder:0.0.20-1.2.3",
    name: "TransformerTFEncoder",
    description:
      "TransformerTFEncoder wraps the tensorflow-version of transformers from huggingface, encodes data from an array of string in size `B` into an ndarray in size `B x D`",
    type: "pod",
    kind: "encoder",
    keywords: ["huggingface", "transformers", "nlp", "BERT", "tensorflow"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/TransformerTFEncoder/README.md",
    author: "Author C",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.onehottextencoder",
    version: "0.0.9",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.onehottextencoder:0.0.9-1.2.3",
    name: "OneHotTextEncoder",
    description:
      "One-hot Encoder encodes the characters into one-hot vectors. ONLY FOR TESTING USAGES.",
    type: "pod",
    kind: "encoder",
    keywords: ["encoder", "testing"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/OneHotTextEncoder/README.md",
    author: "Author B",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.spellchecker",
    version: "0.0.2",
    "jina-version": "1.2.0",
    "docker-command":
      "docker pull jinahub/pod.crafter.spellchecker:0.0.2-1.2.0",
    name: "SpellChecker",
    description:
      "Crafter using a pretrained spelling correcting model to correct input text",
    type: "pod",
    kind: "crafter",
    keywords: ["nlp", "spell correction"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/nlp/SpellChecker/README.md",
    author: "Author A",
    avatar: null,
  },
]

const hubImagesUnsorted = [
  {
    "docker-name": "jinahub/pod.encoder.onehottextencoder",
    version: "0.0.9",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.onehottextencoder:0.0.9-1.2.3",
    name: "OneHotTextEncoder",
    description:
      "One-hot Encoder encodes the characters into one-hot vectors. ONLY FOR TESTING USAGES.",
    type: "pod",
    kind: "encoder",
    keywords: ["encoder", "testing"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/OneHotTextEncoder/README.md",
    author: "Author B",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.spellchecker",
    version: "0.0.2",
    "jina-version": "1.2.0",
    "docker-command":
      "docker pull jinahub/pod.crafter.spellchecker:0.0.2-1.2.0",
    name: "SpellChecker",
    description:
      "Crafter using a pretrained spelling correcting model to correct input text",
    type: "pod",
    kind: "crafter",
    keywords: ["nlp", "spell correction"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/nlp/SpellChecker/README.md",
    author: "Author A",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.crafter.albumentationscrafter",
    version: "0.0.7",
    "jina-version": "1.2.2",
    "docker-command":
      "docker pull jinahub/pod.crafter.albumentationscrafter:0.0.7-1.2.2",
    name: "AlbumentationsCrafter",
    description:
      "Apply transformations from the Albumentations package to the image.",
    type: "pod",
    kind: "crafter",
    keywords: ["image", "transform", "augmentation", "albumentations"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/crafters/image/AlbumentationsCrafter/README.md",
    author: "Author D",
    avatar: null,
  },
  {
    "docker-name": "jinahub/pod.encoder.transformertfencoder",
    version: "0.0.20",
    "jina-version": "1.2.3",
    "docker-command":
      "docker pull jinahub/pod.encoder.transformertfencoder:0.0.20-1.2.3",
    name: "TransformerTFEncoder",
    description:
      "TransformerTFEncoder wraps the tensorflow-version of transformers from huggingface, encodes data from an array of string in size `B` into an ndarray in size `B x D`",
    type: "pod",
    kind: "encoder",
    keywords: ["huggingface", "transformers", "nlp", "BERT", "tensorflow"],
    platform: ["linux/amd64"],
    license: "apache-2.0",
    url: "https://jina.ai",
    documentation:
      "https://github.com/jina-ai/jina-hub/blob/master/encoders/nlp/TransformerTFEncoder/README.md",
    author: "Author C",
    avatar: null,
  },
]

describe("sortHubImagesNamesIncreasing", () => {
  it("should sort hub images increasingly", () => {
    expect(sortHubImagesNamesIncreasing(hubImagesUnsorted)).toEqual(
      humImagesNamesIncreasing
    )
  })
})

describe("sortHubImagesNamesDecreasing", () => {
  it("should sort hub images decreasingly", () => {
    expect(sortHubImagesNamesDecreasing(hubImagesUnsorted)).toEqual(
      humImagesNamesDecreasing
    )
  })
})

describe("sortHubImagesAuthorsIncreasing", () => {
  it("should sort hub authors increasingly", () => {
    expect(sortHubImagesAuthorsIncreasing(hubImagesUnsorted)).toEqual(
      hubImagesAuthorIncreasing
    )
  })
})

describe("sortHubImagesAuthorsDecreasing", () => {
  it("should sort hub authors decreasingly", () => {
    expect(sortHubImagesAuthorsDecreasing(hubImagesUnsorted)).toEqual(
      hubImagesAuthorDecreasing
    )
  })
})
