import { expect, it } from "vitest"
import { getFutureDates } from "./get-future-dates"
it('should return a date one year later', () => {
    const year = new Date().getFullYear()
    expect(getFutureDates(`${year}-03-19`).getFullYear()).toEqual(year + 1)
})