This file describes the purpose, architecture and preferred code style for this project.

## Purpose

This project is a tool to process data and create 2D animations with a focus
on flowcharts and infographics. 

./frontend contains the frontend react code.
./server contains the backend node.js code.
./motion-canvas contains the motion-canvas which is the 2d animation library.

## Architecture
frontend/plugins/animation/Frontend.tsx is the entry point for the frontend.
It implements a router to switch between the different tools called modes.
Each mode has its own layout and logic.
A layout always consists of a configuration section and a main section.
The configuration section contains the UI for the configuration of the layout.
The main section can contain anything related to the mode.

The frontend can communicate with the backend through a REST API.
All endpoints are defined in:
./server/endpoints/

The styling is done with scss.
The scss files are stored in:
./frontend/scss/


## Preferred Code Style

Components that are NOT located in the common folder are preferred to not take props.
They generally are not implemented as reusable components and are only used in one place.
The main purpose of its patterns is to improve readability and maintainability of the code.

Custom hooks are preferred to not take arguments as well.

State variables are preferred to be defined in the context:
./frontend/plugins/animation/state/animationState.ts
They are generally included in the usePersistence hook:
./frontend/plugins/animation/state/usePersistence.ts
the corresponding type is defined in:
./types/AnimationContextType.ts

It is very much preferred to have small files. Preferrably keeping it under 100 lines of code.
If data is processed in a function through multiple distinct steps, each step is put
into a separate function, with a descriptive name.
Side effects are to be avoided if possible.

Functions are always stored in a separate file with the name of the function.

A custom hook should at max return one value.

Logic within a react component like event handlers should be moved to separate custom hooks.
The focus should be on reducing the number of lines for each code.
