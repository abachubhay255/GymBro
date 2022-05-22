import {
  IronmanMessageData,
  MessageDataItem,
  MjwatsonMessageData,
  NedleedsMessageData,
  SpidermanMessageData,
} from './messages';

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  data: UserDataType;
};

export type UserDataType = {
  profilePic: string;
  messages: MessageDataItem[];
  followers: number;
  following: number;
};

export const Users: UserType[] = [
  {
    firstName: 'Peter',
    lastName: 'Parker',
    email: 'spiderman@gmail.com',
    username: 'spiderman',
    password: 'spiderman',
    data: {
      profilePic:
        'https://arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/ULY2ETUEU4OLRWIR3LD7GHPKYE.jpg',
      messages: SpidermanMessageData,
      followers: 66200000,
      following: 291,
    },
  },
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'ironman@gmail.com',
    username: 'ironman',
    password: 'ironman',
    data: {
      profilePic: 'https://i.ytimg.com/vi/Ddk9ci6geSs/maxresdefault.jpg',
      messages: IronmanMessageData,
      followers: 52700000,
      following: 5,
    },
  },
  {
    firstName: 'Ned',
    lastName: 'Leeds',
    email: 'nedleeds@gmail.com',
    username: 'nedleeds',
    password: 'nedleeds',
    data: {
      profilePic:
        'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/04/Jacob-Batalon-as-Ned-Leeds-in-NWH.jpg',
      messages: NedleedsMessageData,
      followers: 2300000,
      following: 210,
    },
  },
  {
    firstName: 'MJ',
    lastName: 'Watson',
    email: 'mjwatson@gmail.com',
    username: 'mjwatson',
    password: 'mjwatson',
    data: {
      profilePic:
        'https://upload.wikimedia.org/wikipedia/en/0/0a/Zendaya_as_MJ.jpeg',
      messages: MjwatsonMessageData,
      followers: 141000000,
      following: 1736,
    },
  },
];
