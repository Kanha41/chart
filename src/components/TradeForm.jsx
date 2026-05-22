import { useState } from 'react';
import { useTradeValidation } from '../hooks/useTradeValidation';
import '../styles/TradeForm.css';

/**
 * TradeForm Component
 * Handles trade placement with bid amount validation
 */
export const TradeForm = ({ onTradePlaced }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [quantity, setQuantity] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { validationError, validateAndPlaceTrade, isBidAmountValid, clearError } = useTradeValidation();

  const handleBidAmountChange = (e) => {
    const value = e.target.value;
    setBidAmount(value);
    if (value !== '' && parseFloat(value) === 0) {
      isBidAmountValid(parseFloat(value));
    } else {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate trade before submission
      const tradeData = {
        bidAmount: parseFloat(bidAmount),
        tradeType,
        quantity: parseFloat(quantity)
      };

      if (!validateAndPlaceTrade(tradeData)) {
        setIsSubmitting(false);
        return;
      }

      // If validation passes, proceed with trade placement
      // This is where your actual trade placement logic goes
      await placeTrade(tradeData);

      // Reset form on success
      setBidAmount('');
      setQuantity('1');

      if (onTradePlaced) {
        onTradePlaced(tradeData);
      }
    } catch (error) {
      console.error('Error placing trade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeTrade = async (tradeData) => {
    if (!tradeData.bidAmount || tradeData.bidAmount <= 0) {
      throw new Error('Cannot place trade with zero or negative bid amount');
    }
    // Replace this with your actual API call or trade placement logic
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Trade placed successfully:', tradeData);
        resolve();
      }, 500);
    });
  };

  return (
    <div className="trade-form">
      <h2>Place Trade</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bidAmount">Bid Amount *</label>
          <input
            id="bidAmount"
            type="number"
            step="0.01"
            min="0.01"
            value={bidAmount}
            onChange={handleBidAmountChange}
            placeholder="Enter bid amount (cannot be zero)"
            disabled={isSubmitting}
            className={validationError ? 'input-error' : ''}
          />
          {validationError && (
            <span className="error-message">{validationError}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tradeType">Trade Type *</label>
          <select
            id="tradeType"
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity (Lot Size) *</label>
          <input
            id="quantity"
            type="number"
            step="0.1"
            min="0.1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !bidAmount || parseFloat(bidAmount) <= 0}
          className="submit-btn"
        >
          {isSubmitting ? 'Placing Trade...' : 'Place Trade'}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
