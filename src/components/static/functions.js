// Get Time Function
export const getTime = () => {
  const hours = new Date().getHours();

  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 16) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
