"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CreditCard, Plus } from "lucide-react";

import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCard, type Card } from "@/lib/services/cards";
import { CARD_TYPES, CURRENCIES, type CardType, type Currency } from "@/lib/enums";

type Props = {
  initialCards: Card[];
  username: string;
};

const createCardSchema = z.object({
  card_name: z.string().min(1, "Name is required"),
  card_number: z
    .string()
    .min(12, "Card number is required")
    .max(32, "Too long"),
  balance: z
    .string()
    .min(1, "Balance is required")
    .transform((val) => Number(val.replace(/,/g, "")))
    .refine((val) => Number.isFinite(val), "Enter a valid number"),
  currency: z.enum(CURRENCIES),
  card_type: z.enum(CARD_TYPES),
  expiration_date: z.string().min(1, "Expiration date is required"),
});

const formatNumberInput = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const number = Number(digits);
  if (Number.isNaN(number)) return "";
  return number.toLocaleString("en-US");
};

function maskCard(cardNumber: string) {
  if (!cardNumber) return "**** **** ****";
  const first4 = cardNumber.slice(0, 4);
  const last4 = cardNumber.slice(-4);
  return `${first4} **** **** ${last4}`;
}

function formatAmount(value: number, currency: string) {
  return `${value.toLocaleString("en-US")} ${currency}`;
}

export function DashboardCards({ initialCards, username }: Props) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    card_name: "",
    card_number: "",
    balance: "",
    currency: "UZS" as Currency,
    card_type: CARD_TYPES[0] as CardType,
    expiration_date: "",
  });

  const handleCreate = async () => {
    const parsed = createCardSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }

    setSubmitting(true);
    try {
      const created = await createCard({
        username,
        card_name: parsed.data.card_name,
        card_number: parsed.data.card_number,
        balance: parsed.data.balance,
        currency: parsed.data.currency,
        card_type: parsed.data.card_type,
        expiration_date: parsed.data.expiration_date,
      });
      setCards((prev) => [created, ...prev]);
      toast.success("Card added");
      setForm({
        card_name: "",
        card_number: "",
        balance: "",
        currency: "UZS",
        card_type: CARD_TYPES[0] as CardType,
        expiration_date: "",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add card");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UiCard className="flex flex-col">
      <CardHeader className="flex items-center justify-between gap-2 pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <CreditCard className="h-4 w-4 text-[var(--primary)]" />
          My cards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">No cards yet.</p>
        ) : (
          cards.map((card, idx) => {
            const gradients = [
              "from-primary/12 via-primary/8 to-accent/12",
              "from-purple-500/15 via-primary/10 to-blue-500/15",
              "from-amber-400/15 via-primary/10 to-lime-400/15",
              "from-rose-500/15 via-primary/10 to-orange-400/15",
            ];
            const gradient = gradients[idx % gradients.length];
            return (
              <div
                key={card.id}
                className={`rounded-xl border border-primary/20 bg-gradient-to-br ${gradient} p-4 text-foreground shadow-sm`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold">{card.card_name}</div>
                  <Badge className="text-[11px] bg-blue-500/15 text-blue-700 border border-blue-500/30">
                    {card.card_type}
                  </Badge>
                </div>
                <div className="mt-1 text-lg font-semibold tracking-widest">
                  {maskCard(card.card_number)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{card.currency}</span>
                  <span>Exp: {card.expiration_date}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-base font-semibold text-foreground">
                      {formatAmount(card.balance, card.currency)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-2">
              <Plus className="h-4 w-4" />
              Add card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new card</DialogTitle>
              <DialogDescription>Provide card details to create it.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="card-name">Card name</Label>
                <Input
                  id="card-name"
                  placeholder="Salary Card"
                  value={form.card_name}
                  onChange={(e) => setForm((p) => ({ ...p, card_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="8600 1234 1234 1234"
                  value={form.card_number}
                  onChange={(e) => setForm((p) => ({ ...p, card_number: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="balance">Balance</Label>
                  <Input
                    id="balance"
                    inputMode="decimal"
                    placeholder="1,000,000"
                    value={form.balance}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, balance: formatNumberInput(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={form.currency}
                    onValueChange={(value) =>
                      setForm((p) => ({ ...p, currency: value as Currency }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Card type</Label>
                  <Select
                    value={form.card_type}
                    onValueChange={(value) =>
                      setForm((p) => ({ ...p, card_type: value as CardType }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CARD_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiration date</Label>
                  <Input
                    id="expiry"
                    placeholder="12/28"
                    value={form.expiration_date}
                    onChange={(e) => setForm((p) => ({ ...p, expiration_date: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={submitting}>
                {submitting ? "Saving..." : "Create card"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </UiCard>
  );
}

