export default class Utils {
  /**
   * @param input the string to capitalize
   */
  public static capitalize(input: string): string {
    return input[0].toUpperCase() + input.slice(1);
  }
}
