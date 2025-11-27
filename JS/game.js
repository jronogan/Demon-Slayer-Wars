// Query Selectors
const charSelect = document.querySelector(".character-selection");
const charSelectButtons = document.querySelector(".character-buttons");
const selectedTeam = document.querySelector(".selected-team");
const warningScreen = document.querySelector(".warning");
const startButton = document.querySelector(".start-game");
const enemyWords = document.querySelector(".enemy-words");
const enemyTeam = document.querySelector(".enemy-team");
const playerWords = document.querySelector(".player-words");
const playerTeam = document.querySelector(".player-team");
const attackWords = document.querySelector(".attack-words");
const attackScreen = document.querySelector(".attack-screen");
const infoScreen = document.querySelector(".info-screen");
const gameContainer = document.querySelector(".game-container");
const surrenderButton = document.querySelector(".surrender");
const enemyHealthBar = document.querySelector(".enemy-healthbar");
const enemyHealthPoints = document.querySelector(".enemy-healthpoints");
const playerHealthBar = document.querySelector(".player-healthbar");
const playerHealthPoints = document.querySelector(".player-healthpoints");

// Variables
let teamLineup = [];
let enemyLineup = [];
let whoseTurn = null;
let winner = null;

// Create Starting selection Menu
const selectionMenu = () => {
  // Character Selection List
  const charOptions = document.createElement("div");
  charOptions.classList.add("options");
  CharacterList.GetAllCharacters().forEach((char) => {
    const singleChar = document.createElement("div");
    singleChar.classList.add("character");
    const charImage = document.createElement("img");
    charImage.classList.add("img");
    charImage.dataset.id = char.id;
    charImage.src = char.src;
    charSelectButtons.appendChild(singleChar);
    singleChar.appendChild(charImage);
  });

  selectChar();
  startMatch();
};

const selectChar = () => {
  //   Click Event
  charSelectButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("img")) {
      const charId = e.target.dataset.id;
      const character = CharacterList.GetCharacter(charId);

      e.target.classList.toggle("selected");

      if (e.target.classList.contains("selected")) {
        if (teamLineup.length < 3) {
          // if empty target is selected, create image + push into array
          const selectedChar = document.createElement("img");
          selectedChar.classList.add("team-mate");
          selectedChar.src = e.target.src;
          selectedChar.dataset.charId = charId;
          selectedTeam.appendChild(selectedChar);

          teamLineup.push(character);
        } else {
          e.target.classList.remove("selected");
          warningScreen.style.display = "flex";
          warningScreen.innerText = "Team is Full!";
          setTimeout(() => {
            warningScreen.innerText = "";
            warningScreen.style.display = "none";
          }, 1000);
        }
      } else {
        // if no selected, remove from array
        teamLineup = teamLineup.filter((mate) => mate.id !== charId);
        // and remove picture
        const picToBeRemoved = document.querySelector(
          `[data-char-id=${charId}]`
        );
        if (picToBeRemoved) {
          picToBeRemoved.remove();
        }
      }
    }
  });
};

const startMatch = () => {
  startButton.addEventListener("click", () => {
    // If not 3 characters, cannot start game
    if (teamLineup.length < 3) {
      warningScreen.innerText = "Please choose 3 characters";
      warningScreen.style.display = "flex";
      setTimeout(() => {
        warningScreen.innerText = "";
        warningScreen.style.display = "none";
      }, 1000);
      return;
    }

    warningScreen.innerText = "Game Start!";
    warningScreen.style.display = "flex";
    startButton.removeEventListener("click", startMatch);

    // Load game screen FUNCTION
    setTimeout(() => {
      warningScreen.innerText = "";
      warningScreen.style.display = "none";
      init();
      charSelect.style.display = "none";
    }, 2000);
  });
};

