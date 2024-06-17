const months: { [key: number]: string } = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};
export const getDate = (date: string) => {
  const postDate = new Date(date);
  const formattedDate = `${postDate.getDate()} ${months[postDate.getMonth()]} , ${postDate.getFullYear()} at ${postDate.getHours()}:${postDate.getMinutes()}`;
  return formattedDate;
};
