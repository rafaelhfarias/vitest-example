import { AppointmentRepository } from './../repositories/appointment-repository';
import { Appointment } from './../entities/appointment';
interface CreateAppointmentRequest{
    customer: string,
    startsAt: Date,
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment{
    constructor(
        private appointmentRepository: AppointmentRepository
    ) {
        
    }

    async execute({customer, endsAt, startsAt}: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{

        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt,endsAt)
        if(overlappingAppointment){
            throw new Error('This appointment is overlapping another appointment')
        }
        const appointment =  new Appointment({customer, endsAt, startsAt})
        await this.appointmentRepository.create(appointment)
        return appointment
    }
}