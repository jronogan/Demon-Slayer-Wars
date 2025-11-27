# Demon Slayer Wars (Turn-based Game)

## Overview

1. Game Information
2. Getting Started - Selection Screen
3. Battle Mechanics
4. Attack Types
5. How to Win/Lose
6. Surrender
7. Planned Future Enhancements

## Game Information

### Game Background

Based off the popular anime 'Demon Slayer - Kimetsu no Yaiba', this game explores a turn-based battle game where you can select a team of 3 to battle an opponent. The objective? Bring all the enemies' hitpoints (HP) down to 0 to win the game!

### Tech Stack

- Javascript
- CSS
- HTML

## Getting Started - Selection Screen

### Starting Screen

![starting screen image](images/ReadMe%20Images/Starting%20Screen.png)

- You will be greeted with this starting screen
- Select 3 characters to be put into your team!
- Characters selected will be shown in the "Selected Team" box and also highlighted in gold.
  ![characters chosen](images/ReadMe%20Images/Selected%20Team.png)

> You **must** choose 3 members. Otherwise, you cannot start the game.

> ![insufficient members image](images/ReadMe%20Images/Insufficient%20Members.png)

> You **cannot** choose more than 3 members. You will not be allowed to start the game.

> ![Exceed Full Team image](images/ReadMe%20Images/Full%20Team.png)

- Once the team you want is fully selected, click **Find Opponent** to start a game!

## Battle Mechanics

- Player who starts is randomly chosen by the computer.

### During your turn

1. Click on a character to reveal your attacks

   > ![Image example of visual seen when clicking character](images/ReadMe%20Images/Attack%20selected.png)

2. Click on the attack you wish to use. It's description appears in the information screen below!

   > ![Attack information](images/ReadMe%20Images/Attack%20information.png)

3. Choose the enemy OR team mate you wish to use the attack on (depending on the attack type).

4. Once the attack effect has been rendered, wait for the enemies' turn before your turn begins again.

5. Continue until one team loses.

## Attack Types

> Single target attacks - tend to be higher in damage
> ![single target attack description](images/ReadMe%20Images/Single%20Target.png)

> Area of Effect (AOE) attacks - lower in damage but targets all enemies
> ![AOE attack description](images/ReadMe%20Images/AOE.png)

> Healing - heals the character or an ally
> ![Healing description](images/ReadMe%20Images/Heal.png)

> Block - allows team to be invulnerable to damage for 1 turn
> ![Blocking description](images/ReadMe%20Images/Block.png)

## How to Win/Lose

### Character death

When a character's HP reaches 0, it is dead an can no longer be targeted for attacks or healing. This will be indicated by a changed icon.

![dead icon](images/ReadMe%20Images/Single%20Dead.png)

The game ends the moment a team's characters all reach HP 0.

![all dead](images/ReadMe%20Images/All%20Dead.png)

## Surrender

If you wish to surrender, click the surrender icon at the bottom left of the screen. You will immediately be declared having lost the game and will be taken back to the selection screen to choose another 3 characters for your next battle.

![surrender icon](images/ReadMe%20Images/Surrender.png)

## Planned Future Enhancements

- A larger roster of characters to be brought into the game
- New attack types to create a more diverse gameplay experience (Eg. Affliction, Damage Reduction, Immediate death etc)
- With a larger roster of characters, some will be locked and will require completed quests to access. (Eg. Complete 5 battles in a row)
- Sound to be added to enhance gameplay experience
