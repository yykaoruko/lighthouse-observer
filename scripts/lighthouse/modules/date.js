const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDatetime = (time) => {
  return dayjs(time).tz(process.env.TZ).format('YYYY/MM/DD HH:mm');
};
