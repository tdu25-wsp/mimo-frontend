const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * 日付を "MM-DD" 形式でフォーマット
 */
const formatMonthDay = (date: Date | string): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  return targetDate
    .toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
    });
}
/**
 * 日付を "ddd" 形式でフォーマット
 */
const formatDayOfWeek = (date: Date | string): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  return targetDate.toLocaleDateString("ja-JP", {
    weekday: "short",
  });
}

/**
 * 日付を "YYYY-MM-DD" 形式でフォーマット
 */
export const formatDateKey = (date: Date | string): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  return targetDate
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
};

/**
 * 日付を "YYYY-MM-DD (ddd)" 形式でフォーマット
 */
export const formatDateWithDay = (date: Date | string): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  const dateYearWithDate = formatDateKey(date);

  const dayStr = formatDayOfWeek(date);

  return `${dateYearWithDate} (${dayStr})`;
};

/**
 * 日付を今年なら "MM-DD (ddd)" 形式でフォーマット、それ以外なら "YYYY-MM-DD (ddd)" 形式でフォーマット
 */
export const formatDateConditionally = (date: Date | string): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  const isThisYear = targetDate.getFullYear() === today.getFullYear();

  if (isThisYear) {
    const monthDay = formatMonthDay(targetDate);
    const dayStr = formatDayOfWeek(targetDate);

    return `${monthDay} (${dayStr})`;
  } else {
    return formatDateWithDay(targetDate);
  }
}

type DateRelation = "today" | "yesterday" | "other";

export const getDateRelation = (date: Date | string): DateRelation => {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(targetDate, today)) {
    return "today";
  } else if (isSameDay(targetDate, yesterday)) {
    return "yesterday";
  } else {
    return "other";
  }
};

export const formatRelativeDate = (
  date: Date | string,
  relation?: DateRelation
): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  const relationDate = relation || getDateRelation(targetDate);

  switch (relationDate) {
    case "today":
      return "今日";
    case "yesterday":
      return "昨日";
    case "other":
    default:
      return formatDateConditionally(targetDate);
  }
};
