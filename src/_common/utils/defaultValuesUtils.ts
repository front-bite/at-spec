/**
 * Функция обрезает строку до первой точки и возвращает обрезанное значение.
 *
 * @param {string} text Текст с точками.
 */
export const truncateString = (text: string) => {
  const index = text.indexOf('.');
  const camelCaseText = text.charAt(0).toLowerCase() + text.slice(1);
  if (index !== -1) {
    return camelCaseText.substring(0, index);
  }
  return camelCaseText.charAt(0).toLowerCase() + camelCaseText.slice(1);
};
