import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getTimeAgo = (date) => {
  return dayjs(date).fromNow();
};
export const formatDateDMY = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};
