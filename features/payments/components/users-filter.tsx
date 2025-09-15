import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useUsersQuery } from "@/hooks/api/use-get-users-query";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import * as React from "react";

interface UsersFilterProps {
  selectedUserIds: string[];
  onChange: (ids: string[]) => void;
}

export function UsersFilter({ selectedUserIds, onChange }: UsersFilterProps) {
  const { data: usersResp } = useUsersQuery({ page: 1 });
  const userOptions = React.useMemo(() => usersResp?.data ?? [], [usersResp]);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Users
            {selectedUserIds?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedUserIds.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedUserIds.length > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedUserIds.length} selected
                    </Badge>
                  ) : (
                    userOptions
                      .filter((u) => selectedUserIds.includes(u.id))
                      .map((u) => (
                        <Badge
                          variant="secondary"
                          key={u.id}
                          className="rounded-sm px-1 font-normal"
                        >
                          {u.name || u.email}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Filter users..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {userOptions.map((u) => {
                  const isSelected = selectedUserIds.includes(u.id);
                  return (
                    <CommandItem
                      key={u.id}
                      onSelect={() => {
                        const next = selectedUserIds.includes(u.id)
                          ? selectedUserIds.filter((id) => id !== u.id)
                          : [...selectedUserIds, u.id];
                        onChange(next);
                      }}
                    >
                      <div
                        className={cn(
                          "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      <span>{u.name || u.email}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedUserIds.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => onChange([])}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UsersFilter;
