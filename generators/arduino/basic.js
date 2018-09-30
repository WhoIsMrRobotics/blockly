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
 * @fileoverview Generating Arduino code for Arduino basic blocks.
 * @author olivier@mr-robotics.com (Olivier Lévêque)
 */
'use strict';

goog.provide('Blockly.Arduino.basic');
goog.require('Blockly.Arduino');

Blockly.Arduino['basic_delay'] = function(block) {
  var value_delay = Blockly.Arduino.valueToCode(block, 'DELAY', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'delay(' + value_delay + ');\n';
  return code;
};

Blockly.Arduino['basic_delaymicroseconds'] = function(block) {
  var value_delay = Blockly.Arduino.valueToCode(block, 'DELAY', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'delayMicroseconds(' + value_delay + ');\n';
  return code;
};

Blockly.Arduino['basic_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['basic_infiniteloop'] = function(block) {
  var code = 'while(true);\n';
  return code;
};

Blockly.Arduino['basic_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['basic_map'] = function(block) {
  var valueNum = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var valueDmax = Blockly.Arduino.valueToCode(
      block, 'DMAX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'map(' + valueNum + ', 0, 1024, 0, ' + valueDmax + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['basic_serialbegin'] = function(block) {
  var dropdown_serial_port = block.getFieldValue('serial_port');
  var dropdown_bauds = block.getFieldValue('BAUDS');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_' + dropdown_serial_port + '_Begin', dropdown_serial_port + '.begin(' + dropdown_bauds + ');', true);
  return '';
};

Blockly.Arduino['basic_serialprint'] = function(block) {
  var dropdown_serial_port = block.getFieldValue('serial_port');
  var checkbox_newline = block.getFieldValue('newline');
  var value_name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_' + dropdown_serial_port + '_Begin', dropdown_serial_port + '.begin(9600);', false);
  var code = dropdown_serial_port;
  code += (checkbox_newline == 'TRUE') ? '.println(' : '.print(';
  code += value_name + ');\n';
  return code;
};

Blockly.Arduino['basic_serialavailable'] = function(block) {
  var dropdown_serial_port = block.getFieldValue('serial_port');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_' + dropdown_serial_port + '_Begin', dropdown_serial_port + '.begin(9600);', false);
  var code = dropdown_serial_port + '.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['basic_serialread'] = function(block) {
  var dropdown_serial_port = block.getFieldValue('serial_port');
  Blockly.Arduino.addInclude('include_brainzy','#include <BRAINZY.h>');
  Blockly.Arduino.addSetup('setup_' + dropdown_serial_port + '_Begin', dropdown_serial_port + '.begin(9600);', false);
  var code = dropdown_serial_port + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};