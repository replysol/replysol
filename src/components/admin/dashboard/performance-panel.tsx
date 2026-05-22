import { ChartColumn, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import type { PerformanceItem, PipelineStage } from "@/data/admin-dashboard";
import { performanceChartConfig } from "@/data/admin-dashboard";
import { useI18n } from "@/i18n/locale-provider";

type AdminPerformancePanelProps = {
  performanceData: PerformanceItem[];
  projectStages: PipelineStage[];
};

const AdminPerformancePanel = ({ performanceData, projectStages }: AdminPerformancePanelProps) => {
  const { t } = useI18n();

  return (
    <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
      <Card className="border-border/60 bg-card/72 backdrop-blur-xl">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardDescription className="font-mono text-[10px] uppercase tracking-[0.22em]">
                {t.adminDashboard.salesFlow}
              </CardDescription>
              <CardTitle className="mt-2 flex items-center gap-2 text-xl sm:text-2xl">
                <ChartColumn className="h-5 w-5 text-accent" />
                {t.adminDashboard.entriesVsDeliveries}
              </CardTitle>
            </div>
            <Badge variant="outline" className="w-fit font-mono uppercase tracking-[0.14em]">
              {t.adminDashboard.mockedData}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={performanceChartConfig} className="h-[260px] w-full sm:h-[320px]">
            <BarChart data={performanceData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="entradas" fill="var(--color-entradas)" radius={10} />
              <Bar dataKey="entregas" fill="var(--color-entregas)" radius={10} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/72 backdrop-blur-xl">
        <CardHeader>
          <CardDescription className="font-mono text-[10px] uppercase tracking-[0.22em]">
            {t.adminDashboard.pipeline}
          </CardDescription>
          <CardTitle className="mt-2 flex items-center gap-2 text-xl sm:text-2xl">
            <LayoutDashboard className="h-5 w-5 text-accent" />
            {t.adminDashboard.processStages}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {projectStages.map((stage) => (
            <div key={stage.stage} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{stage.stage}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {stage.count} {t.adminDashboard.projects}
                  </p>
                </div>
                <span className="font-mono text-xs text-accent">{stage.progress}%</span>
              </div>
              <Progress value={stage.progress} className="h-2.5 bg-muted/70" />
            </div>
          ))}

          <div className="rounded-lg border border-border/60 bg-background/70 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">{t.adminDashboard.healthTitle}</p>
                <p className="text-xs text-muted-foreground">{t.adminDashboard.healthDescription}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminPerformancePanel;
