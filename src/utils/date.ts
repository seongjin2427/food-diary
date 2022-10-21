export function getToday() {
  const todayDate = new Date();
  const prevDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7);
  const nextDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  return [prevDate, nextDate];
}
