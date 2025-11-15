import { blogs } from "@/Datas/blogs";

export function generateStaticParams() {
  return blogs.map(item => ({
    id: item.id,
  }));
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
