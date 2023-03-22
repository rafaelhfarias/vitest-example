export interface AppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment{
    
    props: AppointmentProps;

    get customer(){
        return this.props.customer
    }

    get startsAt(){
        return this.props.startsAt
    }

    get endsAt(){
        return this.props.endsAt
    }

    constructor(props: AppointmentProps){

        if(props.endsAt <= props.startsAt){
            throw Error('End date is lower than start date')
        }

        if (props.startsAt < new Date()){
            throw Error('Invalid start date')
        }

        this.props = props
    }
}