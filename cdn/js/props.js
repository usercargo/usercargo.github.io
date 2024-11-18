//import {AlignText} from './constants.js';

const props = [

  {
    name: 'Workout',
    radius: 0.84,
    itemLabelRadius: 0.93,
    itemLabelRadiusMax: 0.35,
    itemLabelRotation: 180,
    itemLabelAlign: AlignText.left,
    itemLabelColors: ['#fff'],
    itemLabelBaselineOffset: -0.07,
    itemLabelFont: 'Amatic SC',
    itemLabelFontSizeMax: 55,
    itemBackgroundColors: ['#ffc93c', '#66bfbf', '#a2d5f2', '#515070', '#43658b', '#ed6663', '#d54062' ],
    rotationSpeedMax: 500,
    rotationResistance: -100,
    lineWidth: 1,
    lineColor: '#fff',
    image: './cdn/img/wheel/example-0-image.svg',
    overlayImage: './cdn/img/wheel/example-0-overlay.svg',
    items: [
      {
        label: 'TWISTS',
      },
      {
        label: 'PRESS UPS',
      },
      {
        label: 'JOGGING',
      },
      {
        label: 'SQUATS',
      },
      {
        label: 'PLANKS',
      },
      {
        label: 'LUNGES',
      },
      {
        label: 'BURPIES',
      },
      {
        label: 'CRUNCHES',
      },
      {
        label: 'MOUNT. CLIMB',
      },
      {
        label: 'STAR JUMPS',
      },
      {
        label: 'KANGAROOS',
      },
      {
        label: 'ROPE CLIMB',
      },
      {
        label: 'KICK BOXING',
      },
      {
        label: 'WALL SIT',
      },
    ],

  },

  {
    name: 'Takeaway',
    radius: 0.89,
    pointerAngle: 90,
    itemLabelRadius: 0.92,
    itemLabelRadiusMax: 0.37,
    itemLabelRotation: 0,
    itemLabelAlign: AlignText.right,
    itemLabelColors: ['#000'],
    itemLabelBaselineOffset: -0.06,
    itemLabelFont: 'Rubik',
    itemBackgroundColors: ['#fbf8c4', '#e4f1aa', '#c0d26e', '#ff7d7d'],
    rotationSpeedMax: 700,
    rotationResistance: -110,
    lineWidth: 0,
    overlayImage: './cdn/img/wheel/example-1-overlay.svg',
    borderWidth: 0,
    items: [
      {
        label: 'Japanese',
      },
      {
        label: 'Fish N Chips',
      },
      {
        label: 'Sandwich',
      },
      {
        label: 'Sub Sandwich',
        weight: 1.3,
      },
      {
        label: 'Tacos / Mexican',
      },
      {
        label: 'Noodle Box',
      },
      {
        label: 'BBQ Chicken',
      },
      {
        label: 'Fried Chicken',
        weight: 1.3,
      },
      {
        label: 'Indian',
      },
      {
        label: 'Thai',
      },
      {
        label: 'Juice Smoothie',
      },
      {
        label: 'Burgers',
        weight: 1.3,
      },
      {
        label: 'Souvlaki / Kebab',
      },
      {
        label: 'Italian',
      },
      {
        label: 'Sushi',
      },
      {
        label: 'Subways',
        weight: 1.3,
      },
      {
        label: 'Pie / Bakery',
      },
      {
        label: 'Chinese',
      },
      {
        label: 'Korean',
      },
      {
        label: 'Pizza',
        weight: 1.3,
      },
    ],
  },

  {
    name: 'Movies',
    radius: 0.88,
    itemLabelRadius: 0.92,
    itemLabelRadiusMax: 0.4,
    itemLabelRotation: 0,
    itemLabelAlign: AlignText.right,
    itemLabelBaselineOffset: -0.13,
    itemLabelFont: 'Pragati Narrow',
    itemBackgroundColors: ['#c7160c', '#fff'],
    itemLabelColors: ['#fff', '#000'],
    rotationSpeedMax: 2000,
    rotationResistance: -70,
    lineWidth: 0,
    image: './cdn/img/wheel/example-0-image.svg',
    overlayImage: './cdn/img/wheel/example-2-overlay.svg',
    items: [
      {
        label: 'Action',value:1000
      },
      {
        label: 'Horror',value:2000
      },
      {
        label: 'Science Fict.',value:3000
      },
      {
        label: 'Comedy',value:4000
      },
      {
        label: 'Romance',value:5000
      },
      {
        label: 'Thriller',value:6000
      },
      {
        label: 'Western',value:7000
      },
      {
        label: 'Indie',value:8000
      },
      {
        label: 'Crime',value:9000
      },
      {
        label: 'Documentary',value:10000
      },
      {
        label: 'Drama',value:11000
      },
      {
        label: 'Musical',value:12000
      },
      {
        label: 'Mystery',value:13000
      },
      {
        label: 'War',value:14000
      },
      {
        label: 'Sports',value:15000
      },
      {
        label: 'Fantasy',value:16000
      },
    ],
  },

  {
    name: 'Money',
    radius: 0.88,
    itemLabelRadius: 0.93,
    itemLabelRotation: 180,
    itemLabelAlign: AlignText.left,
    itemLabelColors: ['#000'],
    itemLabelBaselineOffset: -0.06,
    itemLabelFont: 'Arial',
    itemLabelFontSizeMax: 22,
    lineWidth: 1,
    lineColor: '#000',
    overlayImage: './cdn/img/wheel/example-3-overlay.svg',
    items: [
      {
        label: '$ 50',
      },
      {
        label: '$ 200',
      },
      {
        label: '$ 1000',
        weight: 0.6,
        backgroundColor: '#f23925',
        labelColor: '#fff',
      },
      {
        label: '$ 100',
      },
      {
        label: '$ 200',
      },
      {
        label: '$ 500',
        weight: 0.8,
        backgroundColor: '#b1ddff',
      },
      {
        label: '$ 100',
      },
      {
        label: '$ 50',
      },
      {
        label: '$ 5000',
        weight: 0.4,
        backgroundColor: '#000',
        labelColor: '#fff',
      },
      {
        label: '$ 50',
      },
      {
        label: '$ 200',
      },
      {
        label: '$ 500',
        weight: 0.8,
        backgroundColor: '#b1ddff',
      },
      {
        label: '$ 100',
      },
      {
        label: '$ 200',
      },
      {
        label: '$ 1000',
        weight: 0.6,
        backgroundColor: '#f23925',
        labelColor: '#fff',
      },
      {
        label: '$ 100',
      },
      {
        label: '$ 50',
      },
      {
        label: '$ 500',
        weight: 0.8,
        backgroundColor: '#b1ddff',
      },
    ],
  },

  {
    name: 'King of Nerds',
    itemLabelRadius: 0.92,
    itemLabelRadiusMax: 0.3,
    itemLabelColors: ['hsl(0, 0%, 20%)'],
    itemLabelFont: 'Gloria Hallelujah',
    itemLabelBaselineOffset: -0.2,
    rotationSpeedMax: 400,
    rotationResistance: -100,
    image: './cdn/img/wheel/example-4-image.svg',
    lineWidth: 0,
    items: [
      {
        label: 'SHELDON',
        weight: 2.9,
      },
      {
        label: 'PENNY',
      },
      {
        label: 'LEONARD',
      },
      {
        label: 'HOWARD',
      },
      {
        label: 'BERNADETTE',
      },
      {
        label: 'RAJ',
      },
      {
        label: 'AMY',
      },
    ],
  },

  {
    name: 'Rock Paper Scissors',
    itemBackgroundColors: ['hsl(310, 100%, 95%)'],
    lineColor: 'hsl(350, 20%, 40%)',
    lineWidth: 2,
    borderColor: 'hsl(350, 20%, 40%)',
    borderWidth: 4,
    items: [
      {
        image: './cdn/img/wheel/example-5-item-0.svg',
        imageRadius: 0.6,
        imageScale: 1.2,
      },
      {
        image: './cdn/img/wheel/example-5-item-1.svg',
        imageRadius: 0.6,
        imageScale: 1.2,
      },
      {
        image: './cdn/img/wheel/example-5-item-2.svg',
        imageRadius: 0.6,
        imageScale: 1.2,
      },
      {
        image: './cdn/img/wheel/example-5-item-3.svg',
        imageRadius: 0.6,
        imageScale: 1.2,
      },
      {
        image: './cdn/img/wheel/example-5-item-4.svg',
        imageRadius: 0.6,
        imageScale: 1.2,
      },
    ],
  },

  {
    name: 'Basic',
    items: [
      {
        label: 'one',
      },
      {
        label: 'two',
      },
      {
        label: 'three',
      },
    ],
  },

];