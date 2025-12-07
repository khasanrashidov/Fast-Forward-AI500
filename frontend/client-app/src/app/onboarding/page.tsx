'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Rocket } from 'lucide-react';
import { getUser, updateUser } from '@/lib/services/users';
import { toast } from 'sonner';

type FormState = {
  salary: string;
  age: string;
  family_size: string;
};

const formatNumberInput = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  const number = Number(digits);
  if (Number.isNaN(number)) return '';
  return number.toLocaleString('en-US');
};

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    salary: '',
    age: '',
    family_size: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser()
      .then((user) => {
        setFormData({
          salary: user.salary?.toString() ?? '',
          age: user.age?.toString() ?? '',
          family_size: user.family_size?.toString() ?? '',
        });
      })
      .catch(() => {
        // silent, keep empty defaults
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await updateUser(undefined, {
        salary: Number((formData.salary || '0').replace(/,/g, '')),
        age: Number(formData.age || 0),
        family_size: Number(formData.family_size || 0),
      });
      setSuccess('Profile updated successfully.');
      toast.success('Profile updated successfully.');
      setTimeout(() => router.push('/'), 600);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'salary') {
      setFormData((prev) => ({ ...prev, [name]: formatNumberInput(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gradient-to-b from-[#f7fafc] to-white">
      <Card className="w-full max-w-2xl border-zinc-200 shadow-sm">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-zinc-200 bg-white">
              <Image
                src="/logo.png"
                alt="Moliyachi"
                fill
                className="object-contain p-2"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-2xl font-bold text-zinc-900">
                Set up your profile
              </CardTitle>
              <CardDescription>Tell us a few basics to personalize your experience</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="salary">Monthly salary (UZS)</Label>
              <Input
                id="salary"
                name="salary"
                type="text"
                inputMode="numeric"
                placeholder="3,500,000"
                value={formData.salary}
                onChange={handleChange}
              />
              <p className="text-xs text-zinc-500">Your take-home pay per month.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="26"
                value={formData.age}
                onChange={handleChange}
              />
              <p className="text-xs text-zinc-500">Used for tailored recommendations.</p>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="family_size">Family size</Label>
              <Input
                id="family_size"
                name="family_size"
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="3"
                value={formData.family_size}
                onChange={handleChange}
              />
              <p className="text-xs text-zinc-500">Include yourself and dependents.</p>
            </div>

            {error && (
              <div className="md:col-span-2 rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="md:justify-end">
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save & Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
