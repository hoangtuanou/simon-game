const arrayWithRandomNumber = (lengthOfArray, min, max) => {
  const emptyArr = Array.from(new Array(lengthOfArray));
  return emptyArr.map(() => Math.floor(Math.random() * (max - min + 1)) + min);
};

const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });

export default {
  arrayWithRandomNumber,
  wait
};
