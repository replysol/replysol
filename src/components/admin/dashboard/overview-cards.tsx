import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OverviewCard } from "@/data/admin-dashboard";

type AdminOverviewCardsProps = {
  cards: OverviewCard[];
};

const AdminOverviewCards = ({ cards }: AdminOverviewCardsProps) => {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="border-border/60 bg-card/70 shadow-[0_18px_50px_hsl(var(--foreground)/0.06)] backdrop-blur-xl"
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription className="font-mono text-[10px] uppercase tracking-[0.22em]">
                {card.title}
              </CardDescription>
              <CardTitle className="mt-3 text-3xl sm:text-4xl">{card.value}</CardTitle>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/70 p-3">
              <card.icon className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default AdminOverviewCards;
