import { Appointment } from './appointment';
import {expect, test} from 'vitest'
import { getFutureDates } from '../test/utils/get-future-dates';

test('create appointment', () => {
    const startDate = getFutureDates('2023-04-18')
    const endDate = getFutureDates('2023-04-20')


    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt: startDate,
        endsAt: endDate
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('John Doe')
})

test('cannot create an appointment with end date before start date', () => {

    const startDate = getFutureDates('2023-04-18')
    const endDate = getFutureDates('2023-04-15')

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate
        })
    }).toThrow()

})

test('cannot create an appointment with start date before today', () => {

    const startDate = getFutureDates('2022-02-18')
    const endDate = getFutureDates('2023-04-20')
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate
        })
    }).toThrow()

})