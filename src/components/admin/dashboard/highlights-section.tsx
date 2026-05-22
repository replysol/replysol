import { Card, CardContent } from "@/components/ui/card";
import type { HighlightItem } from "@/data/admin-dashboard";

type AdminHighlightsSectionProps = {
  highlightItems: HighlightItem[];
};

const AdminHighlightsSection = ({ highlightItems }: AdminHighlightsSectionProps) => {
  return (
    <section className="mt-8 grid gap-4 pb-6 md:grid-cols-3">
      {highlightItems.map((item) => (
        <Card key={item.title} className="border-border/60 bg-card/70 backdrop-blur-xl">
          <CardContent className="flex items-start gap-4 p-6">
            <item.icon className="mt-1 h-5 w-5 text-accent" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default AdminHighlightsSection;
