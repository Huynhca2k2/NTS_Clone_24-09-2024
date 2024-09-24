export class DateTime {
  private static numberToString(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  static GetTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays} ngày trước`;
    } else if (diffHours > 0) {
      return `${diffHours} giờ trước`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} phút trước`;
    } else {
      return "Vừa xong";
    }
  }

  static GetDate(date: Date): string {
    return `${DateTime.numberToString(
      date.getDate()
    )}-${DateTime.numberToString(date.getMonth() + 1)}-${date.getFullYear()}`;
  }

  static getTimeOrDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      return DateTime.GetDate(date);
    } else {
      return DateTime.GetTime(date);
    }
  }
}
