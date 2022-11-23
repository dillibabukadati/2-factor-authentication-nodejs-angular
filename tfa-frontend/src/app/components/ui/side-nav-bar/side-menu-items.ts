import {MenuItem} from "./side-menu-bar/side-bar-menu-model";

export const sideMenu: MenuItem[] = [
  {
    title: 'Home',
    type: "group",
  }, {
    title: 'Dashboard',
    type: "basic",
    icon: `heroicons_outline:home`,
    link: '/'
  }, {
    title: 'Profile',
    type: "basic",
    icon: `heroicons_outline:user`,
    link: 'profile'
  }, {
    title: "",
    type: "divider"
  },
  {
    title: 'Users',
    type: "collapsable",
    icon: `heroicons_outline:users`,
    children: [
      {
        title: 'Add User',
        type: 'basic',
        icon: 'heroicons_outline:user'
      },
      {
        title: 'All Users',
        type: 'basic',
        icon: 'heroicons_outline:users'
      }
    ]
  }, {
    title: 'Dashboard',
    type: "basic",
    icon: `heroicons_outline:home`
  }, {
    title: 'Profile',
    type: "basic",
    icon: `heroicons_outline:user`
  }, {
    title: "",
    type: "divider"
  },
];
