import React, {useContext} from 'react';
import BottomTabs from '../BottomTabs';
import {Tab, TabContext} from '../ProfileDrawer';
import Home from './Home';
import Messages from './Messages';
import Notifications from './Notifications';
import Workouts from './Workouts';

export default function Page() {
  const {currentTab} = useContext(TabContext);
  const CurrentTab = () => {
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
      <CurrentTab />
      <BottomTabs />
    </>
  );
}
