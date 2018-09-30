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
 * @fileoverview Generating Arduino code for text blocks.
 * @author olivier@mr-robotics.com (Olivier Lévêque)
 */
'use strict';

goog.provide('Blockly.Arduino.texts');
goog.require('Blockly.Arduino');

Blockly.Arduino.addReservedWords('Html,Math');

Blockly.Arduino['text'] = function(block) {
  // Text value.
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  if (block.itemCount_ == 0) {
    return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'ADD0',
        Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument0 + '.toString()';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  } else {
    code = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      code[n] = Blockly.Arduino.valueToCode(block, 'ADD' + n,
          Blockly.Arduino.ORDER_NONE) || '\'\'';
    }
    code = code.join('+');
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
};

Blockly.Arduino['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var value = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '""';
  return varName + ' += ' + value + ';\n';
};

Blockly.Arduino['text_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
  return [argument0 + '.length()', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};
