# Hill Climb Racing 2 — Screen Names, Wireframes & Working Flow

> Original concept/specification based on the feature list supplied by the requester. This is not an official Fingersoft design or a reproduction of the original game's screens or assets.

## 1. Game concept

**Working title:** Hill Rivals: Offroad Rush  
**Genre:** Physics-based 2D off-road racing with single-player and online multiplayer modes.

**Core loop:** Choose a vehicle and mode → race or complete a challenge → earn coins, trophies, and rewards → upgrade or customize vehicles → unlock further races and events.

### Main features

- Real-time PvP races, cups, ranked progression, and leaderboards.
- Adventure driving across varied terrain, collecting coins and completing distance goals.
- Vehicle collection, upgrades, tuning, and cosmetic customization.
- Track Editor for building, testing, and sharing community tracks.
- Weekly challenges, live events, teams, and team leaderboards.
- Optional in-app purchases. Clearly disclose any random-item contents and odds before purchase; purchases can be disabled in device settings.

## 2. Screen names and purpose

| # | Screen name | Purpose / key content |
|---|---|---|
| 01 | Splash / Loading | Game identity, loading progress, and connection status. |
| 02 | Welcome & Tutorial | Introduce the controls and guide the player through a first drive. |
| 03 | Home / Garage Hub | Vehicle preview, currencies, profile, and primary mode shortcuts. |
| 04 | Vehicle Select | Browse owned, locked, and unlockable vehicles. |
| 05 | Vehicle Upgrade | Upgrade engine, tires, suspension, grip, and other performance stats. |
| 06 | Vehicle Customize | Change paint, cosmetics, skins, and tuning parts. |
| 07 | Mode Select | Choose Adventure, Cups, Events, Track Editor, or community tracks. |
| 08 | Map / Cup Select | Review terrain, cup progression, entry details, and race rewards. |
| 09 | Matchmaking / Ready | Find opponents, confirm the vehicle, and show the race countdown. |
| 10 | Race HUD | Show the live race, controls, position, distance, coins, and pause action. |
| 11 | Race Results | Show placement, trophies, coins, rewards, and next actions. |
| 12 | Trophy Road / Leaderboard | Show rank, milestones, seasonal progress, and standings. |
| 13 | Events / Weekly Challenges | Browse timed activities, challenge goals, and event rewards. |
| 14 | Team Hub | Show team members, team events, contributions, and rankings. |
| 15 | Track Editor | Build tracks with terrain, ramps, obstacles, and hazards. |
| 16 | Track Test / Publish | Test-drive a track, validate it, and publish or share it. |
| 17 | Rewards / Store | Claim earned rewards and review optional purchases. |
| 18 | Settings & Support | Configure controls, audio, privacy, purchase settings, and support. |

## 3. Low-fidelity wireframes

### 03 — Home / Garage Hub

```text
┌─────────────────────────────────────────┐
│ Profile          Coins       Gems     ⚙ │
├─────────────────────────────────────────┤
│                                         │
│             [Vehicle Preview]           │
│              [Change Vehicle]           │
│                                         │
│   [UPGRADE]    [CUSTOMIZE]    [RACE]     │
├─────────────────────────────────────────┤
│ Adventure  │ Cups │ Events │ Track Edit │
│ Garage     │ Team │ Trophy Road         │
└─────────────────────────────────────────┘
```

### 08 — Map / Cup Select

```text
┌─────────────────────────────────────────┐
│ ← Home              CUP / TRACK         │
├─────────────────────────────────────────┤
│                                         │
│         [Track / Terrain Preview]        │
│              Hills • Desert              │
│                                         │
│ Cup progress:    ○ ── ○ ── ● ── ○       │
│ Rewards:         Coins + Trophies        │
│                                         │
│ Vehicle: [Select]          [RACE]        │
└─────────────────────────────────────────┘
```

### 10 — Race HUD

```text
┌─────────────────────────────────────────┐
│ Position  2 / 4       Distance      ⏸   │
│                                         │
│     Terrain, track, rivals, and coins    │
│                                         │
│                                         │
│ [BRAKE / REVERSE]             [GAS]      │
└─────────────────────────────────────────┘
```

