"use client"

import type React from "react"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingComponent() {
  const [loading, setLoading] = useState<boolean>(false)

  const loadRazorpay = () => {
    setLoading(true)

    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true

    script.onload = () => {
      setLoading(false)
      openRazorpayCheckout()
    }

    script.onerror = () => {
      setLoading(false)
      alert("Failed to load Razorpay. Please try again.")
    }

    document.body.appendChild(script)
  }

  const openRazorpayCheckout = () => {
    // Replace with your actual Razorpay key ID
    const options = {
      key: "rzp_test_8bbU8imhUSuSsR", // Enter your test key here
      amount: "29900", // Amount in paise (₹299)
      currency: "INR",
      name: "Your Company",
      description: "Premium Plan Subscription",
      image: "/placeholder.svg?height=60&width=60",
      handler: (response: any) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`)
        // Here you would typically call your backend to verify and record the payment
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#4338ca", // Indigo-700
      },
    }

    // @ts-ignore - Razorpay is loaded via script
    const razorpayInstance = new window.Razorpay(options)
    razorpayInstance.open()
  }

  return (
    <div id="pricing" className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your needs. Upgrade anytime to unlock premium features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Freemium Plan */}
        <Card className="border-2 border-indigo-100 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-indigo-700">Freemium</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₹0</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              <FeatureItem included>Basic access to platform</FeatureItem>
              <FeatureItem included>Limited storage (500MB)</FeatureItem>
              <FeatureItem included>Community support</FeatureItem>
              <FeatureItem included>Standard analytics</FeatureItem>
              <FeatureItem>Advanced features</FeatureItem>
              <FeatureItem>Priority support</FeatureItem>
              <FeatureItem>Custom integrations</FeatureItem>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Get Started</Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="border-2 border-indigo-500 shadow-lg relative">
          <Badge className="absolute -top-3 right-4 bg-indigo-600">RECOMMENDED</Badge>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-indigo-700">Premium</CardTitle>
            <CardDescription>For professionals and teams</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₹299</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              <FeatureItem included>Full access to platform</FeatureItem>
              <FeatureItem included>Unlimited storage</FeatureItem>
              <FeatureItem included>Priority support</FeatureItem>
              <FeatureItem included>Advanced analytics</FeatureItem>
              <FeatureItem included>Advanced features</FeatureItem>
              <FeatureItem included>24/7 dedicated support</FeatureItem>
              <FeatureItem included>Custom integrations</FeatureItem>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={loadRazorpay}
              disabled={loading}
            >
              {loading ? "Loading..." : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center mt-10 text-gray-600 text-sm">
        <p>All plans include a 14-day money-back guarantee. No questions asked.</p>
        <p className="mt-2">
          Need a custom plan?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Contact us
          </a>{" "}
          for enterprise pricing.
        </p>
      </div>
    </div>
  )
}

function FeatureItem({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
  return (
    <li className="flex items-center">
      {included ? (
        <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
      )}
      <span className={included ? "text-gray-700" : "text-gray-400"}>{children}</span>
    </li>
  )
}

