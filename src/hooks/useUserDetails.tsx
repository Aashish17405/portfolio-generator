"use client";

import { useState, useEffect } from "react";
import { defaultUserDetailsData } from "@/utils/defaultUserDetailsData";
import { UserDetails } from "@/components/user-details-form";

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>(defaultUserDetailsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side after mount
    if (typeof window !== "undefined") {
      const savedDetails = localStorage.getItem("userDetails");
      
      if (savedDetails) {
        try {
          const parsedDetails = JSON.parse(savedDetails) as UserDetails;
          
          // Validate and sanitize the loaded data
          const validatedDetails: UserDetails = {
            ...defaultUserDetailsData,
            ...parsedDetails,
            profileImage: isValidImageData(parsedDetails.profileImage) 
              ? parsedDetails.profileImage 
              : defaultUserDetailsData.profileImage,
            backgroundImage: isValidImageData(parsedDetails.backgroundImage)
              ? parsedDetails.backgroundImage
              : defaultUserDetailsData.backgroundImage,
            projects: parsedDetails.projects?.map(project => ({
              ...project,
              image: isValidImageData(project.image) 
                ? project.image 
                : ""
            })) ?? defaultUserDetailsData.projects
          };

          setUserDetails(validatedDetails);
        } catch (error) {
          console.error("Failed to parse user details:", error);
          // Fall back to defaults if parsing fails
          setUserDetails(defaultUserDetailsData);
        }
      }
      setIsLoading(false);
    }
  }, []);

  // Helper function to validate image data
  const isValidImageData = (image?: string) => {
    return image && image.startsWith("data:image/");
  };

  // Save to localStorage whenever userDetails changes
  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      try {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } catch (error) {
        console.error("Failed to save user details:", error);
      }
    }
  }, [userDetails, isLoading]);

  return {
    userDetails,
    setUserDetails,
    isLoading
  };
};