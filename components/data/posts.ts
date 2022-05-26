import {PostType} from '../pages/home/Post';

export const SpidermanPosts: PostType[] = [
  {
    username: 'spiderman',
    timestamp: new Date(),
    caption: 'With great power...',
    photos: [
      'https://arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/ULY2ETUEU4OLRWIR3LD7GHPKYE.jpg',
    ],
    location: 'New York City',
    likes: 5,
    comments: 5,
  },
  {
    username: 'spiderman',
    timestamp: new Date(),
    caption: 'Future MIT scholars',
    photos: ['https://thedirect.s3.amazonaws.com/media/photos/smtrio1.jpg'],
    location: 'Sanctum Sanctorum',
    tags: ['nedleeds', 'mjwatson'],
    likes: 1000,
    comments: 1000,
  },
  {
    username: 'spiderman',
    timestamp: new Date(),
    caption: 'Final day at the Stark internship!',
    photos: [
      'https://w0.peakpx.com/wallpaper/641/559/HD-wallpaper-peter-and-tony-avengers-iron-man-mcu-peter-parker-robert-downey-jr-spiderman-stark-industries-tom-holland-tony-stark.jpg',
    ],
    tags: ['ironman'],
    likes: 12345,
    comments: 12345,
  },
];

export const IronmanPosts: PostType[] = [
  {
    username: 'ironman',
    timestamp: new Date(),
    caption: 'Smart kid.',
    photos: [
      'https://www.themarysue.com/wp-content/uploads/2019/06/The-Spider-Man-Far-from-Home-Cast-Answers-Important-Questions-1200x799.jpg',
    ],
    location: 'Avengers Campus',
    tags: ['spiderman'],
    likes: 654321,
    comments: 654321,
  },
];

export const NedleedsPosts: PostType[] = [
  {
    username: 'nedleeds',
    timestamp: new Date(),
    caption: 'Guy in the chair.',
    photos: [
      'https://www.looper.com/img/gallery/the-ned-line-in-spider-man-no-way-home-with-more-meaning-than-you-think/ned-insists-he-wont-become-a-villain-1639844509.jpg',
    ],
    location: 'New York City',
    likes: 1234567,
    comments: 1234567,
  },
];

export const MjwatsonPosts: PostType[] = [
  {
    username: 'mjwatson',
    timestamp: new Date(),
    caption: 'Drawings in distress',
    photos: [
      'https://static.wikia.nocookie.net/disney/images/8/8c/Michelle_closeup.jpg/revision/latest?cb=20191226173442',
    ],
    location: 'Midtown High',
    likes: 12345678,
    comments: 12345678,
  },
];
