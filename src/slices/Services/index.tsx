import { type KeyTextField, type RichTextField } from "@prismicio/client";
import { MonitorIcon } from "@/components/ui/icon/monitor";
import { PenIcon } from "@/components/ui/icon/pen";
import ServiceCard from "@/components/service-card";

type IconType = "monitor" | "pen" | "code" | "design";
type IconColor = "green" | "purple" | "gray";

type ServicesSlicePrimary = {
  section_title: KeyTextField;
};

type ServicesSliceItem = {
  title: KeyTextField;
  description: RichTextField;
  icon_type: IconType | null;
  icon_color: IconColor | null;
};

type ServicesSlice = {
  slice_type: "services";
  primary: ServicesSlicePrimary;
  items: ServicesSliceItem[];
};

const iconMap: Record<IconType, (color: string) => React.ReactNode> = {
  monitor: (color) => <MonitorIcon size={25} className={`stroke-${color}`} />,
  pen: (color) => <PenIcon size={25} className={`stroke-${color}`} />,
  code: (color) => <MonitorIcon size={25} className={`stroke-${color}`} />,
  design: (color) => <PenIcon size={25} className={`stroke-${color}`} />,
};

const iconBgMap: Record<IconColor, "green-flat" | "purple-flat" | "gray"> = {
  green: "green-flat",
  purple: "purple-flat",
  gray: "gray",
};

export default function Services({ slice }: { slice: ServicesSlice }) {
  const { primary, items } = slice;

  return (
    <div className="mt-32" id="Service">
      <h2 className="text-2xl">{primary.section_title || "Service"}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        {items.map((item, index) => {
          const iconType = item.icon_type ?? "monitor";
          const iconColor = item.icon_color ?? "green";
          const renderIcon = iconMap[iconType] ?? iconMap.monitor;
          const descText =
            item.description && item.description.length > 0
              ? (item.description[0] as { text?: string })?.text ?? ""
              : "";

          return (
            <ServiceCard
              key={index}
              iconBg={iconBgMap[iconColor]}
              icon={renderIcon(iconColor)}
              title={item.title ?? ""}
              description={descText}
            />
          );
        })}
      </div>
    </div>
  );
}
