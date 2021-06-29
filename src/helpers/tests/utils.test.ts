import {
  newVersionLocalStorageReset,
  timeout,
  copyToClipboard,
  mimeTypeFromDataURI,
  formatDebugRequest,
  fileToBase64,
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

const createMockFileList = (files: MockFile[]) => {
  const fileList: FileList = {
    length: files.length,
    item(index: number): File {
      return fileList[index]
    },
  }
  files.forEach(
    (file, index) => (fileList[index] = createFileFromMockFile(file))
  )

  return fileList
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

describe(formatDebugRequest, () => {
  it("should create a request with just text", async () => {
    const sample = {
      data: [{ text: "hello world" }],
      parameters: {},
    }
    const expectedResult = JSON.stringify(sample, null, "\t")
    const result = await formatDebugRequest(
      sample.data[0].text,
      null,
      [],
      {},
      {},
      {}
    )
    expect(result).toEqual(expectedResult)
  })

  it("should create a request with just a file", async () => {
    const sample = {
      data: [{ uri: "data:image/png;base64,MTIz" }],
      parameters: {},
    }
    const expectedResult = JSON.stringify(sample, null, "\t")
    const sampleFiles = createMockFileList([
      {
        body: "123",
        mimeType: "image/png",
        name: "test.png",
      },
    ])
    const result = await formatDebugRequest("", sampleFiles, [], {}, {}, {})
    expect(result).toEqual(expectedResult)
  })

  it("should create a request with text and a file", async () => {
    const sample = {
      data: [{ text: "hello world" }, { uri: "data:image/png;base64,MTIz" }],
      parameters: {},
    }
    const expectedResult = JSON.stringify(sample, null, "\t")
    const sampleFiles = createMockFileList([
      {
        body: "123",
        mimeType: "image/png",
        name: "test.png",
      },
    ])
    const result = await formatDebugRequest(
      sample.data[0].text as string,
      sampleFiles,
      [],
      {},
      {},
      {}
    )
    expect(result).toEqual(expectedResult)
  })

  it("should create a request with custom parameters", async () => {
    const sample = {
      data: [
        { text: "hello world", modality: "test_2" },
        { uri: "data:image/png;base64,MTIz", anotherParam: "test_3" },
      ],
      parameters: { mode: "test_4" },
      rootParam: "hello World",
    }
    const expectedResult = JSON.stringify(sample, null, "\t")
    const sampleFiles = createMockFileList([
      {
        body: "123",
        mimeType: "image/png",
        name: "test.png",
      },
    ])
    const result = await formatDebugRequest(
      sample.data[0].text as string,
      sampleFiles,
      ["test1", "test2", "test3", "test4"],
      {
        test1: "root",
        test2: "textQuery",
        test3: "file-test.png",
        test4: "parameters",
      },
      {
        test1: "rootParam",
        test2: "modality",
        test3: "anotherParam",
        test4: "mode",
      },
      {
        test1: "hello World",
        test2: "test_2",
        test3: "test_3",
        test4: "test_4",
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
