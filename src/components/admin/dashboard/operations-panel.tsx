import { Activity, BarChart3, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ActivityItem, RecentProject, TeamCapacityItem } from "@/data/admin-dashboard";
import { statusVariantMap } from "@/data/admin-dashboard";
import { useI18n } from "@/i18n/locale-provider";

type AdminOperationsPanelProps = {
  recentProjects: RecentProject[];
  activityFeed: ActivityItem[];
  teamCapacity: TeamCapacityItem[];
};

const AdminOperationsPanel = ({
  recentProjects,
  activityFeed,
  teamCapacity,
}: AdminOperationsPanelProps) => {
  const { t } = useI18n();

  return (
    <section className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <Card className="border-border/60 bg-card/72 backdrop-blur-xl">
        <CardHeader>
          <CardDescription className="font-mono text-[10px] uppercase tracking-[0.22em]">
            {t.adminDashboard.operation}
          </CardDescription>
          <CardTitle className="mt-2 flex items-center gap-2 text-xl sm:text-2xl">
            <BarChart3 className="h-5 w-5 text-accent" />
            {t.adminDashboard.recentProjects}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  {t.adminDashboard.tableHeaders.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow key={`${project.client}-${project.project}`}>
                    <TableCell className="font-medium">{project.client}</TableCell>
                    <TableCell>{project.project}</TableCell>
                    <TableCell>{project.owner}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariantMap[project.status]}>{project.status}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {project.priority}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="border-border/60 bg-card/72 backdrop-blur-xl">
          <CardHeader>
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.22em]">
              {t.adminDashboard.activities}
            </CardDescription>
            <CardTitle className="mt-2 flex items-center gap-2 text-xl sm:text-2xl">
              <Activity className="h-5 w-5 text-accent" />
              {t.adminDashboard.internalFeed}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityFeed.map((activity, index) => (
              <div key={activity.title} className="relative pl-6">
                {index !== activityFeed.length - 1 ? (
                  <div className="absolute left-[7px] top-6 h-[calc(100%+12px)] w-px bg-border" />
                ) : null}
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border border-accent/40 bg-background">
                  <div className="m-[5px] h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{activity.description}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/72 backdrop-blur-xl">
          <CardHeader>
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.22em]">
              {t.adminDashboard.capacity}
            </CardDescription>
            <CardTitle className="mt-2 flex items-center gap-2 text-xl sm:text-2xl">
              <Users className="h-5 w-5 text-accent" />
              {t.adminDashboard.teamLoad}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamCapacity.map((member) => (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <span className="font-mono text-xs text-accent">{member.load}%</span>
                </div>
                <Progress value={member.load} className="h-2.5 bg-muted/70" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminOperationsPanel;