// INITIATE THE MATCH
const init = () => {
  gameContainer.style.display = "grid";
  randomEnemyTeam();
  // Load game screen
  //   Headers
  enemyWords.innerText = "ENEMY";
  playerWords.innerText = "PLAYER";
  attackWords.innerText = "MOVES";
  // Create surrender Button
  const surrenderButton = document.createElement("button");
  surrenderButton.type = "button";
  surrenderButton.classList.add("surrender");
  surrenderButton.innerText = "SURRENDER";
  gameContainer.appendChild(surrenderButton);

  //ADD ENEMIES
  renderEnemyTeam();

  // ADD TEAMMATES
  renderPlayerTeam();

  // START TURN CYCLE
  startTurnCycle();

  // IF CLICK SURRENDER, LOSE IMMEDIATELY
  surrenderButton.addEventListener("click", () => {
    infoScreen.innerText = "You Lost!";
    setTimeout(() => {
      endBattle();
    }, 1000);
  });
};

const randomEnemyTeam = () => {
  const charList = CharacterList.GetAllCharacters();
  const availableChars = [...charList];

  for (let i = 0; i < 3; i++) {
    const id = Math.floor(Math.random() * availableChars.length);
    const selectedCharId = availableChars[id].id;

    const enemyChar = CharacterList.GetCharacter(selectedCharId);
    enemyLineup.push(enemyChar);

    // Prevent duplicates by removing from availableChars
    availableChars.splice(id, 1);
  }
};

const renderEnemyTeam = () => {
  enemyLineup.forEach((enemy) => {
    // Enemy Images
    const enemyAvatar = document.createElement("img");
    enemyAvatar.src = enemy.src;
    enemyAvatar.classList.add("img-enemy");
    enemyAvatar.dataset.id = enemy.id;
    enemyAvatar.id = `enemyimage-${enemyLineup.indexOf(enemy)}`;
    enemyTeam.appendChild(enemyAvatar);

    // Enemy Health Bar
    const enemyHealthBox = document.createElement("div");
    enemyHealthBox.classList.add("enemy-health-bar");
    enemyHealthBox.dataset.id = enemy.id;
    enemyHealthBox.id = `enemy-${enemyLineup.indexOf(enemy)}`;
    enemyHealthBar.appendChild(enemyHealthBox);

    // Enemy Health Numbers
    const enemyHealth = document.createElement("p");
    enemyHealth.classList.add("enemy-health");
    enemyHealth.innerText = `${enemy.hp}`;
    enemyHealth.id = `enemy-${enemyLineup.indexOf(enemy)}`;
    enemyHealthPoints.appendChild(enemyHealth);
  });
};

const renderPlayerTeam = () => {
  teamLineup.forEach((player) => {
    // Player Images
    const playerAvatar = document.createElement("img");
    playerAvatar.src = player.src;
    playerAvatar.classList.add("img-player");
    playerAvatar.dataset.id = player.id;
    playerAvatar.id = `playerimage-${teamLineup.indexOf(player)}`;
    playerTeam.appendChild(playerAvatar);

    // Player Health Bar
    const playerHealthBox = document.createElement("div");
    playerHealthBox.classList.add("player-health-bar");
    playerHealthBox.dataset.id = player.id;
    playerHealthBox.id = `player-${teamLineup.indexOf(player)}`;
    playerHealthBar.appendChild(playerHealthBox);

    // Enemy Health Numbers
    const playerHealth = document.createElement("p");
    playerHealth.classList.add("player-health");
    playerHealth.innerText = `${player.hp}`;
    playerHealth.id = `player-${teamLineup.indexOf(player)}`;
    playerHealthPoints.appendChild(playerHealth);
  });
};

const startTurnCycle = () => {
  // Randomly select whose turn
  const randomNumber = Math.floor(Math.random() * 2);
  const decideTurn = () => {
    if (randomNumber === 1) {
      whoseTurn = "player";
      infoScreen.innerText = "You start!";
      playerTurn();
    } else {
      whoseTurn = "enemy";
      infoScreen.innerText = "Enemy starts!";
      enemyTurn();
    }
  };
  decideTurn();
};

