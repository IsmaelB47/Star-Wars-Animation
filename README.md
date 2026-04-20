# Star Wars Animation App

## Description
This is a React Native mobile application built using Expo.  
The app fetches data from the Star Wars API and displays lists of Planets, Films, and Starships.

This version improves the user interface by adding animation using React Native Reanimated.

## Features

- Scrollable lists using ScrollView
- Swipe gestures using Swipeable
- Modal popup showing item details
- Navigation between screens (Planets, Films, Ships)
- Animation applied to list items
- Data fetched from API (https://www.swapi.tech)

## Animation Implemented

Animation was added using React Native Reanimated.

Each list item uses:
- SlideInLeft when appearing on screen
- SlideOutRight when removed

This improves the user experience by making transitions smoother and more visually appealing.

## Technologies Used

- React Native
- Expo
- JavaScript
- React Hooks (useState, useEffect)
- React Native Gesture Handler
- React Native Reanimated

## How It Works

1. Open the app
2. Select a category (Planets, Films, Ships)
3. Scroll through the list
4. Swipe any item
5. A modal will appear showing the item name
6. Items animate when displayed

## How to Run

```bash
npm install
npx expo start
