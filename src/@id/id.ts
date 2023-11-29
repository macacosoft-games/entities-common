import { ulid } from 'ulid';
import { IsULID } from '@yuzu441/is-ulid';
import { validateSync } from 'class-validator';
import { IEquatable } from '../object/equatable';

/**
 * Represents an identifier value object.
 *
 * _Examples:_
 *
 * Creating a new identifier:
 * ```typescript
 * const newId = new Id();
 * ```
 *
 * Creating an identifier with an existing value:
 * ```typescript
 * const existingId = new Id('01ARZ3NDEKTSV4RRFFQ69G5FAV');
 * ```
 */
export class Id implements IEquatable<Id | string> {
  @IsULID()
  private readonly _value: string;

  /**
   * Constructs a new Id.
   *
   * @param value - The ULID value, if you need to use an existing identifier.
   */
  constructor(value?: string) {
    if (value) {
      this._value = value;
      const errors = validateSync(this);
      if (errors.length > 0) {
        throw new Error(`Invalid value for Id`);
      }
    } else {
      this._value = ulid();
    }
  }

  /**
   * Returns the identifier value.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Converts the Id class object to a string.
   * @returns The string representation of the Id.
   */
  toString(): string {
    return this._value;
  }

  /**
   * Compares the current Id object with another Id object.
   * @param other - Another Id object to compare with.
   * @returns Returns true if both Id objects have the same value.
   */
  equals(other: Id | string | null): boolean {
    if (!other) return false;
    return this._value === other.toString();
  }

  /**
   * The null value for Id (/00000000000000000000000000/).
   */
  static null: Id = new Id('00000000000000000000000000');
}
