import { ClockClassTemplate } from './ClockClassTemplate';

class Time extends ClockClassTemplate {
  getTime(options) {
    const rawTime = new Date();

    // NOTE: this.defaultOptions is not accessible AT THE MOMENT so
    // TODO: create a new class template that contains all the default options for the clock
    const showHour12 =
      options.showHour12 === true
        ? options.showHour12
        : this.defaultOptions.showHour12;

    const formatter = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      showHour12: showHour12,
    });

    const filteredTime = formatter
      .formatToParts(rawTime)
      .filter((row) => row['type'] !== 'literal');

    // this takes the filtered time object and gets the last two digits from each value string, so i can then save them into a new
    // object with a specific key name. I have done it this way so I can use the final key value as a template literal to render
    // the correct css class
    const tempTimeObj = {};
    filteredTime.forEach(function (item) {
      let tempTimeValue = item['value']
        .padStart(2, '0')
        .split('')
        .slice(-2);

      tempTimeValue.forEach((value, i) => {
        tempTimeObj[`${item['type']}${i + 1}`] = value;
      });
    });

    const timeObj = {
      ye1: tempTimeObj.year1,
      ye2: tempTimeObj.year2,
      mo1: tempTimeObj.month1,
      mo2: tempTimeObj.month2,
      da1: tempTimeObj.day1,
      da2: tempTimeObj.day2,
      hh1: tempTimeObj.hour1,
      hh2: tempTimeObj.hour2,
      mm1: tempTimeObj.minute1,
      mm2: tempTimeObj.minute2,
      ss1: tempTimeObj.second1,
      ss2: tempTimeObj.second2,
      antePost:
        `${tempTimeObj.dayPeriod1}${tempTimeObj.dayPeriod2}`.toLowerCase(),
    };
    return timeObj;
  }
}
export default new Time();
