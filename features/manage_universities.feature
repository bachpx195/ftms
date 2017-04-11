Feature: Universities
  In order to manage Universities.
  As an admintrator.
  I want to manage Universities in the system.

  Background:
    Given system has a user with email is "admin@tms.com", password is "12345678"
      And user has permission manage Universities include show all Universities, create, edit, delete
      And system existed Universities with name is "Vietnam National University Hanoi University of Science and Technology,Foreign Trade Universitysssss"

    When user logged in successfully

    Then user redirect to home screen

  Scenario: Create new university with name is blank
    Given user has a permission to create university
      And input name is ""

    When user click button Save in the new university screen

    Then state of button save is disable and can not click

  Scenario: Create new university with name is valid and include 1 character
    Given user has a permission to create university
      And input name is "A"

    When user click button Save in the new university screen

    Then User should redirect to list Universities screen and name "A" in show Universities screen

  Scenario: Create new university with name is valid and include 255 character
    Given user has a permission to create university
      And input name is "Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technolh"

    When user click button Save in the new university screen

    Then User should redirect to list Universities screen and name "Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technolh" in show Universities screen

  Scenario: Create new university with name is valid and contain special characters
    Given user has a permission to create university
      And input name is "@HaNoUniver#"

    When user click button Save in the new university screen

    Then User should redirect to list Universities screen and name "@New dev#" in show Universities screen

  Scenario: Create new university with name is valid and include 1-255 character
    Given user has a permission to create university
      And input name is "Ha Noi University"

    When user click button Save in the new university screen

    Then User should redirect to list Universities screen and name "Ha Noi University" in show Universities screen

  Scenario: Create new university with name is valid and contain space at both the ends
    Given user has a permission to create university
      And input name is " Hanoi University of Industry "

    When user click button Save in the new university screen

    Then User should redirect to list Universities screen and name "Hanoi University of Industry" in show Universities screen

  Scenario: Create new university with name is valid and contain > 255 charaters
    Given user has a permission to create university
      And input name is "Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technology Hanoi University of Science and Technolgory"

    When user click button Save in the new university screen

    Then User should redirect to list Universities screen message is "university not created"

  Scenario: Check filter when textbox filter is blank
    Given user has a permission to show all Universities
      And system has 3 Universities above
      And input filter is ""

    When input filter blank

    Then have not change in screen

  Scenario: Check filter when has result
    Given user has a permission to show all Universities
      And system has 3 Universities above
      And input filter is "Vietnam National University"

    When input data

    Then Display 1 records contain "Vietnam National University"

  Scenario: Check filter when textbox filter Contain "*" character
    Given user has a permission to show all Universities
      And input filter is "*"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Contain "/" character
    Given user has a permission to show all Universities
      And input filter is "/"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Input "0" character
    Given user has a permission to show all Universities
      And input filter is "0"

    When input data

    Then display message is "No results found."

  Scenario: check paginate when has <10 records
    Given user has a permission to show all Universities
      And system has 3 Universities above

    When Universities screen opened

    Then System display 3 records on form and has dropdown for paginate

  Scenario: check paginate when has 10 records
    Given user has a permission to show all Universities
      And system has 3 Universities above
      And system existed university with name is "Posts and Telecommunications Institute of Technology, Hanoi University of Industry, Water Resources University, Electric Power University, Vietnam University of Commerce, Vietnam Maritime University, University of Communications and Transportation"

    When Universities screen opened

    Then System display 10 Universities on form and has dropdown for paginate

  Scenario: check paginate when has >10 records
    Given user has a permission to show all Universities
      And system has 3 Universities above
      And system existed university with name is "Posts and Telecommunications Institute of Technology, Hanoi University of Industry, Water Resources University, Electric Power University, Vietnam University of Commerce, Vietnam Maritime University, University of Communications and Transportation, Posts and Telecommunications Institute of Technology"

    When Universities screen opened
      And user click button next

    Then System display 1 record in form

  Scenario: Edit a university with name is blank
    Given user has a permission to edit university
      And edit university with nane is "Vietnam National University" to name is ""

    When user click button Save in the edit university screen

    Then state of button save is disable and can not click

  Scenario: Edit a university with name is valid and include 1 character
    Given user has a permission to edit university
      And edit university with name is "Vietnam National University" to name is "A"

    When user click button Save in the edit university screen

    Then User should redirect to list Universities screen and name "A" in show Universities screen

  Scenario: Edit a university with name is valid and include 255 character
    Given user has a permission to edit university
      And edit university with name is "Vietnam Forestry University Vietnam Forestry University Vietnam Forestry UniversityVietnam Forestry UniversityVietnam Forestry University Vietnam Forestry University Vietnam Forestry University Vietnam Forestry University Vietnam Forestry University Viet"

    When user click button Save in the edit university screen

    Then User should redirect to list Universities screen and name " Vietnam Forestry University Vietnam Forestry University Vietnam Forestry UniversityVietnam Forestry UniversityVietnam Forestry University Vietnam Forestry University Vietnam Forestry University Vietnam Forestry University Vietnam Forestry University Viet" in show Universities screen

  Scenario: Edit university with name is valid and include 1-255 character
    Given user has a permission to edit university
      And edit university with name is "Vietnam National University" to name is "Vietnam Forestry University"

    When user click button Save in the edit university screen

    Then User should redirect to list Universities screen and name "Vietnam Forestry University" in show Universities screen

  Scenario: edit university with name is valid and contain special characters
    Given user has a permission to edit university
      And edit university with name is "Vietnam National University" to name is "#ThaiBinh univer@"

    When user click button Save in the edit university screen

    Then User should redirect to list Universities screen and name "#ThaiBinh univer@" in show Universities screen

  Scenario: edit university with name is valid and contain space at both the ends
    Given user has a permission to edit university
      And edit university with name is "Vietnam National University" to name is " JPG "

    When user click button Save in the edit university screen

    Then User should redirect to list Universities screen and name "JPG" in show Universities screen

  Scenario: edit university with name is valid and contain > 255 charaters
    Given user has a permission to edit university
      And edit university with name is "Vietnam National University" to name is "Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh"

    When user click button Save in the edit university screen

    Then should redirect to list Universities screen and message is "university name can not update"

  Scenario: Deleting university
    Given user has a permission to delete university
      And user delete university name is "Vietnam National University"

    When User click to delete symbol in the list Universities screen

    Then should redirect to list Universities screen and university with name is "Vietnam National University" removed
