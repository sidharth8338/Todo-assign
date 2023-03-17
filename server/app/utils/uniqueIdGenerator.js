const uniqueAlphaNumericId = (() => {
  const heyStack =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomInt = () =>
    Math.floor(Math.random() * Math.floor(heyStack.length));

  return (length = 24) =>
    Array.from({ length }, () => heyStack[randomInt()]).join("");
})();

const uniqueNumericId = (() => {
  const heyStack = "0123456789";
  const randomInt = () =>
    Math.floor(Math.random() * Math.floor(heyStack.length));

  return (length = 24) =>
    Array.from({ length }, () => heyStack[randomInt()]).join("");
})();

module.exports = {
  uniqueAlphaNumericId,
  uniqueNumericId,
};

// Use 20 chars for resume_id
// USe 30 chars for user_id
