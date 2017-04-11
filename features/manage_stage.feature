Feature: Stages
  In order to manage stages.
  As an admintrator.
  I want to manage stages in the system.

  Background:
    Given system has a user with email is "admin@tms.com", password is "12345678"
      And user has permission manage Stages include show all stages, create, edit, delete
      And system existed stages with name is "Intern, New Intern, Old Intern"

    When user logged in successfully

    Then user redirect to home screen

  Scenario: Create new stage with name is blank
    Given user has a permission to create stage
      And input name is ""

    When user click button Save in the new stage screen

    Then state of button save is disable and can not click

  Scenario: Create new stage with name is valid and include 1 character
    Given user has a permission to create stage
      And input name is "A"

    When user click button Save in the new stage screen

    Then User should redirect to list Stages screen and name "A" in show Stages screen

  Scenario: Create new stage with name is valid and include 255 character
    Given user has a permission to create stage
      And input name is "inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter int"

    When user click button Save in the new stage screen

    Then User should redirect to list Stages screen and name "inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter int" in show Stages screen

  Scenario: Create new stage with name is valid and contain special characters
    Given user has a permission to create stage
      And input name is "@New dev#"

    When user click button Save in the new stage screen

    Then User should redirect to list Stages screen and name "@New dev#" in show Stages screen

  Scenario: Create new stage with name is valid and include 1-255 character
    Given user has a permission to create stage
      And input name is "VPG"

    When user click button Save in the new stage screen

    Then User should redirect to list Stages screen and name "VPG" in show Stages screen

  Scenario: Create new stage with name is valid and contain space at both the ends
    Given user has a permission to create stage
      And input name is " JPG "

    When user click button Save in the new stage screen

    Then User should redirect to list Stages screen and name "JPG" in show Stages screen

  Scenario: Create new stage with name is valid and contain > 255 charaters
    Given user has a permission to create stage
      And input name is "Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh"

    When user click button Save in the new stage screen

    Then User should redirect to list Stages screen message is "Stage name not created"

  Scenario: Check filter when textbox filter is blank
    Given user has a permission to show all stages
      And system has 3 stages above
      And input filter is ""

    When input filter blank

    Then have not change in screen

  Scenario: Check filter when has result
    Given user has a permission to show all stages
      And system has 3 stages above
      And input filter is "Intern"

    When input data

    Then Display 3 records contain "Intern"

  Scenario: Check filter when textbox filter Contain "*" character
    Given user has a permission to show all stages
      And input filter is "*"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Contain "/" character
    Given user has a permission to show all stages
      And input filter is "/"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Input "0" character
    Given user has a permission to show all stages
      And input filter is "0"

    When input data

    Then display message is "No results found."

  Scenario: check paginate when has <10 records
    Given user has a permission to show all stages
      And system has 3 stages above

    When Stages screen opened

    Then System display 3 records on form and has dropdown for paginate

  Scenario: check paginate when has 10 records
    Given user has a permission to show all stages
      And system has 3 stages above
      And system existed stage with name is "new dev, JPG, QA, BrSE, NT, new dev, old dev"

    When Stages screen opened

    Then System display 10 stages on form and has dropdown for paginate

  Scenario: check paginate when has >10 records
    Given user has a permission to show all stages
      And system has 3 stages above
      And system existed stage with name is "new dev, JPG, QA, BrSE, NT, new dev, old dev, new QA"

    When Stages screen opened
      And user click button next

    Then System display 1 record in form

  Scenario: Edit a stage with name is blank
    Given user has a permission to edit stage
      And edit stage with nane is "Intern" to name is ""

    When user click button Save in the edit stage screen

    Then state of button save is disable and can not click

  Scenario: Edit a stage with name is valid and include 1 character
    Given user has a permission to edit stage
      And edit stage with name is "Intern" to name is "A"

    When user click button Save in the edit stage screen

    Then User should redirect to list Stages screen and name "A" in show Stages screen

  Scenario: Edit a stage with name is valid and include 255 character
    Given user has a permission to edit stage
      And edit stage with name is "Intern" to name is "inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter int"

    When user click button Save in the edit stage screen

    Then User should redirect to list Stages screen and name "inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter inter int" in show Stages screen

  Scenario: Edit stage with name is valid and include 1-255 character
    Given user has a permission to edit stage
      And edit stage with name is "Intern" to name is "VPG"

    When user click button Save in the edit stage screen

    Then User should redirect to list Stages screen and name "VPG" in show Stages screen

  Scenario: edit stage with name is valid and contain special characters
    Given user has a permission to edit stage
      And edit stage with name is "Intern" to name is "@New dev#"

    When user click button Save in the edit stage screen

    Then User should redirect to list Stages screen and name "@New dev#" in show Stages screen

  Scenario: edit stage with name is valid and contain space at both the ends
    Given user has a permission to edit stage
      And edit stage with name is "Intern" to name is " JPG "

    When user click button Save in the edit stage screen

    Then User should redirect to list Stages screen and name "JPG" in show Stages screen

  Scenario: edit stage with name is valid and contain > 255 charaters
    Given user has a permission to edit stage
      And edit stage with name is "Intern" to name is "Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh"

    When user click button Save in the edit stage screen

    Then should redirect to list Stages screen and message is "stage name can not update"

  Scenario: Deleting Stage
    Given user has a permission to delete stage
      And user delete Stage name is "New dev"

    When User click to delete symbol in the list Stages screen

    Then should redirect to list Stages screen and stage with name is "New dev" removed
