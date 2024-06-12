// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

// Define the empty discount response
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: []
};

export function run(input) {
  const cart = input.cart;
  let discount = 0;
  
  const totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  if (totalQuantity >= 5) {
    discount = 0.15;
  } else if (totalQuantity >= 3) {
    discount = 0.10;
  }

  if (discount === 0) {
    return EMPTY_DISCOUNT;
  }

  const discounts = cart.lines.map(line => ({
    targets: [
      {
        productVariant: { id: line.merchandise.id }  // Correctly reference merchandise.id
      }
    ],
    value: {
      percentage: { 
        value: discount * 100
      }
    },
    message: `You've received a ${discount * 100}% discount!`  // Use template literals correctly
  }));

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts
  };
}
