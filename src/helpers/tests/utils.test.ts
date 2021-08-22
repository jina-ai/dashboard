import {
  newVersionLocalStorageReset,
  timeout,
  copyToClipboard,
  mimeTypeFromDataURI,
  formatDocumentRequest,
  fileToBase64,
  parseDocumentRequest,
  splitByNewline,
} from "../utils"

interface MockFile {
  name: string
  body: string
  mimeType: string
}

const createFileFromMockFile = (file: MockFile): File => {
  const blob = new Blob([file.body], { type: file.mimeType }) as any
  blob["lastModifiedDate"] = new Date()
  blob["name"] = file.name
  return blob as File
}

describe("timeout", () => {
  it("should return a promise after supplied ms have elapsed", async () => {
    const TIMEOUT_MS = 1000
    const MARGIN_OF_ERROR = 10

    const t1 = new Date()
    await timeout(TIMEOUT_MS)
    const t2 = new Date()
    const difference = t2.valueOf() - t1.valueOf()
    expect(Math.abs(difference - TIMEOUT_MS)).toBeLessThan(MARGIN_OF_ERROR)
  })
})

describe("newVersionLocalStorageReset", () => {
  it("should reset storage if it has an older version in it", () => {
    localStorage.setItem("testItemKey", "testItemValue")
    expect(localStorage.getItem("testItemKey")).toBe("testItemValue")
    newVersionLocalStorageReset("1.1.1", "1.0.12")
    expect(localStorage.key(0)).toBe(null)
  })
})

describe("copyToClipboard", () => {
  it("copies a string to clipboard", () => {
    document.execCommand = jest.fn()
    copyToClipboard("string")
    expect(document.execCommand).toHaveBeenCalledWith("copy")
  })
})

describe(fileToBase64, () => {
  it("should convert a file to base64", async () => {
    const file = createFileFromMockFile({
      body: "123",
      mimeType: "image/png",
      name: "test.png",
    })
    const result = await fileToBase64(file)
    expect(result.substring(0, 14)).toEqual("data:image/png")
  })
})

describe(formatDocumentRequest, () => {
  it("should create a request with just text", async () => {
    const sample = {
      data: [{ text: "hello world" }],
    }
    const expectedResult = JSON.stringify(sample, null, " ")
    const result = await formatDocumentRequest(
      sample.data[0].text,
      null,
      [],
      {},
      {}
    )
    expect(result).toEqual(expectedResult)
  })

  it("should create a request with just a file", async () => {
    const sample = {
      data: [{ uri: "data:image/png;base64,MTIz" }],
    }
    const expectedResult = JSON.stringify(sample, null, " ")
    const result = await formatDocumentRequest(
      "",
      [sample.data[0].uri],
      [],
      {},
      {}
    )
    expect(result).toEqual(expectedResult)
  })

  it("should create a request with text and a file", async () => {
    const sample = {
      data: [{ text: "hello world" }, { uri: "data:image/png;base64,MTIz" }],
    }
    const expectedResult = JSON.stringify(sample, null, " ")
    const result = await formatDocumentRequest(
      sample.data[0].text as string,
      [sample.data[1].uri as string],
      [],
      {},
      {}
    )
    expect(result).toEqual(expectedResult)
  })

  it("should create a request with custom parameters", async () => {
    const sample = {
      data: [{ text: "hello world" }, { uri: "data:image/png;base64,MTIz" }],
      rootParam: "hello World",
      parameters: { mode: "test_2" },
    }
    const expectedResult = JSON.stringify(sample, null, " ")
    const result = await formatDocumentRequest(
      sample.data[0].text as string,
      [sample.data[1].uri as string],
      ["test1", "test2"],
      {
        test1: "rootParam",
        test2: "parameters",
      },
      {
        test1: "hello World",
        test2: JSON.stringify(sample.parameters),
      }
    )
    expect(result).toEqual(expectedResult)
  })
})

describe(mimeTypeFromDataURI, () => {
  it("should return image/png for image dataURI", () => {
    const dataURI = "data:image/png;base64,abcdefghijklm.."
    const mimeType = mimeTypeFromDataURI(dataURI)
    expect(mimeType).toEqual("image/png")
  })
})

describe(parseDocumentRequest, () => {
  it("should combine text documents into a single line of text", () => {
    const input = { data: [{ text: "Hello" }, { text: "World" }] }

    const expected = {
      text: "Hello\nWorld\n",
      uris: [],
      keys: {},
      values: {},
      rows: [],
    }

    const result = parseDocumentRequest(JSON.stringify(input))

    expect(result).toEqual(expected)
  })

  it("should output uris into an array", () => {
    const input = { data: [{ uri: "Hello" }, { uri: "World" }] }

    const expected = {
      text: "",
      uris: ["Hello", "World"],
      keys: {},
      values: {},
      rows: [],
    }

    const result = parseDocumentRequest(JSON.stringify(input))

    expect(result).toEqual(expected)
  })

  it("should extract custom fields", () => {
    const input = { data: [], custom: "field" }

    const { rows, keys, values } = parseDocumentRequest(JSON.stringify(input))

    expect(rows.length).toEqual(1)
    const id = rows[0]
    expect(keys[id]).toEqual("custom")
    expect(values[id]).toEqual("field")
  })
})

describe(splitByNewline, () => {
  it("should split by newline", () => {
    const str = "Hello\nWorld\nTest"
    const expected = ["Hello", "World", "Test"]
    const result = splitByNewline(str)
    expect(result).toEqual(expected)
  })
})