const playerTurn = () => {
  let selectedCharacter = null;
  let selectedAttack = null;
  let selectingTarget = false;

  infoScreen.innerText = "Your turn";

  // Select character to attack - click event
  playerTeam.addEventListener("click", (e) => {
    // if in the midst of selecting target, don't carry this out

    if (selectingTarget === true) {
      return;
    }

    if (e.target.classList.contains("img-player")) {
      // Clear previous selections
      attackScreen.innerHTML = "";

      const charId = e.target.dataset.id;
      // e.target does not provide character configurations. It only provides the id of the character (line 56)
      const selectedActiveChar = teamLineup.find((char) => charId === char.id);

      // Selected character has attacks shown in the attack bar
      if (selectedActiveChar) {
        Object.values(selectedActiveChar.attacks).forEach((attack) => {
          const attackOption = document.createElement("img");
          attackOption.classList.add("attack-image");
          attackOption.src = attack.img;
          attackOption.alt = attack.name;
          attackOption.description = attack.description;
          attackOption.effect = attack.effect;
          attackOption.damage = attack.damage;
          attackScreen.appendChild(attackOption);

          // Select attack
          attackOption.addEventListener("click", () => {
            if (selectedActiveChar.hp === 0) {
              infoScreen.innerText = "Character is dead. Cannot attack";
            } else {
              infoScreen.innerText = `${attackOption.alt}: ${attackOption.description}`;
              selectedAttack = attack;
              selectingTarget = true;

              // Target selection determination
              if (attack.effect === "heal") {
                selectPlayer(selectedCharacter, selectedAttack);
              } else if (attack.effect === "single") {
                selectEnemy(selectedCharacter, selectedAttack);
              } else if (attack.effect === "aoe") {
                selectEnemies(selectedCharacter, selectedAttack);
              } else if (attack.effect === "block") {
                selectSelf(selectedCharacter, selectedAttack);
              } else if (attack.effect === "healself") {
                selectOwnself(selectedCharacter, selectedAttack);
              }
            }
          });
        });
      }
    }
  });

  // BLOCKING FUNCTION
  const selectSelf = (target) => {
    const invulnerable = (e) => {
      if (e.target.classList.contains("img-player")) {
        teamLineup.forEach((character) => {
          character.status = "invulnerable";
          console.log("we are invulnerable");
        });
        playerTeam.removeEventListener("click", invulnerable);

        infoScreen.innerText = `Your whole team is invulnerable`;

        selectingTarget = false;
        // Check Winner
        // If Game End, declare win or lose
        // Return to selection Page

        setTimeout(() => {
          enemyLineup.forEach((enemy) => {
            enemy.status = null;
          });
          changeTurn();
        }, 1500);
      }
    };
    playerTeam.addEventListener("click", invulnerable);
  };

  // AOE FUNCTION
  const selectEnemies = (target, attack) => {
    const attackAllEnemies = (e) => {
      if (e.target.classList.contains("img-enemy")) {
        if (enemyLineup.some((enemy) => enemy.status === "invulnerable")) {
          infoScreen.innerText = "Enemy team did not take damage.";
          enemyLineup.forEach((enemy) => {
            enemy.status = null;
          });
        } else {
          enemyLineup.forEach((enemy) => {
            if (enemy.hp === 0) {
              enemy.hp = 0;
            } else {
              enemy.hp = Math.max(enemy.hp - attack.damage, 0);
            }
          });
          infoScreen.innerText = `${attack.damage} was dealt to all enemies`;
        }
      }
      enemyTeam.removeEventListener("click", attackAllEnemies);

      updateHealthBar();

      selectingTarget = false;
      // Check Winner
      // If Game End, declare win or lose
      // Return to selection Page
      checkWinner();
      // Otherwise, change turn

      setTimeout(() => {
        enemyLineup.forEach((enemy) => {
          enemy.status = null;
        });
        changeTurn();
      }, 1500);
    };
    enemyTeam.addEventListener("click", attackAllEnemies);
  };

  // HEAL FUNCTION
  const selectPlayer = (target, attack) => {
    // HIGHLIGHT MEMBERS TO HEAL

    const healTarget = (e) => {
      if (e.target.classList.contains("img-player")) {
        const targetCharId = e.target.dataset.id;
        const targetCharacter = teamLineup.find(
          (char) => char.id === targetCharId
        );

        if (targetCharacter.hp === 0) {
          infoScreen.innerText = "Teammate already dead. Cannot be healed";
        } else if (targetCharacter) {
          targetCharacter.hp = Math.min(
            targetCharacter.hp + attack.damage,
            targetCharacter.maxHp
          );

          playerTeam.removeEventListener("click", healTarget);

          infoScreen.innerText = `Your team's ${targetCharacter.name} restored ${attack.damage} health`;
          updateHealthBar();

          selectingTarget = false;
          // Check Winner
          // If Game End, declare win or lose
          // Return to selection Page
          checkWinner();
          // Otherwise, change turn

          setTimeout(() => {
            enemyLineup.forEach((enemy) => {
              enemy.status = null;
            });
            changeTurn();
          }, 1500);
        }
      }
    };
    playerTeam.addEventListener("click", healTarget);
  };

  // ATTACK FUNCTION
  const selectEnemy = (target, attack) => {
    const attackTarget = (e) => {
      if (e.target.classList.contains("img-enemy")) {
        if (enemyLineup.some((enemy) => enemy.status === "invulnerable")) {
          infoScreen.innerText = "The enemy team did not take damage";
          enemyLineup.forEach((player) => {
            player.status = null;
          });
        } else {
          const targetEnemyId = e.target.dataset.id;
          const targetEnemy = enemyLineup.find(
            (enemy) => enemy.id === targetEnemyId
          );

          if (targetEnemy) {
            if (targetEnemy.hp === 0) {
              infoScreen.innerText =
                "Enemy is already dead! Select another target";
              return;
            } else {
              targetEnemy.hp = Math.max(targetEnemy.hp - attack.damage, 0);
              enemyTeam.removeEventListener("click", attackTarget);

              infoScreen.innerText = `Enemy ${targetEnemy.name} received ${attack.damage} damage`;
              updateHealthBar();
            }
          }
        }

        selectingTarget = false;

        // Check Winner
        checkWinner();
        // Otherwise, change turn
        setTimeout(() => {
          enemyLineup.forEach((enemy) => {
            enemy.status = null;
          });
          changeTurn();
        }, 1500);
      }
    };
    enemyTeam.addEventListener("click", attackTarget);
  };
};

