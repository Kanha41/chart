import { validateBidAmount, validateTrade } from '../utils/tradeValidator';

/**
 * Unit tests for trade validation functions
 */

describe('validateBidAmount', () => {
  test('should reject zero bid amount', () => {
    const result = validateBidAmount(0);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('cannot be zero');
  });

  test('should accept positive bid amount', () => {
    const result = validateBidAmount(100.50);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  test('should reject negative bid amount', () => {
    const result = validateBidAmount(-50);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('negative');
  });

  test('should reject undefined bid amount', () => {
    const result = validateBidAmount(undefined);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('required');
  });

  test('should reject null bid amount', () => {
    const result = validateBidAmount(null);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('required');
  });

  test('should reject non-numeric bid amount', () => {
    const result = validateBidAmount('abc');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('valid number');
  });
});

describe('validateTrade', () => {
  test('should reject trade with zero bid amount', () => {
    const tradeData = {
      bidAmount: 0,
      tradeType: 'buy',
      quantity: 1
    };
    const result = validateTrade(tradeData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('zero'))).toBe(true);
  });

  test('should accept valid buy trade', () => {
    const tradeData = {
      bidAmount: 100,
      tradeType: 'buy',
      quantity: 1
    };
    const result = validateTrade(tradeData);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('should accept valid sell trade', () => {
    const tradeData = {
      bidAmount: 100,
      tradeType: 'sell',
      quantity: 2
    };
    const result = validateTrade(tradeData);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('should reject invalid trade type', () => {
    const tradeData = {
      bidAmount: 100,
      tradeType: 'invalid',
      quantity: 1
    };
    const result = validateTrade(tradeData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('Trade type'))).toBe(true);
  });

  test('should reject zero quantity', () => {
    const tradeData = {
      bidAmount: 100,
      tradeType: 'buy',
      quantity: 0
    };
    const result = validateTrade(tradeData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('Quantity'))).toBe(true);
  });

  test('should report multiple validation errors', () => {
    const tradeData = {
      bidAmount: 0,
      tradeType: 'invalid',
      quantity: 0
    };
    const result = validateTrade(tradeData);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});
