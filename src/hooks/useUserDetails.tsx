"use client"

import { useState, useEffect } from "react"
import type { UserDetails } from "@/components/user-details-form"
import { defaultUserDetailsData } from "@/utils/defaultUserDetailsData"

export function useUserDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails>(defaultUserDetailsData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedUserDetails = localStorage.getItem("userDetails")
      if (savedUserDetails) {
        const parsedDetails = JSON.parse(savedUserDetails)
        setUserDetails(parsedDetails)
      }
    } catch (error) {
      console.error("Error loading user details:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateUserDetails = (details: UserDetails) => {
    setUserDetails(details)
    try {
      localStorage.setItem("userDetails", JSON.stringify(details))
    } catch (error) {
      console.error("Error saving user details:", error)
    }
  }

  return {
    userDetails,
    setUserDetails: updateUserDetails,
    isLoading,
  }
}

