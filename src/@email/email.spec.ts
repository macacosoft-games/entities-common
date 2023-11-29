import { Email } from './email';

describe('Email', () => {
  describe('constructor', () => {
    it('should create an Email object with a valid email address', () => {
      const email = new Email('test@example.com');
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe('test@example.com');
    });

    it('should throw an error with an invalid email address', () => {
      expect(() => new Email('invalid-email')).toThrow('Invalid value for Email');
    });

    it('should return the correct email value', () => {
      const email = new Email('test@example.com');
      expect(email.value).toBe('test@example.com');
    });
  });

  describe('toString', () => {
    it('should return the email as a string', () => {
      const email = new Email('test@example.com');
      expect(email.toString()).toBe('test@example.com');
    });
  });

  describe('equals', () => {
    it('should return true for matching emails', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('test@example.com');
      expect(email1.equals(email2)).toBeTruthy();
    });

    it('should return false for non-matching emails', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('other@example.com');
      expect(email1.equals(email2)).toBeFalsy();
    });

    it('should return false when comparing with null', () => {
      const email = new Email('test@example.com');
      expect(email.equals(null)).toBeFalsy();
    });

    it('should return true when for matching email with equal string value', () => {
      const email1 = new Email('test@gmail.com');
      const email2 = 'TEST+01@gmail.com';
      expect(email1.equals(email2)).toBeTruthy();
    });

    it('should return false when for matching email with non-equal string value', () => {
      const email1 = new Email('test@gmail.com');
      const email2 = 'test@example.com';
      expect(email1.equals(email2)).toBeFalsy();
    });
  });

  describe('constructor normalization', () => {
    it('should convert email to lowercase', () => {
      const email = new Email('TEST@EXAMPLE.COM');
      expect(email.value).toBe('test@example.com');
    });

    it('should remove Gmail alias and convert to lowercase', () => {
      const email = new Email('Test+Alias@gmail.com');
      expect(email.value).toBe('test@gmail.com');
    });

    it('should not remove non-Gmail alias and convert to lowercase', () => {
      const email = new Email('Test+Alias@example.com');
      expect(email.value).toBe('test+alias@example.com');
    });
  });
});
