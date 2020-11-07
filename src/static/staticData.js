// Get Time
const hours = new Date().getHours();

export const getTime = () => {
  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 16) {
    return "Good Afternoon";
  } else {
    return "Good evening";
  }
};
// ///// //
