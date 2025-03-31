import { DEFAULT_PAGES } from "@/utils/types"
import PortfolioPage from "./portfolio-page"

export async function generateStaticParams() {
  return DEFAULT_PAGES.map((page) => ({
    page: page.id
  }))
}

export default function Page() {
  return <PortfolioPage />
}