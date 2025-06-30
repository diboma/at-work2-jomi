import { isObject, padNumber } from './utils.js';
import handlebars from 'handlebars';
const { SafeString } = handlebars;

export default {
  uppercase: (text) => text.toUpperCase(),
  bold: function (text) {
    return `<strong>${text}</strong>`;
  },
  date: (date) => {
    return new Date(date).toLocaleString('nl-BE', {
      timezone: 'Europe/Brussels',
    });
  },
  dateTime: (date) => {
    const dateString = new Date(date).toLocaleDateString('nl-BE', {
      timezone: 'Europe/Brussels',
    });
    const timeString = new Date(date)
      .toLocaleTimeString('nl-BE')
      .substring(0, 5);
    return `${dateString} om ${timeString}`;
  },
  dateForForm: (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
    return `${year}-${month}-${day}`;
  },
  timeForForm: (dateString) => {
    return new Date(dateString).toLocaleTimeString('nl-BE').substring(0, 5);
  },
  ownsEquipment: (equipmentArray, typeId) => {
    const found = equipmentArray.find(
      (item) => item.equipment_type_id === typeId
    );
    if (!found) return false;
    return true;
  },
  dateReceivedEquipment: (equipmentArray, typeId) => {
    const found = equipmentArray.find(
      (item) => item.equipment_type_id === typeId
    );
    if (!found) return false;
    return new Date(found.created_at).toLocaleDateString('nl-BE', {
      timezone: 'Europe/Brussels',
    });
  },
  dateReceivedEquipmentForHiddenInput: (equipmentArray, typeId) => {
    const found = equipmentArray.find(
      (item) => item.equipment_type_id === typeId
    );
    if (!found) return false;
    if (typeof found.created_at === 'number') return found.created_at;
    else return Date.parse(found.created_at);
  },
  isEqual(arg1, arg2) {
    return arg1 === arg2;
  },
  isEq(arg1, arg2) {
    return arg1 === arg2;
  },
  isGt(arg1, arg2) {
    return arg1 > arg2;
  },
  isLt(arg1, arg2) {
    return arg1 < arg2;
  },
  typeof: (val) => typeof val,
  contains: (haystack, needle) => {
    if (!haystack || !needle) return false;
    if (isObject(haystack) || isObject(needle)) return false;
    return haystack.includes(needle);
  },
  // Source: https://www.cloudhadoop.com/handlebarjs-if-helper/
  isAnd(cond1, cond2, options) {
    return cond1 && cond2 ? options.fn(this) : options.inverse(this);
  },
  isOr(cond1, cond2, options) {
    return cond1 || cond2 ? options.fn(this) : options.inverse(this);
  },
  ifEq(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  },
};

/**
 * Helper functions
 * Source: https://www.cloudhadoop.com/handlebarjs-if-helper/
 
    Usage: isAnd
    ------------- 
    {{#isAnd condition1  condition2}}
      {{! multiple conditions and satisfied}}
    {{else}}
      {{! multiple conditions and not satisfied}}
    {{/isAnd}}

    Usage: isOr
    ----------- 
    {{#isOr condition1  condition2}}
      {{! multiple conditions not satisfied}}
    {{else}}
      {{! multiple conditions not satisfied}}
    {{/isOr}}

    Usage: ifEq 
    ----------- 
    <div>
      {{#ifEq username "john"}}
        <div> Equal</div>
      {{else}}
        <div> Not Equal</div>
      {{/ifEq }}
    </div>
 */
