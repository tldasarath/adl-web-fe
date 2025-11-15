import { blogs } from "@/Datas/blogs";
import { visaDetails } from "@/Datas/visaData";

export function generateStaticParams() {
  return visaDetails.map(item => ({
    id: item.id,
  }));
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
