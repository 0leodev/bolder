import { toast } from "sonner"

const createToast = (title?: string, description?: string) =>
  () => toast(title, {
    description,
    style: {
      background: 'var(--navigation)',
      borderRadius: '10px',
      fontSize: '14px',
      padding: '20px',
      backdropFilter: 'blur(10px)',
    }
  })

///------------------- Possible uses  ------------------///

export const borrowSubmitted = createToast(
  'BORROW SUBMITTED',
  'Transaction sent to leverageZapper contract.'
)

export const txProcessed = createToast(
  'PROCESSED SUCCESSFULLY',
  'Transaction was processed successfully.'
)

export const failedSubmitted = createToast(
  'FAILED',
  'Transaction has failed, try again.'
)