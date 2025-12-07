import { Wifi } from 'lucide-react';

interface CreditCardProps {
  type: 'Uzcard' | 'Humo' | 'Visa';
  balance: string;
  number: string;
  expiry: string;
  color: string;
}

export default function CreditCard({ type, balance, number, expiry, color }: CreditCardProps) {
  return (
    <div
      className={`relative w-72 h-44 rounded-2xl p-6 text-white shadow-lg flex-shrink-0 overflow-hidden ${color} backdrop-blur-md border border-white/20`}
    >
      {/* Background Pattern/Glass effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium opacity-80">Current Balance</p>
            <h3 className="text-xl font-bold mt-1">{balance}</h3>
          </div>
          <span className="font-bold text-lg opacity-90">{type}</span>
        </div>

        <div className="flex items-center gap-2 my-2">
          <div className="w-8 h-6 bg-yellow-200/20 rounded-md border border-yellow-200/40 flex items-center justify-center">
            <div className="w-5 h-4 border border-yellow-200/60 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-yellow-200/40 rounded-[1px]"></div>
              <div className="bg-yellow-200/40 rounded-[1px]"></div>
              <div className="bg-yellow-200/40 rounded-[1px]"></div>
              <div className="bg-yellow-200/40 rounded-[1px]"></div>
            </div>
          </div>
          <Wifi size={16} className="rotate-90 opacity-70" />
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm font-medium tracking-widest opacity-90">{number}</p>
            <p className="text-xs mt-1 opacity-70">Khasan Rashidov</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] opacity-70">Exp Date</p>
            <p className="text-sm font-medium">{expiry}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
