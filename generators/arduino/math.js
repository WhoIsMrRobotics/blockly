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
 * @fileoverview Generating Arduino code for math blocks.
 * @author olivier@mr-robotics.com (Olivier Lévêque)
 */
'use strict';

goog.provide('Blockly.Arduino.math');
goog.require('Blockly.Arduino');

Blockly.Arduino.addReservedWords('Math');

Blockly.Arduino['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code == Infinity) {
    code = 'NaN';
    order = Blockly.Arduino.ORDER_UNARY_POSTFIX;
  } else if (code == -Infinity) {
    code = 'NaN';
    order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  } else {
    // -4.abs() returns -4 in Arduino due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    order = code < 0 ?
        Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  }
  return [code, order];
};

Blockly.Arduino['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Arduino.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.Arduino.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'POWER': [null, Blockly.Arduino.ORDER_NONE]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in Arduino requires a special case since it has no operator.
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Arduino['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var arg = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '0';
  var code;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    if (arg[0] == '-') {
      // --3 is not legal in Arduino.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin(' + arg + ' / 180 * PI)';
      break;
    case 'COS':
      code = 'cos(' + arg + ' / 180 * PI)';
      break;
    case 'TAN':
      code = 'tan(' + arg + ' / 180 * PI)';
      break;
    case 'LN':
      Blockly.Arduino.includes_['include_Arduino_math'] = '#include <math.h>';
      code = 'log(' + arg + ')';
      break;
    case 'EXP':
      Blockly.Arduino.includes_['include_Arduino_math'] = '#include <math.h>';
      code = 'exp(' + arg + ')';
      break;
  }
  if (code) {
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  Blockly.Arduino.includes_['include_Arduino_math'] = '#include <math.h>';
  switch (operator) {
    case 'LOG10':
      code = 'log(' + arg + ') / log(10)';
      break;
    case 'ASIN':
      code = 'asin(' + arg + ') / PI * 180';
      break;
    case 'ACOS':
      code = 'acos(' + arg + ') / PI * 180';
      break;
    case 'ATAN':
      code = 'atan(' + arg + ') / PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['M_PI', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'E': ['M_E', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'GOLDEN_RATIO':
        ['(1 + sqrt(5)) / 2', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'SQRT2': ['M_SQRT2', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'SQRT1_2': ['M_SQRT1_2', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'INFINITY': [' __builtin_inf()', Blockly.Arduino.ORDER_ATOMIC]
  };
  Blockly.Arduino.includes_['include_Arduino_math'] = '#include <math.h>';
  var constant = block.getFieldValue('CONSTANT');
  return CONSTANTS[constant];
};

Blockly.Arduino['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Arduino.valueToCode(block, 'DELTA',
      Blockly.Arduino.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = (' + varName + ' is num ? ' + varName + ' : 0) + ' +
      argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.Arduino['math_round'] = Blockly.Arduino['math_single'];
// Trigonometry functions have a single operand.
Blockly.Arduino['math_trig'] = Blockly.Arduino['math_single'];

Blockly.Arduino['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.Arduino.valueToCode(block, 'DIVIDEND',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'DIVISOR',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_NONE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'LOW',
      Blockly.Arduino.ORDER_NONE) || '0';
  var argument2 = Blockly.Arduino.valueToCode(block, 'HIGH',
      Blockly.Arduino.ORDER_NONE) || 'double.INFINITY';
  var code = 'constrain(' + argument0 + ', ' + argument1 + ', ' +
      argument2 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_NONE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_NONE) || '0';
  var code = 'random(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};