### 05 — Vehicle Upgrade

```text
┌─────────────────────────────────────────┐
│ ← Home                GARAGE             │
├─────────────────────────────────────────┤
│             [Vehicle Preview]            │
│ Vehicle name                 Level / stats│
│                                         │
│ Engine       [Upgrade]       Cost        │
│ Tires        [Upgrade]       Cost        │
│ Suspension   [Upgrade]       Cost        │
│ Grip         [Upgrade]       Cost        │
├─────────────────────────────────────────┤
│ Vehicles      Upgrade      Customize     │
└─────────────────────────────────────────┘
```

### 15 — Track Editor

```text
┌─────────────────────────────────────────┐
│ ← Back          TRACK EDITOR       Save  │
├─────────────────────────────────────────┤
│                                         │
│              Track canvas                │
│      Start ── ramp ── obstacle ── Finish │
│                                         │
├─────────────────────────────────────────┤
│ Terrain │ Ramp │ Bump │ Hazard           │
│ [Undo]             [TEST]     [PUBLISH]   │
└─────────────────────────────────────────┘
```

## 4. Working flow

```text
Launch
  ↓
Splash / Loading
  ↓
Welcome & Tutorial (first-time players)
  ↓
Home / Garage Hub
  ├─ Adventure → Track Select → Drive → Results → Upgrade / Replay
  ├─ Cups → Cup Select → Matchmaking → Race → Results → Trophy Road
  ├─ Garage → Vehicle Select → Upgrade / Customize → Home
  ├─ Events → Challenge → Race → Event Results / Rewards
  ├─ Team → Team Event → Team Results / Leaderboard
  └─ Track Editor → Build → Test → Publish → Community Tracks
```

### Race interaction

1. Player chooses a mode, cup, or challenge.
2. Player selects and confirms a vehicle.
3. Multiplayer races enter matchmaking; other modes start the race directly.
4. During a race, gas and brake/reverse controls affect vehicle movement and balance.
5. On finish or failure, Race Results shows placement, coins, trophies, and earned rewards.
6. Player chooses Replay, Garage/Upgrade, or Home.

## 5. Interactive prototype

The companion [browser prototype](./Hill-Climb-Racing-2-Prototype.html) presents a phone-sized app mockup with selectable screens and clickable flows. It currently includes:

1. Splash / Welcome
2. Home / Garage Hub
3. Mode Select
4. Vehicle Select
5. Vehicle Upgrade
6. Vehicle Customize
7. Map / Cup Select
8. Race HUD
9. Race Results
10. Events / Team
11. Track Editor
12. Settings & Support

The prototype demonstrates vehicle browsing, upgrade costs, paint selection, race controls, results navigation, and adding/removing track pieces. It is a visual interaction concept, not a production game or live multiplayer implementation.

For a rough grayscale Lo-Fi storyboard with all 18 numbered phone-screen wireframes, X-box image placeholders, screen-to-screen arrows, zoom controls, and an enlarged screen preview, open the [Game UI Wireframe board](./Hill-Climb-Racing-2-Game-Wireframe.html).

## 6. Figma implementation notes

- Use the screen names in this document as frame names.
- Keep each screen's primary action visually clear and consistent.
- Treat wireframes as structure only; use original artwork and UI styling.
- Keep purchase flows optional and clearly label costs, contents, and random-item odds.

## 7. 3D-style UI variants

The editable [FigCraft design](./Hill-Rivals-Game-UI.figcraft) includes two additional, vector-built visual explorations:

| # | Screen name | Purpose / key content |
|---|---|---|
| 19 | 3D Garage - Ride Select | A dimensional vehicle showcase with vehicle stats, route selection, and a primary race action. |
| 20 | 3D Race - Live HUD | A layered race scene with position, lap, speed, timer, and brake, boost, and gas controls. |

These are stylized 3D-look UI concepts made from editable design layers; they are not rendered 3D game assets or a playable game build.
