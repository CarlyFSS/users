/**
 * - @min **(number)** the minimum number of characters
 * - @max **(number)** the maximum number of characters
 * - @regex **(string)** the regex to validate the field
 * - @message **(string)** defines the error message when the validation is not met
 */
export default interface ValidationObject {
  min: number;
  max: number;
  regex: string;
  regex_message?: { message: string };
  length_message?: { message: string };
}