const enemyTurn = () => {
  // Computer chooses 1 random enemy
  if (enemyLineup.length === 0) {
    return;
  }

  infoScreen.innerText = "Enemy's turn";

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * enemyLineup.length);
    const randomEnemy = enemyLineup[randomIndex];

    // Computer chooses 1 random attack
    const enemyAttacksAvailable = Object.values(randomEnemy.attacks);
    const randomEnemyAttack =
      enemyAttacksAvailable[Math.floor(Math.random() * 3)];

    // heals random Teammate
    if (randomEnemyAttack.effect === "heal") {
      const healTarget =
        enemyLineup[Math.floor(Math.random() * enemyLineup.length)];

      if (healTarget.hp === 0) {
        return;
      } else {
        healTarget.hp = Math.min(
          healTarget.hp + randomEnemyAttack.damage,
          healTarget.maxHp
        );
      }
      infoScreen.innerText = `Enemy team's ${healTarget.name} healed ${randomEnemyAttack.damage}`;
      // Attack random player
    } else if (randomEnemyAttack.effect === "single") {
      const enemyAttackedPlayer =
        teamLineup[Math.floor(Math.random() * teamLineup.length)];

      if (enemyAttackedPlayer.hp === 0) {
        infoScreen.innerText = "Enemy attacked dead character";
        return;
      } else if (enemyAttackedPlayer.status === "invulnerable") {
        infoScreen.innerText = "Your team did not take damage";
        teamLineup.forEach((player) => {
          player.status = null;
        });
        return;
      } else {
        enemyAttackedPlayer.hp = Math.max(
          enemyAttackedPlayer.hp - randomEnemyAttack.damage,
          0
        );
      }

      infoScreen.innerText = `Your team's ${enemyAttackedPlayer.name} received ${randomEnemyAttack.damage} damage`;
    } else if (randomEnemyAttack.effect === "aoe") {
      if (teamLineup.some((teammate) => teammate.status === "invulnerable")) {
        infoScreen.innerText = "Your team did not take damage";
        teamLineup.forEach((player) => {
          player.status = null;
        });
      } else {
        teamLineup.forEach((teammate) => {
          teammate.hp = Math.max(teammate.hp - randomEnemyAttack.damage, 0);
        });
        infoScreen.innerText = `Your whole team received ${randomEnemyAttack.damage} damage`;
      }
    } else if (randomEnemyAttack.effect === "block") {
      enemyLineup.forEach((enemy) => {
        enemy.status = "invulnerable";
      });
      infoScreen.innerText = `Enemy team became invulnerable.`;
    }

    updateHealthBar();
    // Check Winner
    // If Game End, declare win or lose
    // Return to selection Page
    checkWinner();
  }, 1500);

  setTimeout(() => {
    teamLineup.forEach((player) => {
      player.status = null;
    });
    changeTurn();
  }, 3000);
};

