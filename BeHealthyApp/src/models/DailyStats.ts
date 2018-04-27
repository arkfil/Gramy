import {Pressure} from './Pressure';
import{OtherSympthoms} from './OtherSympthoms';
export class DailyStats {
        measurement_id: string;
        datetime: Date;
        pressure: Pressure;
        heart_rate: number;
        other_sympthoms: OtherSympthoms;
    }