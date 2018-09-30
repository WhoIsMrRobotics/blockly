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
 * @fileoverview Arduino basic blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author olivier@mr-robotics.com (Olivier Lévêque)
 */
'use strict';

goog.provide('Blockly.Blocks.basic');  // Deprecated

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['basic_map'] = {
  helpUrl: 'http://arduino.cc/en/Reference/map',
  init: function() {
    this.setColour(230);
    this.appendValueInput("NUM", 'Number')
        .appendField("Convertir ")
        .setCheck('Number');
    this.appendValueInput("DMAX", 'Number')
        .appendField("entre 0 et")
        .setCheck('Number');
    this.appendDummyInput();
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Re-maps a number from [0-1024] to another.');
  }
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "basic_delay",
  "message0": "Attendre %1 millisecondes",
  "args0": [
    {
      "type": "input_value",
      "name": "DELAY",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/time/delay/"
},
{
  "type": "basic_delaymicroseconds",
  "message0": "Attendre %1 microsecondes",
  "args0": [
    {
      "type": "input_value",
      "name": "DELAY",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/time/delaymicroseconds/"
},
{
  "type": "basic_millis",
  "message0": "Temps écoulé (en millisecondes)",
  "output": "Number",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/time/millis/"
},
{
  "type": "basic_infiniteloop",
  "message0": "Attendre sans fin (fin du programme)",
  "previousStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "basic_micros",
  "message0": "Temps écoulé (en microsecondes)",
  "output": "Number",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/time/micros/"
},
{
  "type": "basic_serialbegin",
  "message0": "Réglage du %1 vitesse de communication %2 bauds",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "serial_port",
      "options": [
        [
          "USB",
          "SerialUSB"
        ],
        [
          "Bluetooth",
          "SerialBluetooth"
        ],
        [
          "Wifi",
          "SerialWifi"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "BAUDS",
      "options": [
        [
          "9600",
          "9600"
        ],
        [
          "38400",
          "38400"
        ],
        [
          "115200",
          "115200"
        ]
      ]
    }
  ],
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/en/Serial/Begin"
},
{
  "type": "basic_serialprint",
  "message0": "Envoyer sur le port %1 %2 ( %3 avec saut de ligne) %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "serial_port",
      "options": [
        [
          "USB",
          "SerialUSB"
        ],
        [
          "Bluetooth",
          "SerialBluetooth"
        ],
        [
          "Wifi",
          "SerialWifi"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "newline",
      "checked": true
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/en/Serial/Print"
},
{
  "type": "basic_serialavailable",
  "message0": "Le port %1 est disponible",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "serial_port",
      "options": [
        [
          "USB",
          "SerialUSB"
        ],
        [
          "Bluetooth",
          "SerialBluetooth"
        ],
        [
          "Wifi",
          "SerialWifi"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/en/Serial/Available"
},
{
  "type": "basic_serialread",
  "message0": "Lire le port %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "serial_port",
      "options": [
        [
          "USB",
          "SerialUSB"
        ],
        [
          "Bluetooth",
          "SerialBluetooth"
        ],
        [
          "Wifi",
          "SerialWifi"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "https://www.arduino.cc/en/Serial/Read"
}
]);  // END JSON EXTRACT (Do not delete this comment.)