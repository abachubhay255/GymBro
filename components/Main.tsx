import React from 'react';
import {Tab} from '../App';
import NavBar from './NavBar';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Workouts from './pages/Workouts';

type Props = {
  currentTab: Tab;
};

export default function Main({currentTab}: Props) {
  const Page = () => {
    switch (currentTab) {
      case 'Workouts':
        return <Workouts />;
      case 'Notifications':
        return <Notifications />;
      case 'Messages':
        return <Messages />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <NavBar />
      <Page />
    </>
  );
}
