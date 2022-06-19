import {MessageType} from '../pages/messages/conversation/Message';
import {IronmanPosts} from './posts';

export type MessageDataItem = {
  username: string;
  messages: MessageType[];
};

export const SpidermanMessageData: MessageDataItem[] = [
  {
    username: 'ironman',
    messages: [
      {
        text: "If you're nothing without this suit, then you shouldn't have it, okay? God, I sound like my dad.",
        username: 'ironman',
        timestamp: new Date(),
      },
      {
        text: "I don't have any other clothes.",
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: "Okay, we'll sort that out.",
        username: 'ironman',
        timestamp: new Date(),
      },
      {
        username: 'ironman',
        timestamp: new Date('May 16, 2022 5:15:30'),
        attachment:
          'https://comicattractions.com/wp-content/uploads/2019/04/robert-downey-jr-spider-man-homecoming.jpg',
      },
      {
        post: IronmanPosts[0],
        username: 'ironman',
        timestamp: new Date(),
      },
    ],
  },
  {
    username: 'nedleeds',
    messages: [
      {
        text: 'Do you lay eggs?',
        username: 'nedleeds',
        timestamp: new Date(),
      },
      {
        text: 'What? No!',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: 'Can you spit venom?',
        username: 'nedleeds',
        timestamp: new Date(),
      },
      {
        text: 'No.',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: 'Can you summon an army of spiders?',
        username: 'nedleeds',
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
    username: 'mjwatson',
    messages: [
      {
        text: 'Does any part of you feel relieved about all this?',
        username: 'mjwatson',
        timestamp: new Date(),
      },
      {
        text: 'What do you mean?',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: "Now that everyone knows, you don't really have to hide or lie to people.",
        username: 'mjwatson',
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

export const IronmanMessageData: MessageDataItem[] = [
  {
    username: 'spiderman',
    messages: [
      {
        text: "If you're nothing without this suit, then you shouldn't have it, okay? God, I sound like my dad.",
        username: 'ironman',
        timestamp: new Date(),
      },
      {
        text: "I don't have any other clothes.",
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: "Okay, we'll sort that out.",
        username: 'ironman',
        timestamp: new Date(),
      },
      {
        username: 'ironman',
        timestamp: new Date('May 16, 2022 5:15:30'),
        attachment:
          'https://comicattractions.com/wp-content/uploads/2019/04/robert-downey-jr-spider-man-homecoming.jpg',
      },
    ],
  },
];

export const NedleedsMessageData: MessageDataItem[] = [
  {
    username: 'spiderman',
    messages: [
      {
        text: 'Do you lay eggs?',
        username: 'nedleeds',
        timestamp: new Date(),
      },
      {
        text: 'What? No!',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: 'Can you spit venom?',
        username: 'nedleeds',
        timestamp: new Date(),
      },
      {
        text: 'No.',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: 'Can you summon an army of spiders?',
        username: 'nedleeds',
        timestamp: new Date(),
      },
      {
        text: 'No, Ned.',
        username: 'spiderman',
        timestamp: new Date('May 14, 2022 5:15:30'),
      },
    ],
  },
];

export const MjwatsonMessageData: MessageDataItem[] = [
  {
    username: 'spiderman',
    messages: [
      {
        text: 'Does any part of you feel relieved about all this?',
        username: 'mjwatson',
        timestamp: new Date(),
      },
      {
        text: 'What do you mean?',
        username: 'spiderman',
        timestamp: new Date(),
      },
      {
        text: "Now that everyone knows, you don't really have to hide or lie to people.",
        username: 'mjwatson',
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
