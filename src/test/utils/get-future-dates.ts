import { parseISO, setYear } from "date-fns";


export function getFutureDates(date: string) : Date {
    return setYear(parseISO(date), parseISO(date).getFullYear() + 1 )
}