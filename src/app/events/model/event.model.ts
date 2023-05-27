export class Event {
  is_match: boolean;
  event_type: string;
  club: string;
  name: string;
  description: string;
  location: {
    lat: string;
    long: string;
    address_line_1: string;
    address_line_2: string;
  };
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  is_paid: boolean;
  amount: string;
  is_repeated: boolean;
  frequency_details: {
    repeat_type: 'week';
    day: 0;
    dayOfWeek: 3;
    weekOfMonth: 0;
    dayOfMonth: 0;
    month: 0;
    years: 0;
  };
  is_private: boolean;
  only_auth_user: true;
}