const updateHealthBar = () => {
  teamLineup.forEach((player, index) => {
    // const for selecting the specific character player health at that index
    const healthText =
      playerHealthPoints.querySelectorAll(".player-health")[index];
    const playerImage = playerTeam.querySelectorAll(".img-player")[index];
    const healthBarBox =
      playerHealthBar.querySelectorAll(".player-health-bar")[index];

    if (healthText) {
      healthText.innerText = `${player.hp}`;
      healthBarBox.style.width = `${player.hp}px`;
    }

    if (player.hp === 0) {
      playerImage.src = "/images/dead.png";
      playerImage.style.opacity = "60%";
    }
  });

  enemyLineup.forEach((enemy, index) => {
    const healthText =
      enemyHealthPoints.querySelectorAll(".enemy-health")[index];
    const enemyImage = enemyTeam.querySelectorAll(".img-enemy")[index];
    const enemyHealthBarBox =
      enemyHealthBar.querySelectorAll(".enemy-health-bar")[index];

    if (healthText) {
      healthText.innerText = `${enemy.hp}`;
      enemyHealthBarBox.style.width = `${enemy.hp}px`;
    }

    if (enemy.hp === 0) {
      enemyImage.src = "/images/dead.png";
      enemyImage.style.opacity = "60%";
    }
  });
};

const checkWinner = () => {
  const totalPlayerHealth = teamLineup.reduce(
    (sum, player) => sum + player.hp,
    0
  );
  const totalEnemyHealth = enemyLineup.reduce(
    (sum, enemy) => sum + enemy.hp,
    0
  );

  // if all player health is 0, announce 'you lose'. End game
  if (totalPlayerHealth === 0) {
    winner = true;
    infoScreen.innerText = "You Lost!";
    setTimeout(() => {
      endBattle();
    }, 1000);
  } else if (totalEnemyHealth === 0) {
    winner = true;
    infoScreen.innerText = "You Won!";
    setTimeout(() => {
      endBattle();
    }, 1000);
  } else {
    winner = false;
  }
  // if all enemy health is 0, announce 'you win'. End game
  // Otherwise, swap players
};

const changeTurn = () => {
  if (winner === true) {
    return;
  }

  if (whoseTurn === "player") {
    whoseTurn = "enemy";
    enemyTurn();
  } else if (whoseTurn === "enemy") {
    whoseTurn = "player";
    playerTurn();
  }
};

const endBattle = () => {
  charSelect.style.display = "grid";
  //   resetting everything
  teamLineup = [];
  enemyLineup = [];
  selectedTeam.innerHTML = "";

  // Resetting game container
  enemyWords.innerHTML = "";
  enemyTeam.innerHTML = "";
  playerWords.innerHTML = "";
  playerTeam.innerHTML = "";
  attackWords.innerHTML = "";
  attackScreen.innerHTML = "";
  infoScreen.innerHTML = "";
  document.querySelector(".surrender").remove();
  enemyHealthBar.innerHTML = "";
  enemyHealthPoints.innerHTML = "";
  playerHealthBar.innerHTML = "";
  playerHealthPoints.innerHTML = "";

  //   resetting button borders
  const allCharImages = charSelectButtons.querySelectorAll(".img");
  allCharImages.forEach((button) => {
    button.classList.remove("selected");
  });
  gameContainer.style.display = "none";
};

selectionMenu();
