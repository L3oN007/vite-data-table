"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RES_DATA_DAILY = {
  success: true,
  data: {
    publisher_id: 123,
    start_date: "2024-01-01",
    end_date: "2024-01-31",
    currency: "USD",
    earnings: [
      {
        date: "2024-01-01",
        total_earnings: 250.0,
      },
      {
        date: "2024-01-02",
        total_earnings: 275.5,
      },
      {
        date: "2024-01-03",
        total_earnings: 310.25,
      },
      {
        date: "2024-01-04",
        total_earnings: 290.0,
      },
      {
        date: "2024-01-05",
        total_earnings: 320.75,
      },
      {
        date: "2024-01-06",
        total_earnings: 310.5,
      },
      {
        date: "2024-01-07",
        total_earnings: 305.0,
      },
      {
        date: "2024-01-08",
        total_earnings: 330.0,
      },
      {
        date: "2024-01-09",
        total_earnings: 315.25,
      },
      {
        date: "2024-01-10",
        total_earnings: 340.75,
      },
      {
        date: "2024-01-11",
        total_earnings: 350.0,
      },
      {
        date: "2024-01-12",
        total_earnings: 360.5,
      },
      {
        date: "2024-01-13",
        total_earnings: 370.25,
      },
      {
        date: "2024-01-14",
        total_earnings: 345.0,
      },
      {
        date: "2024-01-15",
        total_earnings: 400.0,
      },
      {
        date: "2024-01-16",
        total_earnings: 410.5,
      },
      {
        date: "2024-01-17",
        total_earnings: 390.25,
      },
      {
        date: "2024-01-18",
        total_earnings: 370.0,
      },
      {
        date: "2024-01-19",
        total_earnings: 400.75,
      },
      {
        date: "2024-01-20",
        total_earnings: 420.5,
      },
      {
        date: "2024-01-21",
        total_earnings: 410.0,
      },
      {
        date: "2024-01-22",
        total_earnings: 430.0,
      },
      {
        date: "2024-01-23",
        total_earnings: 450.25,
      },
      {
        date: "2024-01-24",
        total_earnings: 460.75,
      },
      {
        date: "2024-01-25",
        total_earnings: 470.0,
      },
      {
        date: "2024-01-26",
        total_earnings: 490.5,
      },
      {
        date: "2024-01-27",
        total_earnings: 480.25,
      },
      {
        date: "2024-01-28",
        total_earnings: 500.0,
      },
      {
        date: "2024-01-29",
        total_earnings: 515.75,
      },
      {
        date: "2024-01-30",
        total_earnings: 530.0,
      },
      {
        date: "2024-01-31",
        total_earnings: 540.5,
      },
    ],
    total_earnings: 12015.5,
  },
  message: "Earnings report retrieved successfully.",
};

const RES_DATA_MONTHLY = {
  success: true,
  data: {
    publisher_id: 123,
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    currency: "USD",
    earnings: [
      {
        month: "2023-01",
        total_earnings: 5000.0,
      },
      {
        month: "2023-02",
        total_earnings: 5200.0,
      },
      {
        month: "2023-03",
        total_earnings: 5400.0,
      },
      {
        month: "2023-04",
        total_earnings: 5600.0,
      },
      {
        month: "2023-05",
        total_earnings: 5800.0,
      },
      {
        month: "2023-06",
        total_earnings: 6000.0,
      },
      {
        month: "2023-07",
        total_earnings: 6200.0,
      },
      {
        month: "2023-08",
        total_earnings: 6400.0,
      },
      {
        month: "2023-09",
        total_earnings: 6600.0,
      },
      {
        month: "2023-10",
        total_earnings: 6800.0,
      },
      {
        month: "2023-11",
        total_earnings: 7000.0,
      },
      {
        month: "2023-12",
        total_earnings: 7200.0,
      },
    ],
    total_earnings: 72000.0,
  },
  message: "Earnings report retrieved successfully.",
};

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Component() {
  const [reportType, setReportType] = React.useState<"daily" | "monthly">(
    "daily"
  );
  const [chartData, setChartData] = React.useState(
    RES_DATA_DAILY.data.earnings
  );

  // Handle report type change
  React.useEffect(() => {
    if (reportType === "daily") {
      setChartData(RES_DATA_DAILY.data.earnings);
    } else {
      setChartData(
        RES_DATA_MONTHLY.data.earnings.map((item) => ({
          date: item.month,
          total_earnings: item.total_earnings,
        }))
      );
    }
  }, [reportType]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Earnings Chart</CardTitle>
          <CardDescription>View earnings data by day or month.</CardDescription>
        </div>
        <Select
          value={reportType}
          onValueChange={(value) => setReportType(value as "daily" | "monthly")}
        >
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="daily">Daily Report</SelectItem>
            <SelectItem value="monthly">Monthly Report</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return reportType === "daily"
                  ? date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : value; // For monthly, show the raw month value
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return reportType === "daily"
                      ? new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : value; // For monthly, show the raw month value
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total_earnings"
              type="natural"
              fill="url(#fillEarnings)"
              stroke="var(--color-desktop)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
