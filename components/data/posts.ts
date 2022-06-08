import {Comment} from '../pages/post/Comments';
import {PostType} from '../pages/post/Post';

const likes = ['ironman', 'nedleeds', 'mjwatson', 'spiderman'];

const comments: Comment[] = [
  {username: 'ironman', timestamp: new Date(), text: 'Nice work kid!'},
  {username: 'nedleeds', timestamp: new Date(), text: 'So awesome!'},
  {
    username: 'mjwatson',
    timestamp: new Date(),
    text: 'cool.cool.cool.cool.cool.cool.cool.cool.cool.cool.cool.cool.cool.cool.cool.cool',
  },
];

export const SpidermanPosts: PostType[] = [
  {
    username: 'spiderman',
    timestamp: new Date('May 16, 2022 5:15:30'),
    caption: 'With great power...',
    photos: [
      'https://arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/ULY2ETUEU4OLRWIR3LD7GHPKYE.jpg',
    ],
    location: 'New York City',
    likes: likes,
    comments: comments,
  },
  {
    username: 'spiderman',
    timestamp: new Date(),
    caption: 'Future MIT scholars',
    photos: ['https://thedirect.s3.amazonaws.com/media/photos/smtrio1.jpg'],
    location: 'Sanctum Sanctorum',
    tags: ['nedleeds', 'mjwatson'],
    likes: likes,
    comments: comments,
  },
  {
    username: 'spiderman',
    timestamp: new Date(),
    caption: 'Final day at the Stark internship!',
    photos: [
      'https://w0.peakpx.com/wallpaper/641/559/HD-wallpaper-peter-and-tony-avengers-iron-man-mcu-peter-parker-robert-downey-jr-spiderman-stark-industries-tom-holland-tony-stark.jpg',
    ],
    tags: ['ironman'],
    likes: likes,
    comments: comments,
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
    likes: likes,
    comments: comments,
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
    likes: likes,
    comments: comments,
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
    likes: likes,
    comments: comments,
  },
];
