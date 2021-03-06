# Gym Exercise Tracker

This app lets people that regularly go to the gym track their exercise results in every session, allowing them to review their pervious results, so that with each new session, they can use the results of the previous session as the goal to beat (or match) for the current session. Over time the person going to the gym will be able to see how they have improved. 

### App Usage Walkthrough

During the first week, a gym goer can create a new session, specify the type of session (e.g. legs, chest, back), and record the following:
- each exercise completed within that session (e.g. for a legs session this can inclue leg press, hex bar deadlifts, barbell squats, split squats)
- the number of sets for each exercise (e.g. 3 sets), 
- the weight lifted for each exercise 
- the maximum number of reps achieved within each set for the given exercise.

The next week, the gym user has access to the previous weeks session information (session type, exercises, number of sets, weight lifted, max reps for each exercise). They create a new session (as per the first week), however this time they will have access to the previous session data (weight lifted and max reps), which will be set as the goal for the current session. The aim is to match or beat the results from the previous session, in order to improve.

This continues week after week, and over time the gym goer can see how the weight and maximum reps for each exercise have improved since the first week.

## Minimum Viable Product URL

https://murmuring-thicket-55410.herokuapp.com/

Travis CI Build Status: [![Build Status](https://travis-ci.org/abandisch/gym-tracker-app.svg?branch=master)](https://travis-ci.org/abandisch/gym-tracker-app)

## Stack

* Client: jQuery
* Web Server: Express
* Database: Mongo
* Tests: Mocha, Chai

## User Stories

- As a gym goer, I want to create a training session, so that I can track my exercises for that session
- As a gym goer, I want to add exercises to a training session, so I can track the weight lifted, number of sets completed and my max reps for that exercise
- As a gym goer, I want to see the results of my last training session (if any), so that I can set my goals (max reps and weight increase) for my current training session
- As a gym goer, I want to view all exercises for a training session, so I can see my results (max reps and weight lifted) for each exercise at a glance
- As a gym goer, I want to record my a set (weight and reps) for an exercise
- As a gym goer/app user, I want to remove an exercise from my training session
- As a gym goer/app user, I want to remove a training session (including any recorded exercises under that training session)
- As a gym goer/app user, I want to update a training session details, so that I can fix mistakes
- As a gym goer/app user, I want to update a exercise details, so that I can fix any mistakes

## User Stories for MVP

- As a gym goer, I want to create a training session, so that I can record my exercises for that training session
- As a gym goer, I want to add exercises to a training session, so I can track the weight lifted, number of sets and my max reps
- As a gym goer, I want to see the results of my last training session (if any), so that I can set my goals (max reps and weight increase) for my current training session
- As a gym goer, I want to record my a set (weight and reps) for an exercise

## MVP Feedback

Feedback on the app has been positive - from a usability and design perspective, the app has been well received. The only negative feedback was due to not being able to edit or delete exercises and/or sets, when a typo was accidentally made, which made tracking the rest of the exercise sets difficult. However this functionality was not included in the MVP.  

## MVP App Screenshots - Mobile View

![Gym Tracker App - MVP Screenshot](https://github.com/abandisch/gym-tracker-app/blob/master/resources/gym-tracker-mvp-screenshots.jpg)

## App Screen List

- Screen for login or registration
- Screen for listing all the training sessions
- Screen for adding/editing a training session
- Screen for adding/editing an exercise to a training session (including number of sets, weight lifted and max reps)

## User Flow Diagram

![Gym Tracker App - User Flow](https://github.com/abandisch/gym-tracker-app/blob/master/resources/user-flow.jpg)

## Wireframes

![Gym Tracker App - Start page and second page](https://github.com/abandisch/gym-tracker-app/blob/master/resources/Mobile_View_Page_1_and_2_templates.png)

![Gym Tracker App - Session page](https://github.com/abandisch/gym-tracker-app/blob/master/resources/Mobile_View_Page_3_templates.png)


