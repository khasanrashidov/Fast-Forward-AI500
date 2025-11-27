import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard as CreditCardIcon, Bell, Utensils, Car, ShoppingBag, TrendingUp, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import ExpensesChart from "@/components/ExpensesChart";
import ExchangeRates from "@/components/ExchangeRates";
import InflationChart from "@/components/InflationChart";
import CreditCard from "@/components/CreditCard";

export default function Home() {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image
              src="/user_avatar.png"
              alt="User Avatar"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Hello, Khasan Rashidov</h1>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Total Balance Card */}
      <section className="bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-emerald-100 text-sm font-medium">Total Balance</p>
            <h2 className="text-3xl font-bold mt-1">12,450,000 UZS</h2>
          </div>
          <Wallet className="text-emerald-100 opacity-80" size={24} />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <ArrowUpRight size={16} className="text-emerald-100" />
            <span className="text-sm font-medium">+2,300,000</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <ArrowDownLeft size={16} className="text-red-200" />
            <span className="text-sm font-medium">-850,000</span>
          </div>
        </div>
      </section>

      {/* My Cards */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">My Cards</h3>
          <button className="flex items-center gap-1 text-primary text-sm font-medium hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors">
            <Plus size={16} /> Add New
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <CreditCard
            type="Uzcard"
            balance="4,250,000 UZS"
            number="8600 •••• •••• 1234"
            expiry="12/28"
            color="bg-gradient-to-br from-emerald-500 to-teal-700"
          />
          <CreditCard
            type="Humo"
            balance="8,100,000 UZS"
            number="9860 •••• •••• 5678"
            expiry="09/27"
            color="bg-gradient-to-br from-blue-500 to-indigo-700"
          />
          <CreditCard
            type="Visa"
            balance="$ 1,240.50"
            number="4000 •••• •••• 9012"
            expiry="05/29"
            color="bg-gradient-to-br from-purple-500 to-pink-700"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-4 gap-4">
        {[
          { icon: ArrowUpRight, label: "Send", color: "bg-blue-100 text-blue-600" },
          { icon: ArrowDownLeft, label: "Request", color: "bg-purple-100 text-purple-600" },
          { icon: CreditCardIcon, label: "Cards", color: "bg-orange-100 text-orange-600" },
          { icon: Wallet, label: "Top Up", color: "bg-emerald-100 text-emerald-600" },
        ].map((action, index) => (
          <button key={index} className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.color}`}>
              <action.icon size={20} />
            </div>
            <span className="text-xs font-medium text-gray-600">{action.label}</span>
          </button>
        ))}
      </section>

      {/* Categories Chart */}
      <section>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Expenses by Category</h3>
            <button className="text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">See All</button>
          </div>
          <div className="flex items-center">
            <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronLeft size={20} /></button>
            <div className="flex-1">
              <ExpensesChart />
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronRight size={20} /></button>
          </div>
        </div>
      </section>

      {/* Recent Transactions Preview */}
      <section>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
            <button className="text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">See All</button>
          </div>
          <div className="-mx-6">
            {[
              { name: "Korzinka Market", date: "Today", amount: "-145,000 UZS", type: "expense", category: "Food & Dining", color: "bg-emerald-100 text-emerald-600", icon: Utensils, percentage: "25%" },
              { name: "Upwork Earnings", date: "Yesterday", amount: "+8,500,000 UZS", type: "income", category: "Income", color: "bg-blue-100 text-blue-600", icon: TrendingUp, percentage: "100%" },
              { name: "Yandex Taxi", date: "Yesterday", amount: "-24,000 UZS", type: "expense", category: "Transportation", color: "bg-blue-100 text-blue-600", icon: Car, percentage: "15%" },
              { name: "Zara", date: "2 days ago", amount: "-850,000 UZS", type: "expense", category: "Shopping", color: "bg-amber-100 text-amber-600", icon: ShoppingBag, percentage: "45%" },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.color}`}>
                    <tx.icon size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${tx.color.replace('text-', 'text-opacity-80 text-').replace('bg-', 'bg-opacity-50 bg-')}`}>
                        {tx.category}
                      </span>
                      <span className="text-xs text-gray-500">• {tx.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {tx.amount}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">{tx.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExchangeRates />
        <InflationChart />
      </section>
    </div>
  );
}
