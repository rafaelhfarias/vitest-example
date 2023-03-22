import { Appointment } from './../entities/appointment';
import { InMemoryAppointmentRepository } from './../repositories/in-memory/in-memory-appointment-repository';
import { CreateAppointment } from './create-appointment';
import { describe, it, expect } from "vitest";
import {getFutureDates} from '../test/utils/get-future-dates'

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(inMemoryAppointmentRepository)
        const startsAt = new Date()
        const endsAt = new Date()
        endsAt.setDate(startsAt.getDate() + 1)
        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startsAt,
                endsAt
            })).resolves.toBeInstanceOf(Appointment)
    }) 

    it('should not be able to create an appointment with overlapping dates', async () => {
        const inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(inMemoryAppointmentRepository)
        const startsAt = getFutureDates('2023-04-18')
        const endsAt = getFutureDates('2023-05-20')
        await createAppointment.execute({
                customer: 'John Doe',
                startsAt: getFutureDates('2023-04-09'),
                endsAt: getFutureDates('2023-04-20')
            })
        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startsAt,
                endsAt
            })
            ).rejects.toThrow()
    }) 
})