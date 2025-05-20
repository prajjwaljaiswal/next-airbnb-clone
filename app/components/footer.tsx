import Link from "next/link"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  AirCover
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Safety information
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Supporting people with disabilities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Cancellation options
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Disaster relief housing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Combating discrimination
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Explore hosting resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Visit our community forum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  How to host responsibly
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Airbnb</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Learn about new features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Letter from our founders
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-sm">© 2023 Airbnb, Inc.</p>
            <div className="hidden md:flex gap-2">
              <span className="text-sm">·</span>
              <Link href="#" className="text-sm hover:underline">
                Privacy
              </Link>
              <span className="text-sm">·</span>
              <Link href="#" className="text-sm hover:underline">
                Terms
              </Link>
              <span className="text-sm">·</span>
              <Link href="#" className="text-sm hover:underline">
                Sitemap
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>English (US)</span>
            </Button>
            <Button variant="ghost" size="sm">
              $ USD
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
