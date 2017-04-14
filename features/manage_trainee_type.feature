Feature: Trainee type
  In order to manage trainee type.
  As an admintrator.
  I want to manage trainee type.

  Background:
    Given User with email is "admin@tms.com" and password "12345678"
      And User manage trainee type include create, show, update, delete.
      And System existed trainee types with name "Intern, New dev, Join div"

    When User login

    Then I should redirect to Home screen.

  Scenario: Create trainee type when name empty
    Given User can create trainee type
      And Input name ""

    When In the Trainee type screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Create trainee type when name include 1-255 characters
    Given User can create trainee type
      And Input name "Open education"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "Open education" in Trainee types screen

  Scenario: Create trainee type when name include special characters
    Given User can create trainee type
      And Input name "Open #@ education"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "Open #@ education" in Trainee types screen

  Scenario: Create trainee type when name include html, javascript
    Given User can create trainee type
      And Input name "<script>alert('hello')</script>"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "<script>alert('hello')</script>" in Trainee types screen

  Scenario: Create trainee type when name include space
    Given User can create trainee type
      And Input name "Open education"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "Open education" in Trainee types screen

  Scenario: Create trainee type when name more than 255 characters
    Given User can create trainee type
      And Input name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ"

    When In the Trainee type screen. User click button Save.

    Then Display message "Name include 1-255 characters"

  Scenario: Update trainee type when name is blank
    Given User can update trainee type
      And Edit trainee type with name "Intern"
      And Update to trainee type with name ""

    When In the Trainee type screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Update trainee type when name include 1-255 characters
    Given User can update trainee type
      And Edit trainee type with name "Intern"
      And Update to trainee type with name "New intern"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "New intern" in Trainee types screen

  Scenario: Update trainee type when name include special characters
    Given User can update trainee type
      And Edit trainee type with name "Intern"
      And Update to trainee type with name "Intern @#$"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "Intern @#$" in Trainee types screen

  Scenario: Update trainee type when name include html, javascript
    Given User can update trainee type
      And Edit trainee type with name "Intern"
      And Update to trainee type with name "<script>alert('hello')</script>"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "<script>alert('hello')</script>" in Trainee types screen

  Scenario: Update trainee type when name include space
    Given User can update trainee type
      And Edit trainee type with name "Intern"
      And Update to trainee type with name "Open education"

    When In the Trainee type screen. User click button Save.

    Then I should redirect to list Trainee types screen and name "Open education" in Trainee types screen

  Scenario: Update trainee type when name more than 255 characters
    Given User can update trainee type
      And Edit trainee type with name "Rails"
      And Update to trainee type with name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ "

    When In the Trainee type screen. User click button Save.

    Then Display message "Name include 1-255 characters"

  Scenario: Delete trainee type
    Given User can delete trainee type
      And User want to delete trainee type with name "Intern"

    When In the list Trainee type screen. User click to delete symbol.

    Then I should redirect to list Trainee types screen and name "Intern" removed

  Scenario: Check filter when filter empty
    Given User can show trainee type
      And Input filter ""

    When In the list Trainee type screen, user insert data

    Then Display no record

  Scenario: Check filter when has result
    Given User can show trainee type
      And Input filter "Intern"

    When In the list trainee type screen, user insert data

    Then Display all records with data name contain "Intern"

  Scenario: Check filter when data is *
    Given User can show trainee type
      And Input filter "*"

    When In the list trainee type screen, user insert data

    Then Display all records with data name contain "*"

  Scenario: Check filter when data is /
    Given User can show trainee type
      And Input filter "/"

    When In the list trainee type screen, user insert data

    Then Display all records with data name contain "/"

  Scenario: Check filter when data is _
    Given User can show trainee type
      And Input filter "_"

    When In the list trainee type screen, user insert data

    Then Display all records with data name contain "_"

  Scenario: Check filter when data is 0
    Given User can show trainee type
      And Input filter "0"

    When In the list trainee type screen, user insert data

    Then Display all records with data name contain "0"

  Scenario: Check paginate when data <10 records
    Given User can show all trainee types
      And System has 3 trainee types above

    When User open trainee type screen

    Then Display all records in the a page


  Scenario: Check paginate when data have 10 records
    Given User can show all trainee types
      And system has 3 trainee types above
      And System existed trainee types with name "Intern 2, Open education 1, Open education 2, Practice, BO, HR, PA"

    When User open trainee types screen

    Then Display all records in the a page

  Scenario: Check paginate when data >10 records
    Given User can show all trainee types
      And system has 3 trainee types above
      And System existed trainee types with name "Intern 2, Open education 1, Open education 2, Practice, BO, HR, PA, Trainer"

    When User open trainee type screen
      And User click button Next

    Then The first page include 10 records
      And the second page include 1 record
