import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Lock, Package } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Track Your Software Portfolio
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Manage your software installations, track versions, and stay organized with our intuitive software tracking platform.
            </p>
            <div className="flex gap-4">
              <Link href="/login">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-12 md:py-24 lg:py-32 bg-muted">
          <div className="mx-auto max-w-[980px]">
            <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-12 text-center">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <Package className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Software Management</h3>
                <p className="text-muted-foreground">
                  Track and manage all your software installations in one place.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <BarChart3 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  Visualize your software portfolio with intuitive charts and graphs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <Lock className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Your data is safely stored and protected with Firebase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join now and start managing your software portfolio effectively.
            </p>
            <Link href="/login">
              <Button size="lg">
                Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}