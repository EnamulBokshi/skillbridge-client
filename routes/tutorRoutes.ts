import { Bot, SquareTerminal } from "lucide-react";

export const tutorRoutes = [
    {
      title: "Blogs",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Write Blog",
          url: "/dashboard/write-blog",
        },
        {
          title: "View Blogs",
          url: "/dashboard/view-blogs",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
]