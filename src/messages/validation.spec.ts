
import { validateMessageRequest, validateMessageResponse } from './validation';

describe('validation', () => {
  it('should accept valid request', () => {
    const result = validateMessageRequest('Authorize', { idTag: "ABCDEF" }, ['Authorize']);
    expect(result.isRight()).toBeTruthy();
  })
  it('should reject invalid request', () => {
    const result = validateMessageRequest('Authorize', {}, ['Authorize']);
    expect(result.isLeft()).toBeTruthy();
  })
  it('should accept valid response', () => {
    const result = validateMessageResponse('Authorize', { idTagInfo: { status: "Accepted" } }, ['Authorize']);
    expect(result.isRight()).toBeTruthy();
  })
  it('should reject invalid response', () => {
    const result = validateMessageResponse('Authorize', {}, ['Authorize']);
    expect(result.isLeft()).toBeTruthy();
  })
})
