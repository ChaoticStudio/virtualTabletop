export default {
  Character: {
    Name: 'Xuxulu',
    Class: 'A lot',
    Level: 'Over 9K',
    Race: 'Some times',
    Alignment: 'Chaotic Evil',
    'Experience Points': 2000000,
    Inspiration: true,
    'css-class': 'header'
  },
  Attributes: {
    'Proficiency Bonus': 6,
    'Passive Perception': 10,
    Strength: {
      Value: 20,
      Modifier: 5,
      Trained: true,
      Skills: {
        Athletics: true
      }
    },
    Dexterity: {
      Value: 20,
      Modifier: 5,
      Trained: true,
      Skills: {
        Acrobatics: false,
        'Sleight of Hand': false,
        Stealth: false
      }
    },
    Constitution: {
      Value: 20,
      Modifier: 5,
      Trained: true
    },
    Intelligence: {
      Value: 18,
      Modifier: 4,
      Trained: false,
      Skills: {
        Arcana: false,
        History: true,
        Investigation: false,
        Nature: false,
        Religion: false
      }
    },
    Wisdom: {
      Value: 18,
      Modifier: 4,
      Trained: false,
      Skills: {
        'Animal Handling': false,
        Insight: true,
        Medicine: false,
        Perception: true,
        Survival: false
      }
    },
    Charisma: {
      Value: 18,
      Modifier: 4,
      Trained: false,
      Skills: {
        Deception: false,
        Intimidation: false,
        Performance: false,
        Persuasion: true
      }
    },
    'css-class': 'attributes'
  },
  'Battle Info': {
    'Armor Class': 22,
    Initiative: '',
    Speed: 30,
    'Hit Point Maximun': 250,
    'Current Hit Points': 250,
    'Temporary Hit Points': 0,
    'Hit Dice': '1d10',
    'Death Saves': {
      Successes: 0,
      Failures: 0
    },
    'css-class': 'info'
  },
  'Attacks and Spells': { 'css-class': 'text-block' },
  'Features and Traits': { 'css-class': 'text-block' },
  Equipment: {
    Coins: {
      CP: 0,
      SP: 0,
      EP: 0,
      GP: 0,
      PP: 0
    },
    Itens: {},
    'css-class': 'text-block'
  },
  'Other Proficiencies and Languages': {
    Weapon: [],
    Armor: [],
    Language: ['Common'],
    'css-class': 'text-block'
  },
  'Role Play Notes': {
    'Personality Traits': '',
    Ideals: '',
    Bonds: '',
    Flaws: '',
    Backstory: '',
    'css-class': 'text-block'
  }
}
