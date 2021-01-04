export default function () {
  return [
    {
      items: [
        {
          title: "Home",
          to: "/home",
          iconName: "home",
          matches: ["home"],
        },
        {
          title: "Log Stream",
          to: "/logs",
          iconName: "insert_comment",
          matches: ["logs"],
        },
        {
          title: "Task",
          to: "/task",
          iconName: "assessment",
          matches: ["task"],
        },
        {
          title: "Flow Design",
          to: "/flow",
          iconName: "device_hub",
          matches: ["flow"],
        },
        {
          title: "Hub",
          to: "/hub",
          iconName: "store",
          matches: ["hub", "package"],
        },
        {
          title: "Settings",
          to: "/settings",
          iconName: "settings",
          matches: ["settings"],
        },
        {
          title: "Help",
          to: "/help",
          iconName: "help",
          matches: ["help"],
        },
      ],
    },
  ];
}
