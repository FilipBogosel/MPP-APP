import {
  BarChart3,
  Car,
  Columns2,
  Database,
  TrendingUp,
  User,
  Wrench,
} from "lucide-react";

export const brandCharacters = "MaintenanceRecord".split("");

export const navItems = [
  { to: "/dashboard/records", label: "Maintenance Records", icon: Wrench },
  { to: "/dashboard/overview", label: "Overview", icon: Columns2 },
  { to: "/dashboard/garage", label: "My Garage", icon: Car },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/lifecycle-forecaster", label: "Forecaster", icon: TrendingUp },
  { to: "/import", label: "Import Data", icon: Database },
  { to: "/dashboard/settings", label: "Settings", icon: User },
];
