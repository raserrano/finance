@account
Feature: Account

Scenario: An account initial balance must be a positive amount
  Given initial <initialBalance> 

Scenario: A user adds income to account
  Given a user balance is 0
  When user adds 2400 to the account
  Then balance should be 2400

Scenario: A user adds expense to account
  Given a user balance is 2400
  When user extracts 300 to the account
  Then balance should be 2100