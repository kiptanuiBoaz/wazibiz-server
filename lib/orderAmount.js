const calculateOrderAmount = (items) => {
    const array = items.map(({ price, cartQuantity }) => price * cartQuantity);
    const totalAmount = array.reduce((a, b) => a + b, 0);
  
    return totalAmount;
  };

  module.exports = {calculateOrderAmount};