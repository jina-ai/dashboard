export default function () {
  return [{
    title: 'Navigation',
    items: [{
      title: 'Home',
      to: '/home',
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: '',
      matches:['home']
    },
    {
      title: 'Log Stream',
      to: '/logs',
      htmlBefore: '<i class="material-icons">insert_comment</i>',
      htmlAfter: '',
      matches:['logs']
    },
    {
      title: 'Flow Design',
      to: '/flow',
      htmlBefore: '<i class="material-icons">device_hub</i>',
      htmlAfter: '',
      matches:['flow']
    },
    {
      title: 'Hub',
      to: '/hub',
      htmlBefore: '<i class="material-icons">store</i>',
      htmlAfter: '',
      matches:['hub','package']
    },
    {
      title: 'Settings',
      to: '/settings',
      htmlBefore: '<i class="material-icons">settings</i>',
      htmlAfter: '',
      matches:['settings']
    },
    {
      title: 'Help',
      to: '/help',
      htmlBefore: '<i class="material-icons">help</i>',
      htmlAfter: '',
      matches:['help']
    }
    ],
  }];
}
