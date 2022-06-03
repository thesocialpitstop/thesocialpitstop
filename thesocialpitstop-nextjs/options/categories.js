const categories = [
  {
    name: "Community Services",
    value: "community-services",
    icon: "/icons/logo.png"
  },
  {
    name: "Education & Training",
    value: "education-training",
    icon: "/icons/edu.png"
  },
  {
    name: "Environment",
    value: "environment",
    icon: "/icons/sustainability.png"
  },
  {
    name: "Events Management",
    value: "events-management",
    icon: "/icons/events.png"
  },
  {
    name: "Food & Beverage",
    value: "food-beverage",
    icon: "/icons/fnb.png"
  },
  {
    name: "Health & Wellness",
    value: "health-wellness",
    icon: "/icons/logo.png"
  },
  {
    name: "Professional Services",
    value: "professional-services",
    icon: "/icons/logo.png"
  },
  {
    name: "Retail & Fashion",
    value: "retail-fashion",
    icon: "/icons/retail.png"
  },
  {
    name: "Volunteer Projects",
    value: "volunteer-projects",
    icon: "/icons/volunteer.png"
  },
]

categories.sort((a,b)=> (a.name > b.name ? 1 : -1))

export default categories;