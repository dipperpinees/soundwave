export const formatTime = (num) => {
    if (!num) return '00.00';
    const second = Math.floor(num % 60);
    const minute = Math.floor(num / 60);
    return `${minute < 10 ? '0' + minute : minute}.${second < 10 ? '0' + second : second}`;
};
