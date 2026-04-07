import { Section, SectionHeader } from "@/components/Section";

interface Column {
  key: string;
  label: string;
}

interface FieldReferenceGridProps {
  columns: Column[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "alt";
}

export function FieldReferenceGrid({
  columns,
  title = "Field Reference",
  subtitle,
  variant = "default",
}: FieldReferenceGridProps) {
  return (
    <Section variant={variant}>
      <SectionHeader
        title={title}
        subtitle={
          subtitle ??
          `Complete list of all ${columns.length} data fields available in this dataset`
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex items-center gap-3 rounded-lg border px-4 py-3"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <div
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {col.label}
              </div>
              <div
                className="text-xs"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {col.key}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
