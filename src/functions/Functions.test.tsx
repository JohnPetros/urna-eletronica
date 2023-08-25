import { checkIsPublicRoute } from "."

describe('checkIsPublicRoute function', () => {
  it('should return true if the current route is public and false otherwise', () => {
    expect(checkIsPublicRoute('/')).toBe(true)
    expect(checkIsPublicRoute('/voting')).toBe(false)
    expect(checkIsPublicRoute('/results')).toBe(false)
  })
})