export type TQuote = {
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: string;
  tags: string[];
  _id: string;
};

export type TBackupQuote = {
  slip: {
    id: number;
    advice: string;
  };
};

export type TClock = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: false;
  dst_from: null | number;
  dst_offset: null | number;
  dst_until: null | number;
  raw_offset: null | number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};
