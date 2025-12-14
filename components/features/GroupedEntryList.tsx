import { Entry } from "@/types/entry";
import { EntryCard } from "./EntryCard";
import { formatDateConditionally, formatDateKey, formatRelativeDate, getDateRelation } from "@/lib/utils/date";
import Heading from "../ui/Heading";

interface GroupedEntryListProps {
  entries: Entry[];
  emptyMessage?: string;
}

interface GroupedEntries {
  date: string;
  entries: Entry[];
}

const GroupedEntryListDateHeader = ({ date }: { date: string }) => {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  const dateRelation = getDateRelation(targetDate);
  const showSubDate = dateRelation !== "other";

  const relativeDate = formatRelativeDate(date, dateRelation);
  const dateLabel = showSubDate ? formatDateConditionally(date) : undefined;

  return (
    <div className="flex items-end gap-4 mb-4">
      <Heading level="h3" align="left">
        {relativeDate}
      </Heading>
      {showSubDate && dateLabel && (
        <p className="text-secondary-text text-base font-semibold">
          {dateLabel}
        </p>
      )}
    </div>
  );
}

export const GroupedEntryList = ({
  entries,
  emptyMessage = "エントリーがありません",
}: GroupedEntryListProps) => {

  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const groupedEntries = sortedEntries.reduce<GroupedEntries[]>((groups, entry) => {
    const date = formatDateKey(entry.createdAt);

    const existingGroup = groups.find((g) => g.date === date);

    if (existingGroup) {
      existingGroup.entries.push(entry);
    } else {
      groups.push({ date, entries: [entry] });
    }

    return groups;
  }, []);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-text text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="max-w-xl mx-auto">
        {groupedEntries.map((group) => (
          <div key={group.date} className="pb-8">
            <GroupedEntryListDateHeader date={group.date} />

            <ul className="space-y-4">
              {group.entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};