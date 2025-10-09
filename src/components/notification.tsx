import { borrowSubmitted, txProcessed, failedSubmitted } from '@/lib/sonner-notifications';

///------------------- Only for test purpose  ------------------///

export default function Notification() {
  return (
    <div className="flex gap-2 p-4">
      <button onClick={borrowSubmitted} className="px-4 py-2 bg-button text-white rounded-lg">
        Borrow Submitted
      </button>
      <button onClick={txProcessed} className="px-4 py-2 bg-button text-white rounded-lg">
        Tx Processed
      </button>
      <button onClick={failedSubmitted} className="px-4 py-2 bg-button text-white rounded-lg">
        Failed
      </button>
    </div>
  );
}