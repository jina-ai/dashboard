import { getStars } from "./StarRating";

const mockUpdateRating = jest.fn();

describe('StarRating', () => {
    it('returns five star elements', () => {
        expect(getStars(3.5, mockUpdateRating).length).toEqual(5)
    })

    it('returns 3 full stars', () => {
        const getFullStars = (stars: JSX.Element[]) => stars.filter(star => star.props.children === 'star')
        expect(getFullStars(getStars(3.5, mockUpdateRating)).length).toEqual(3)
    })

    it('returns a half star', () => {
        expect(getStars(3.5, mockUpdateRating)[3].props.children).toEqual('star_half')
    })

    it('returns an empty star', () => {
        expect(getStars(3.5, mockUpdateRating)[4].props.children).toEqual('star_outline')
    })
})