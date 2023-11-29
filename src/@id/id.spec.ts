import { Id } from './id';

describe('Id', () => {
  describe('constructor', () => {
    it('should generate a valid ulid when no argument is provided', () => {
      const idInstance = new Id();
      expect(idInstance.value).toMatch(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/);
    });

    it('should accept a valid ulid as an argument', () => {
      const validUlid = '01ARZ3NDEKTSV4RRFFQ69G5FAV'; // Replace with actual ULID pattern if different
      const idInstance = new Id(validUlid);
      expect(idInstance.value).toBe(validUlid);
    });

    it('should throw an error for an invalid ulid', () => {
      const invalidUlid = 'invalid_ulid';
      expect(() => new Id(invalidUlid)).toThrow(/Неверное значение для Id.*/);
    });
  });

  describe('toString', () => {
    it('should return a string representation of the ulid', () => {
      const validUlid = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
      const idInstance = new Id(validUlid);
      expect(idInstance.toString()).toBe(validUlid);
    });
  });

  describe('equals', () => {
    it('should return a true for a same values', () => {
      const id1 = new Id();
      const id2 = new Id(id1.value);
      expect(id1.equals(id2)).toBeTruthy();
    });

    it('should return a false for a different values', () => {
      const id1 = new Id();
      const id2 = new Id();
      expect(id1.equals(id2)).toBeFalsy();
    });

    it('should return a true for a same string value', () => {
      const id = new Id();
      expect(id.equals(id.value)).toBeTruthy();
    });

    it('should return a false when comparing with null', () => {
      const id1 = new Id();
      expect(id1.equals(null)).toBeFalsy();
    });
  });
});
