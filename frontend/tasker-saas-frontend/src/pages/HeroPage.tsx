"use client"

import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function HeroPage() {
  const router = useNavigate()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl space-y-8 bg-white rounded-2xl p-10 shadow-xl text-gray-900">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Welcome to <span className="text-blue-600">MicroTeams</span>
        </h1>

        <p className="text-lg text-gray-700">
          Simple, fast, and reliable. Sign up or log in to get started.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-100 hover:border-blue-700"
            onClick={() => router("/login")}
          >
            Login
          </Button>
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router("/signup")}
          >
            Signup
          </Button>
        </div>
      </div>
    </main>
  )
}
