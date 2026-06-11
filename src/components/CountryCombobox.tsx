import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { COUNTRIES, type Country } from "@/lib/data/countries";

interface CountryComboboxProps {
  label: string;
  value: string;
  onChange: (code: string) => void;
  className?: string;
  premium?: boolean;
}

export function CountryCombobox({ label, value, onChange, className, premium }: CountryComboboxProps) {
  const [open, setOpen] = useState(false);
  const selected = COUNTRIES.find((c) => c.code === value);

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-[#1A1A1A]">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal",
              premium
                ? "h-14 rounded-xl border-2 border-gray-200 bg-white/80 text-base backdrop-blur-sm hover:border-[#185FA5] focus-visible:border-[#185FA5] focus-visible:ring-[#185FA5]/20"
                : "border-black/[0.1] bg-[#F9F8F6]",
            )}
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <span className={premium ? "text-2xl" : ""}>{selected.flag}</span>
                <span>{selected.name}</span>
              </span>
            ) : (
              <span className="text-[#1A1A1A]/50">Select country…</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search countries…" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((country: Country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code}`}
                    onSelect={() => {
                      onChange(country.code);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.code ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {country.flag} {country.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
