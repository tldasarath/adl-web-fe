import { licenseDetails } from "@/Datas/licenseDetails";

export function generateStaticParams() {
  return licenseDetails.map(item => ({
    id: item.id,
  }));
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
