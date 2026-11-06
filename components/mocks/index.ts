import type { ComponentType } from "react";
import { MockEngage } from "./MockEngage";
import { MockKpi } from "./MockKpi";
import { MockLearning } from "./MockLearning";
import { MockOrgChart } from "./MockOrgChart";
import { MockRecruit } from "./MockRecruit";
import { MockTasks } from "./MockTasks";
import { MockTimesheet } from "./MockTimesheet";

export {
  MockEngage,
  MockKpi,
  MockLearning,
  MockOrgChart,
  MockRecruit,
  MockTasks,
  MockTimesheet,
};

type MockProps = { className?: string };

export const moduleMockById: Record<string, ComponentType<MockProps>> = {
  organization: MockOrgChart,
  recruiting: MockRecruit,
  time: MockTimesheet,
  engagement: MockEngage,
  lms: MockLearning,
  "tasks-docs": MockTasks,
};

export const allMocks: { id: string; title: string; Component: ComponentType<MockProps> }[] =
  [
    { id: "org", title: "MockOrgChart", Component: MockOrgChart },
    { id: "timesheet", title: "MockTimesheet", Component: MockTimesheet },
    { id: "kpi", title: "MockKpi", Component: MockKpi },
    { id: "recruit", title: "MockRecruit", Component: MockRecruit },
    { id: "learning", title: "MockLearning", Component: MockLearning },
    { id: "tasks", title: "MockTasks", Component: MockTasks },
    { id: "engage", title: "MockEngage", Component: MockEngage },
  ];
