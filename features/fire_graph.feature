Feature: generate income, expenses and gap graph to fire

@todo
Scenario: positive gap graph
  Given the account data described below
    | month     | income | expense |
    | January   | 1000   | 800     |
    | February  | 1000   | 950     |
    | March     | 1000   | 925     |
    | April     | 1000   | 975     |
    | May       | 1000   | 750     |
    | June      | 1000   | 950     |
    | July      | 1000   | 1050    |
    | August    | 1000   | 1100    |
    | September | 1000   | 865     |
    | October   | 1000   | 870     |
    | November  | 1000   | 935     |
    | December  | 2200   | 1600    |

  When graph is generated
  Then I can see the expected FIRE magic number
  And the required time to achieve it
  And average income and average expenses