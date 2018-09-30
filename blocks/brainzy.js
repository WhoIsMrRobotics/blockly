/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Brainzy blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author olivier@mr-robotics.com (Olivier Lévêque)
 */
'use strict';

goog.provide('Blockly.Blocks.brainzy');  // Deprecated

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.defineBlocksWithJsonArray([
{
  "type": "brainzy_isbuttonledon",
  "message0": "la led de l'interrupteur est %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "state",
      "options": [
        [
          "allumée",
          "ON"
        ],
        [
          "étiente",
          "OFF"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_isledon",
  "message0": "la led est %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "state",
      "options": [
        [
          "allumée",
          "ON"
        ],
        [
          "éteinte",
          "OFF"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_turnled",
  "message0": "%1 la led",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "state",
      "options": [
        [
          "allumer",
          "On"
        ],
        [
          "éteindre",
          "Off"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_turnbuttonled",
  "message0": "%1 la led de l'interrupteur",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "state",
      "options": [
        [
          "allumer",
          "On"
        ],
        [
          "éteindre",
          "Off"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_resetwheelangularpositions",
  "message0": "mettre à zéro les angles des moteurs",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_xpositionread",
  "message0": "position du robot suivant X",
  "inputsInline": true,
  "output": "Number",
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_ypositionread",
  "message0": "position du robot suivant Y",
  "inputsInline": true,
  "output": "Number",
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_angularpositionread",
  "message0": "position angulaire du robot",
  "inputsInline": true,
  "output": "Number",
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_positionwrite",
  "message0": "Définir la position du robot %1 X (mm) %2 Y (mm) %3 angle %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "xposition",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "yposition",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "angularposition",
      "check": "angle",
      "align": "RIGHT"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_motorpositionread",
  "message0": "angle moteur %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "gauche",
          "left"
        ],
        [
          "droit",
          "right"
        ],
        [
          "avant",
          "front"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_setmode",
  "message0": "Initialiser Robby comme un robot %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "mode",
      "options": [
        [
          "differentiel",
          "DIFFERENTIAL"
        ],
        [
          "omnidirectionel",
          "OMNIDIRECTIONAL"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_isbutton",
  "message0": "l'interrupteur est %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "state",
      "options": [
        [
          "préssé",
          "Pressed"
        ],
        [
          "relâché",
          "Released"
        ]
      ]
    }
  ],
  "output": "Boolean",
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_blinkled",
  "message0": "Clignoter la %1 toutes les %2 milliseconde(s)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "led",
          "led"
        ],
        [
          "led de l'interrupteur",
          "ledButton"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_noblinkled",
  "message0": "Arrêter le clignotement de la %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "led",
          "led"
        ],
        [
          "led de l'interrupteur",
          "ledButton"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "angle",
  "message0": "%1",
  "args0": [
    {
      "type": "field_angle",
      "name": "angle",
      "angle": 90
    }
  ],
  "output": "angle",
  "colour": 240,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_playnote",
  "message0": "Jouer la note %1 à l'octave %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "note",
      "options": [
        [
          "Do",
          "c"
        ],
        [
          "Ré",
          "d"
        ],
        [
          "Mi",
          "e"
        ],
        [
          "Fa",
          "f"
        ],
        [
          "Sol",
          "g"
        ],
        [
          "La",
          "a"
        ],
        [
          "Si",
          "b"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "octave",
      "options": [
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ],
        [
          "7",
          "7"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 290,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_stop",
  "message0": "Stop",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_translate",
  "message0": "Avancer de %1 mm dans la direction %2",
  "args0": [
    {
      "type": "input_value",
      "name": "distance",
      "check": "Number"
    },
    {
      "type": "field_angle",
      "name": "direction",
      "angle": 90
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_turn",
  "message0": "Tourner de %1",
  "args0": [
    {
      "type": "field_angle",
      "name": "direction",
      "angle": 90
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "brainzy_pointto",
  "message0": "Pointer la direction %1",
  "args0": [
    {
      "type": "field_angle",
      "name": "direction",
      "angle": 90
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
}
]);  // END JSON EXTRACT (Do not delete this comment.)