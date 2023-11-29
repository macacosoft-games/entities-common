import { IsEmail, validateSync } from 'class-validator';
import { IEquatable } from '../object/equatable';

/**
 * Class for representing an email address.
 *
 * _Examples:_
 *
 * Creating a new Email object:
 * ```typescript
 * const email = new Email('example@example.com');
 * ```
 *
 * Getting the value of Email as a string:
 * ```typescript
 * const emailString: string = email.value;
 * ```
 *
 * Comparing two Email objects:
 * ```typescript
 * const email1 = new Email('example@example.com');
 * const email2 = new Email('other@example.com');
 * const isEqual = email1.equals(email2);
 * ```
 */
export class Email implements IEquatable<Email | string> {
  @IsEmail()
  private readonly _value: string;

  /**
   * Constructs a new Email.
   * @param value - A string representing the email address.
   *                Must conform to the email address format.
   */
  constructor(value: string) {
    this._value = Email.normalizeEmail(value);
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error(`Invalid value for Email`);
    }
  }

  /**
   * Returns the email address value.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Converts the Email class object to a string.
   * @returns The string representation of the email address.
   */
  toString(): string {
    return this._value;
  }

  /**
   * Compares the current Email object with another Email object.
   * @param other - Another Email object to compare with.
   * @returns Returns true if both Email objects have the same value.
   */
  equals(other: Email | string | null): boolean {
    if (!other) return false;
    if (typeof other === 'string') {
      return this._value === Email.normalizeEmail(other);
    }
    return this._value === other._value;
  }

  /**
   * Normalizes an email address.
   * @param email - The email address to normalize.
   * @returns The normalized email address.
   */
  private static normalizeEmail(email: string): string {
    email = email.toLowerCase();
    const [localPart, domain] = email.split('@');

    if (domain === 'gmail.com') {
      const normalizedLocalPart = localPart.split('+')[0];
      return `${normalizedLocalPart}@${domain}`;
    }

    return email;
  }
}
