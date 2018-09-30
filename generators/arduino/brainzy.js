/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2014 Google Inc.
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
 * @fileoverview Generating Arduino code for Brainzy blocks.
 * @author olivier@mr-robotics.com (Olivier Lévêque)
 */
'use strict';

goog.provide('Blockly.Arduino.brainzy');
goog.require('Blockly.Arduino');

Blockly.Arduino['brainzy_isbuttonledon'] = function(block) {
  var dropdown_state = block.getFieldValue('state');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = (dropdown_state=='ON') ? 'Robby.isLedButtonOn()':'!Robby.isLedButtonOn()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_isledon'] = function(block) {
  var dropdown_state = block.getFieldValue('state');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = (dropdown_state=='ON') ? 'Robby.isLedOn()':'!Robby.isLedOn()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_turnled'] = function(block) {
  var dropdown_state = block.getFieldValue('state');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.led' + dropdown_state + '();\n'
  return code;
};

Blockly.Arduino['brainzy_turnbuttonled'] = function(block) {
  var dropdown_state = block.getFieldValue('state');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.ledButton' + dropdown_state + '();\n'
  return code;
};

Blockly.Arduino['brainzy_resetwheelangularpositions'] = function(block) {
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.resetWheelAngularPositions();\n';
  return code;
};

Blockly.Arduino['brainzy_xpositionread'] = function(block) {
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.xPositionRead()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_ypositionread'] = function(block) {
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.yPositionRead()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_angularpositionread'] = function(block) {
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.angularPositionRead()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_positionwrite'] = function(block) {
  var value_xposition = Blockly.Arduino.valueToCode(block, 'xposition', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_yposition = Blockly.Arduino.valueToCode(block, 'yposition', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_angularposition = Blockly.Arduino.valueToCode(block, 'angularposition', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.xPositionWrite(' + value_xposition + ');\n' + 
    'Robby.yPositionWrite(' + value_yposition + ');\n' +
    'Robby.angularPositionWrite(' + value_angularposition + ');\n';
  return code;
};

Blockly.Arduino['brainzy_motorpositionread'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.' + dropdown_name + 'MotorPositionRead()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_setmode'] = function(block) {
  var dropdown_mode = block.getFieldValue('mode');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_setMode', 'Robby.setMode(' + dropdown_mode + ');', false);
  Blockly.Arduino.addSetup('setup_controlMode', 'Robby.noSlaved();', false);
  return '';
};

Blockly.Arduino['brainzy_isbutton'] = function(block) {
  var dropdown_state = block.getFieldValue('state');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.isButton' + dropdown_state + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_blinkled'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_time = Blockly.Arduino.valueToCode(block, 'time', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.' + dropdown_name + 'Blink(' + value_time + ');\n';
  return code;
};

Blockly.Arduino['brainzy_noblinkled'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.' + dropdown_name + 'NoBlink();\n';
  return code;
};

Blockly.Arduino['angle'] = function(block) {
  return [block.getFieldValue('angle'), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['brainzy_playnote'] = function(block) {
  var dropdown_note = block.getFieldValue('note');
  var dropdown_octave = block.getFieldValue('octave');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.playNote(NOTE_' + dropdown_note + ',' + dropdown_octave + ');\n';
  return code;
};

Blockly.Arduino['brainzy_stop'] = function(block) {
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  var code = 'Robby.stop();\n';
  return code;
};

Blockly.Arduino['brainzy_translate'] = function(block) {
  var value_distance = Blockly.Arduino.valueToCode(block, 'distance', Blockly.Arduino.ORDER_ATOMIC);
  var angle_direction = block.getFieldValue('direction');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_controlMode', 'Robby.slaved();', true);
  var code = 'Robby.translate(' + value_distance + ',' + angle_direction + ');\n' +
    'Robby.waitActionDone();\n';
  return code;
};

Blockly.Arduino['brainzy_turn'] = function(block) {
  var angle_direction = block.getFieldValue('direction');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_controlMode', 'Robby.slaved();', true);
  var code = 'Robby.turn(' + angle_direction + ');\n' +
    'Robby.waitActionDone();\n';
  return code;
};

Blockly.Arduino['brainzy_pointto'] = function(block) {
  var angle_direction = block.getFieldValue('direction');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_controlMode', 'Robby.slaved();', true);
  var code = 'Robby.pointTo(' + angle_direction + ');\n' +
    'Robby.waitActionDone();\n';
  return code;
};