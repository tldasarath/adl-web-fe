import { blogs } from "@/Datas/blogs";
import { freezoneDetails } from "@/Datas/freezoneDetails";

export function generateStaticParams() {
  return freezoneDetails.map(item => ({
    id: item.id,
  }));
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
