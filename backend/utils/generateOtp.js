const MAX = 999999;
const MIN = 100000;

export const getOtp=()=>{
    return Math.floor(MIN + Math.random() * (MAX - MIN + 1));
};
