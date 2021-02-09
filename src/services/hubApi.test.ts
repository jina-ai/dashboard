import {queryParamsSerializer, getRawMarkdownURL} from './hubApi'
describe('parameter serializer', () => {
    it('serializes params', () => {

    const paramsObject = {
        kind: ['encoder'],
        type: ['script'],
        somethingUndefined: undefined,
        emptyArray: []
    }

    expect(queryParamsSerializer(paramsObject)).toEqual('kind=encoder&type=script')
    })
})

describe('getRawMarkdownURL', () => {
    expect(getRawMarkdownURL('github.com')).toEqual('raw.githubusercontent.com/master/README.md')
    expect(getRawMarkdownURL('https://github.com/jina-ai/jina-hub/github-encoder'))
    .toEqual('https://raw.githubusercontent.com/jina-ai/jina-hub/github-encoder/master/README.md')
})