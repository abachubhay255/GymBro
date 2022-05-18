import {MessageType} from './conversation/Message';

export type MessageDataItem = {
  username: string;
  messages: MessageType[];
};

export const MessageData: MessageDataItem[] = [
  {
    username: 'Tony Stark',
    messages: [
      {
        text: "If you're nothing without this suit, then you shouldn't have it, okay? God, I sound like my dad.",
        username: 'Tony Stark',
        timestamp: new Date(),
      },
      {
        text: "I don't have any other clothes.",
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: "Okay, we'll sort that out.",
        username: 'Tony Stark',
        timestamp: new Date(),
      },
      {
        username: 'Tony Stark',
        timestamp: new Date('May 16, 2022 5:15:30'),
        attachment:
          'https://comicattractions.com/wp-content/uploads/2019/04/robert-downey-jr-spider-man-homecoming.jpg',
      },
    ],
  },
  {
    username: 'Ned Leeds',
    messages: [
      {
        text: 'Do you lay eggs?',
        username: 'Ned Leeds',
        timestamp: new Date(),
      },
      {
        text: 'What? No!',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: 'Can you spit venom?',
        username: 'Ned Leeds',
        timestamp: new Date(),
      },
      {
        text: 'No.',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: 'Can you summon an army of spiders?',
        username: 'Ned Leeds',
        timestamp: new Date(),
      },
      {
        text: 'No, Ned.',
        username: 'spiderman',
        timestamp: new Date('May 14, 2022 5:15:30'),
      },
    ],
  },
  {
    username: 'MJ Watson',
    messages: [
      {
        text: 'Does any part of you feel relieved about all this?',
        username: 'MJ Watson',
        timestamp: new Date(),
      },
      {
        text: 'What do you mean?',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: "Now that everyone knows, you don't really have to hide or lie to people.",
        username: 'MJ Watson',
        timestamp: new Date(),
      },
      {
        text: "For the record, I never wanted to lie to you. But how can you tell someone that you're Spider-Man?",
        username: 'spiderman',
        timestamp: new Date('August 19, 1975 23:15:30'),
      },
    ],
  },
];

export const ProfilePics = new Map([
  ['Tony Stark', 'https://i.ytimg.com/vi/Ddk9ci6geSs/maxresdefault.jpg'],
  [
    'Ned Leeds',
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/04/Jacob-Batalon-as-Ned-Leeds-in-NWH.jpg',
  ],
  [
    'MJ Watson',
    'https://upload.wikimedia.org/wikipedia/en/0/0a/Zendaya_as_MJ.jpeg',
  ],
]);
