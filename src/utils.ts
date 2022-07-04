export function formateLaDate(date: Date): string {
  return `${('0' + date.getDate()).slice(-2)} / ${('0' + date.getMonth()).slice(-2)} / ${date.getFullYear()}`;
}
