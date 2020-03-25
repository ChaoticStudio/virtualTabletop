export default [
  {
    type: 'list',
    value: [
      {
        name: 'Character',
        content: [
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'lg',
                inputType: 'text',
                name: 'Name',
                label: 'Name'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'select',
                className: 'sm',
                name: 'Class',
                label: 'Class',
                options: ['Fighter', 'Wizard', 'Rogue']
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'select',
                className: 'sm',
                name: 'Race',
                label: 'Race',
                options: ['Human', 'Dwarf', 'Elf']
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'select',
                className: 'sm',
                name: 'Background',
                label: 'Background'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'text',
                name: 'Alignment',
                label: 'Alignment'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Experience Points',
                label: 'Experience Points'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'list',
    value: [
      {
        name: 'Stats',
        content: [
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'tn',
                inputType: 'number',
                name: 'STR',
                label: 'STR'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'tn',
                inputType: 'number',
                name: 'DEX',
                label: 'DEX'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'tn',
                inputType: 'number',
                name: 'CON',
                label: 'CON'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'tn',
                inputType: 'number',
                name: 'INT',
                label: 'INT'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'tn',
                inputType: 'number',
                name: 'WIS',
                label: 'WIS'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'tn',
                inputType: 'number',
                name: 'CHA',
                label: 'CHA'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'list',
    value: [
      {
        name: 'Saving Throws',
        content: [
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Strength',
                label: 'Strength'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Dexterity',
                label: 'Dexterity'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Constitution',
                label: 'Constitution'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Intelligence',
                label: 'Intelligence'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Wisdom',
                label: 'Wisdom'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Charisma',
                label: 'Charisma'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'list',
    value: [
      {
        name: 'Skills',
        content: [
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Acrobatics',
                label: 'Acrobatics'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Animal Handling',
                label: 'Animal Handling'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Arcana',
                label: 'Arcana'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Athletics',
                label: 'Athletics'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Deception',
                label: 'Deception'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'History',
                label: 'History'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Insight',
                label: 'Insight'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Intimidation',
                label: 'Intimidation'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Investigation',
                label: 'Investigation'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Medicine',
                label: 'Medicine'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Nature',
                label: 'Nature'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Perception',
                label: 'Perception'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Performance',
                label: 'Performance'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Persuasion',
                label: 'Persuasion'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Religion',
                label: 'Religion'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Sleight of Hand',
                label: 'Sleight of Hand'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Stealth',
                label: 'Stealth'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'skill',
                className: 'md',
                inputType: 'number',
                name: 'Survival',
                label: 'Survival'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'list',
    value: [
      {
        name: 'Combat',
        content: [
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Armor Class',
                label: 'Armor Class'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Initiative',
                label: 'Initiative'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Speed',
                label: 'Speed'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Hit Point Maximum',
                label: 'Hit Point Maximum'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Current Hit Point',
                label: 'Current Hit Point'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'number',
                name: 'Temporary Hit Point',
                label: 'Temporary Hit Point'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                className: 'sm',
                inputType: 'text',
                name: 'Hit Dice',
                label: 'Hit Dice'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'checkbox',
                name: 'Success',
                value: '3',
                className: 'lg'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'checkbox',
                name: 'Failures',
                value: '3',
                className: 'lg'
              }
            ]
          },
          {
            type: 'listitem',
            value: [
              {
                type: 'textarea',
                name: 'Items',
                label: 'Items',
                className: 'lg'
              }
            ]
          }
        ]
      }
    ]
  }
]
