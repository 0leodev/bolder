import useBorrowState from "@/hooks/useBorrowState"
import { borrowSubmitted } from "@/lib/sonner-notifications"
import { BorrowState } from "@/types/borrow"

export default function useHandleBorrow(validateInputs: () => boolean, state: BorrowState) {

  return () => {
    if (validateInputs()) {
      console.log("Borrowing with state:", state)
      borrowSubmitted()
    }
  }
}
