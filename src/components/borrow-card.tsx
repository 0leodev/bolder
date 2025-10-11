import EthBalance from "@/components/EthBalance"
import { borrowSubmitted } from '@/lib/sonner-notifications';
import { Button } from '@/components/ui/button';

export default function BorrowCard() {
  return (
    <main className="max-w-lg mx-auto p-2 space-y-6">
      <EthBalance />
      <div className="bg-card rounded-2xl p-6 space-y-6 border border-border/50">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Collateral</span>
          </div>
      <Button onClick={borrowSubmitted} className="w-full mt-4 h-11 font-bold bg-primary/90 text-primary-foreground hover:bg-primary/60 rounded-xl">
        Borrow BOLD
      </Button>
        </div>
      </div>
    </main>
  );
}