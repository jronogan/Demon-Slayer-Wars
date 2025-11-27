class CharacterList {
  static characters = {
    b001: {
      name: "Kamado Tanjiro",
      class: "basic",
      type: "water",
      src: "/images/Kamado Tanjiro Starter/Tanjiro First Pic.png",
      attacks: {
        1: {
          name: "Third Form - Flowing Dance",
          img: "/images/Kamado Tanjiro Starter/Tanjiro Third Form Flowing Dance.png",
          damage: 20,
          effect: "aoe",
          description: "Tanjiro does 20 damage to all enemies",
        },
        2: {
          name: "Fifth Form - Blessed Rain After the Drought",
          img: "/images/Kamado Tanjiro Starter/Tanjiro Fifth Form Blessed Rain After the Drought.png",
          damage: 35,
          effect: "single",
          description: "Tanjiro does 35 damage to one enemy",
        },
        3: {
          name: "Eighth Form - Waterfall Basin",
          img: "/images/Kamado Tanjiro Starter/Tanjiro Eighth Form Waterfall Basin.png",
          damage: 45,
          effect: "single",
          description: "Tanjiro does 45 damage to one enemy",
        },
      },
      hp: 100,
      maxHp: 100,
      status: null,
    },
    b002: {
      name: "Inosuke Hashibara",
      class: "basic",
      type: "beast",
      src: "/images/Inosuke Hashibara Starter/Inosuke First Pic.png",
      attacks: {
        1: {
          name: "Second Fang - Slice",
          img: "/images/Inosuke Hashibara Starter/Beast Breathing Second Fang Slice.png",
          damage: 25,
          effect: "single",
          description: "Inosuke does 25 damage to one enemy",
        },
        2: {
          name: "Fourth Fang - Slice & Dice",
          img: "/images/Inosuke Hashibara Starter/Beast Breathing Fourth Fang Slice n Dice.png",
          damage: 40,
          effect: "single",
          description: "Inosuke does 40 damage to one enemy",
        },
        3: {
          name: "Seventh Fang - Spatial Awareness",
          img: "/images/Inosuke Hashibara Starter/Beast Breathing Seventh Fang Spatial Awareness.png",
          damage: 0,
          effect: "block",
          description: "Your team is invulnerable for one turn",
        },
      },
      hp: 100,
      maxHp: 100,
      status: null,
    },
    b003: {
      name: "Zenitsu Agatsuma",
      class: "basic",
      type: "thunder",
      src: "/images/Zenitsu Agatsuma Starter/Zenitsu First Pic.png",
      attacks: {
        1: {
          name: "Sleep",
          img: "/images/Zenitsu Agatsuma Starter/Zenitsu Sleep.png",
          damage: 25,
          effect: "heal",
          description:
            "Zenitsu needs to fall asleep to fight. Heals a teammate for 25 health.",
        },
        2: {
          name: "First Form - Thunderclap and Flash",
          img: "/images/Zenitsu Agatsuma Starter/Zenitsu Preparation.png",
          damage: 20,
          effect: "aoe",
          description: "Zenitsu attacks all enemies for 20 damage each",
        },
        3: {
          name: "God Form - Thunderclap and Flash",
          img: "/images/Zenitsu Agatsuma Starter/First Form Thunderclap and Flash.png",
          damage: 45,
          effect: "single",
          description: "Zenitsu does 45 damage to one enemy",
        },
      },
      hp: 100,
      maxHp: 100,
      status: null,
    },
    b004: {
      name: "Kamado Nezuko",
      class: "basic",
      type: "demon",
      src: "/images/Nezuko Starter/Nezuko First Pic.png",
      attacks: {
        1: {
          name: "Rest",
          img: "/images/Nezuko Starter/Rest.png",
          damage: 0,
          effect: "block",
          description:
            "Nezuko rests and helps the team become invulnerable for one turn",
        },
        2: {
          name: "Purify",
          img: "/images/Nezuko Starter/Blood Demon Art Purify.png",
          damage: 25,
          effect: "heal",
          description: "Nezuko heals 25 health from herself or any ally.",
        },
        3: {
          name: "Exploding Blood",
          img: "/images/Nezuko Starter/Blood Demon Art Exploding Blood.png",
          damage: 45,
          effect: "single",
          description: "Nezuko deals 45 damage to one enemy",
        },
      },
      hp: 100,
      maxHp: 100,
      status: null,
    },
  };

  static GetCharacter(id) {
    return { id, ...this.characters[id] }; // prevent mutations by making a copy + {} Object spread --> Basically becomes a copy of the {} belonging to specific b00 key
  }

  static GetAllCharacters() {
    return Object.entries(this.characters).map(([id, values]) => ({
      id,
      ...values,
    }));
  }

  static GetRandomCharacter() {
    const id = Object.keys(this.characters); //Object.keys() returns an array with the keys of the character constructor
    const randomId = id[Math.ceil(Math.random() * id.length)];
    return this.GetCharacter(randomId);
  }
}
