export const displayTime = (time: string) => {
    const dateObj = new Date(time);
    let hours = String(dateObj.getHours());
      let amOrPm;
      if(Number(hours) > 12) {
        hours = String(Number(hours) - 12);
        if(hours.length === 1) {
          hours = '0' + hours;
        }
        amOrPm = 'PM'
      } else {
        amOrPm = 'AM'
      }
      let minutes = String(dateObj.getMinutes());
      if(minutes.length === 1) {
        minutes = '0'+ minutes;
      }
      return `${hours}:${minutes}${amOrPm}`;
}