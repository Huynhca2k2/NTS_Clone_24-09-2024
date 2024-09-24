export class TimeUtils {
  static microsecondToString(totalTime: number): string {
    const seconds = totalTime / 1000;
    if (seconds < 60) {
      // return `${seconds} giây`;
      return '1 phút';
    } else {
      let str = `${Math.floor(seconds / 60)} phút`;
      if (seconds % 60 != 0) {
        // str += ` ${seconds % 60} giây`;
        let str = `${Math.floor(seconds / 60) + 1} phút`;
      }
      return str;
    }
  }
}
