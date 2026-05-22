# Answers

### 1. How to run
See the `README.md` for steps. Dependencies: `npm` (v18+). No external backend required.

### 2. Stack & design choices
I chose **React with Vite** for its fast hot-reloading and modular component structure.
* **Decision 1 (Grid Architecture):** To ensure the grid scales from 3 to 15 habits, I utilized a flexbox-based row architecture where the meta-column (habit name) has a fixed width of 220px, and the day-grid is permitted to grow/shrink. On mobile viewports, I implemented a horizontal-scroll container for the day-grid. This ensures that even with 15+ habits, the interface maintains its structural integrity and remains tappable on small touchscreens.
* **Decision 2 (Week Start):** I chose to start the week on Monday. A habit tracker is a productivity tool; in modern environments, Monday signifies the structural start of the work/academic week. Psychologically, people view Monday as a "reset button." Grouping Saturday and Sunday at the end of the grid visualizes the "weekend" as a cohesive unit, allowing users to easily see if their habits break down or stay consistent during their rest days.

### 3. Responsive & accessibility
* **Behavior:** On a 360px phone, the grid utilizes `overflow-x: auto` to allow the user to scroll through the 7-day week, while the habit names remain pinned to the left, ensuring the primary function is usable on mobile.
* **Accessibility:** I ensured high color contrast (green checkmarks against a dark-mode background) and used `aria-label` tags for the navigation buttons.
* **Skipped:** I knowingly skipped screen-reader-only labels for the individual habit check-boxes, as the layout is heavily visual. I would add `aria-describedby` to provide context for screen readers if I had more time.

### 4. Streak Calculation Defense
I implemented a "strict-continuity" streak calculation. The streak increments by 1 for every consecutive day checked up to and including "today." If a user misses a day, the streak resets to 0. 
* **Defense:** This design prioritizes accountability over comfort. While some apps allow for "grace periods," my tracker treats a missed day as a break in behavioral consistency. This forces the user to confront their "lapse" immediately, which is a core tenet of effective behavioral modification. By displaying this prominently, I provide an immediate, honest view of progress, preventing the "streak inflation" trap.

### 5. AI usage
* **Tools:** Gemini for logic debugging and UI refactoring.
* **Example:** The AI initially provided a static, hardcoded array for the week display. I changed the logic to a **dynamic `getWeekDays` function** that accepts an `offset` argument. I then refactored the provided `HabitRow` to map over this dynamic array instead of a static one, enabling the user to navigate through time rather than being stuck on the current week.

### 6. Honest gap
The current search/filter functionality is non-existent. If I had another day, I would add a search input at the top to filter habits by name, preventing the UI from becoming unmanageable for users who track more than 15 habits simultaneously.
