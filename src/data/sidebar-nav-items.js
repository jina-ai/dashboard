export default function () {
  return [{
    title: 'Navigation',
    items: [{
      title: 'Home',
      to: '/home',
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: '',
    },
    {
      title: 'Logs',
      to: '/logs',
      htmlBefore: '<i class="material-icons">insert_comment</i>',
      htmlAfter: '',
    },
    {
      title: 'Flow',
      to: '/flow',
      htmlBefore: '<i class="material-icons">device_hub</i>',
      htmlAfter: '',
    },
    {
      title: 'Hub',
      to: '/hub',
      htmlBefore: '<i class="material-icons">store</i>',
      htmlAfter: '',
    },
    {
      title: 'Settings',
      to: '/settings',
      htmlBefore: '<i class="material-icons">settings</i>',
      htmlAfter: '',
    },
    {
      title: 'Help',
      to: '/help',
      htmlBefore: '<i class="material-icons">help</i>',
      htmlAfter: '',
    }
    ],
  }];
}
