import {CardioParams} from './CardioParams';
import {OtherSympthoms} from './OtherSympthoms';
export class DailyStats {
        measurement_id: string;
        datetime: Date;
        cardio_params: {CardioParams};
        heart_rate: number;
        other_sympthoms: OtherSympthoms;
    }
