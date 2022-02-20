**Group**: #5, MMPP, Tier 1  
**Topic:** Design a game that captures the student experience  
**Bounties:** Best UI/UX design, Most Innovative Idea  
 
## Homework Homies!
Homework Homies is a fun way to add some motivation to your normally mundane studies. Homework Homies generates friendly competition between you and your friends by allowing you to complete tasks and earn points in a shared workspace. Read more about our story below!

## Inspiration
One of the most prominent pain points we heard from our peers during online school was the lack of daily interaction with classmates, resulting in loss of motivation and increasing burnout. We know the feeling they're missing all too well; a friend will mention that they’ve finished the weekly coding assignment, and it gives us a little reminder and motivation boost to finish it ourselves. It is our hope that Homework Homies will serve as a platform to recreate this scenario in a virtual space, promoting healthy working habits.

## What it does
Homework Homies simulates the student experience through an online virtual dashboard. Once signed in through Google, users can set up workspaces and invite their classmates, opening up a platform to collectively list and manage school tasks. Members of the workspace can add to-do items, organizing by subject, deadline, and difficulty. Then, the race to complete tasks is on! Homework Homies rewards users with points for checking items off the to-do list, awarding bonus points for finishing before others, or doing more difficult tasks. If users ever need a reminder of what tasks they should do, a smart check-list is easily accessible that shows items that other users in the workspace have completed, helping users see what might be most important to finish next. Finally, everything comes together on the leaderboard tab where users can view their standings, and see how their progress is measuring up!

But of course, Homework Homies isn’t here to discourage those who are falling behind. Our app also has a built-in weekly standings feature to encourage continual motivation! While the leader board shows overall standings, an email will be sent out every week showcasing the weekly winner! Users can even build up a streak if they manage to be on the top for several weeks in a row, adding to the gamification aspect of our app.

## How we built it
Homework Homies has a REST API backend built with Python and Flask, and a frontend built with Typescript and React. Data is stored in a PostgreSQL database, and auth is implemented using Auth0.

## Challenges we ran into
Developing the frontend was one of the most challenging issues we faced. We used CalgaryHacks as an opportunity for our less-experienced frontend devs to gain some experience, and while it was awesome to learn, it also slowed down progress on this side of the project. But with the help of our veteran frontend dev, we were able to create a UI we're super proud of!

Developing the backend also posed some challenges. Compared to some of the other projects our team has worked on, this had a more complex API. On top of the basic CRUD endpoints we are familiar with making, there were some more nuanced endpoints we needed to handle points. This also posed a challenge when designing our database as the relationships were a lot more complex than we were used to.

Working with group members during the pandemic is also a difficult challenge to work around because it makes it more difficult to communicate clearly and understand each other's ideas especially when compared to working together in person. Being able to communicate clearly and effectively online is an uphill battle but we are pleased with what our group was able to accomplish!

## Accomplishments that we're proud of
Since the frontend posed such a challenge to refine, we are extremely proud of the work and the results that we were able to achieve with it! We are also very proud of our dedication to the design phase of the project. We took our time to find an idea we loved, and design the backend and frontend as a team.  Looking back at previous projects and comparing, it’s amazing how far we’ve come in our development journeys.

## What we learned
Looking back on the entirety of our project, we learned that developing a working application in the span of 24 hours is a rather difficult task to accomplish. We learned that frontend development is extremely difficult and often makes up the majority of the workload on any project. For many people, the perception is that the backend of a project contains all the difficult logic and puzzles but after this project it is clear to us that frontend development is no joke and requires even more effort and attention than backend development due to our inexperience.

## What's next for Homework Homies
In the future we hope to add more customizability and interactions between users on our dashboard with **trophies and a points reward shop**. We also hope to make use of existing productivity monitoring applications such as WakaTime to **track time-spent on a task**, giving users further insight to their performance. Another amazing feature we'd love to add is **workspace forums** to foster collaboration between peers. Lastly, we believe that this model can be **scaled beyond homework** to other productivity management scenarios such as projects and chores.

## FAQ
**How is this a game?**  
While Homework Homies doesn't fit the obvious definition of a game, it uses the alluring aspects of games to make our web-app more effective. Point systems and competition are natural motivators, and we used them to make our solution into a game!  
**Is this only for online learning?**  
No! We believe that Homework Homies will be a great supplement to in-person learning as well. Even when students are having daily interactions again, a collective space to track homework and motivate each other will be valuable.  
**Couldn't this discourage students who are slower at homework?**  
We understand that being at the bottom of the leaderboard week after week could get discouraging. That's why we added our weekly leaderboard feature! Weekly points competitions will motivate students to get back into the swing of things, even if they've been slow to the draw lately.
