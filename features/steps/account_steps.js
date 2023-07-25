const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

let balance

 Given('a user balance is {int}', function (initialBalance) {
  balance = initialBalance
 });

 When('user adds {int} to the account', function (income) {
  balance += income
 });

 When('user extracts {int} to the account', function (expense) {
  balance -= expense
 });

 Then('balance should be {int}', function (finalBalance) {
  assert(finalBalance === balance,'Balance does not match expected')
 });
