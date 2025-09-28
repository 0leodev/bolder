import { PRICE_FEEDS, MIN_BORROW_AMOUNT } from "@/config/constants"
import type { CollateralType, ValidationError } from "@/types/borrow"

export class BorrowCalculations {
  static calculateMaxBorrowAmount(amount: number, type: CollateralType): number {
    return (amount * PRICE_FEEDS[type.symbol] * type.ltvMax) / 100
  }

  static calculateCurrentLTV(borrow: number, collateral: number, type: CollateralType): number {
    return collateral === 0 ? 0 : (borrow / (collateral * PRICE_FEEDS[type.symbol])) * 100
  }

  static calculateLiquidationPrice(borrow: number, collateral: number, type: CollateralType): number {
    return collateral === 0 ? 0 : borrow / (collateral * (type.ltvMax / 100))
  }

  static calculateInterestCost(amount: number, rate: number): number {
    return (amount * rate) / 100
  }

  static validateBorrowInputs(collateral: string, borrow: string, type: CollateralType): ValidationError[] {
    const errors: ValidationError[] = []
    const collateralNum = parseFloat(collateral)
    const borrowNum = parseFloat(borrow)

    if (isNaN(collateralNum) || collateralNum <= 0) {
      errors.push({ field: "collateral", message: "Please enter a valid collateral amount" })
    }

    if (isNaN(borrowNum) || borrowNum < MIN_BORROW_AMOUNT) {
      errors.push({ field: "borrow", message: `Minimum borrow amount is ${MIN_BORROW_AMOUNT} BOLD` })
    }

    if (!isNaN(collateralNum) && !isNaN(borrowNum) && collateralNum > 0) {
      const maxBorrow = this.calculateMaxBorrowAmount(collateralNum, type)
      if (borrowNum > maxBorrow) {
        errors.push({ field: "borrow", message: `Maximum borrow amount is ${maxBorrow.toFixed(2)} BOLD` })
      }
    }

    return errors
  }
}