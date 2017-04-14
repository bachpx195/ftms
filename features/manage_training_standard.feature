Feature: Training standards
  In order to manage Training standards.
  As an admintrator.
  I want to manage Training standards in the system.

  Background:
    Given User with email is "admin@tms.com" and password "12345678"
      And User manage Training standards include create, show, update, delete.
      And System existed training standards with name "Open education 1, Open education 2, Open education 3"

    When User login successfully

    Then I should redirect to Home screen.

  Scenario: Create training standard with all fields valid
    Given User can create training standard
      And Input name "Open education" and description "Description"

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open education" in show Training standards screen

  Scenario: Create training standard with all fields empty
    Given User can create training standard
      And Input name "" and description ""

    When In the Training standard screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Create training standard with name is blank
    Given User can create training standard
      And Input name "" and other items valid

    When In the Training standard screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Create training standard with name include 1 character
    Given User can create training standard
      And Input name "A" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "A" in show Training standards screen

  Scenario: Create training standard with name include 1-255 characters
    Given User can create training standard
      And Input name "Open education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open education" in show Training standards screen

  Scenario: Create training standard with name include 255 characters
    Given User can create training standard
      And Input name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích ch" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích ch" in show Training standards screen

  Scenario: Create training standard with name include special characters
    Given User can create training standard
      And Input name "Open #@ education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open #@ education" in show Training standards screen

  Scenario: Create training standard with name include html, javascript
    Given User can create training standard
      And Input name "<script>alert('hello')</script>" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "<script>alert('hello')</script>" in show Training standards screen

  Scenario: Create training standard with name include space
    Given User can create training standard
      And Input name "Open education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open education" in show Training standards screen

  Scenario: Create training standard with name more than 255 characters
    Given User can create training standard
      And Input name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ" and other items valid

    When In the Training standard screen. User click button Save.

    Then Display message "Name include 1-255 characters"

  Scenario: Create training standard with description is blank
    Given User can create training standard
      And Input description "" and other items valid

    When In the Training standard screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Create training standard with description >0 characters
    Given User can create training standard
      And Input description "Open education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open education" in show Training standards screen

  Scenario: Create training standard with description include special characters
    Given User can create training standard
      And Input description "Open #@ education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open #@ education" in show Training standards screen

  Scenario: Create training standard with description include html, javascript
    Given User can create training standard
      And Input description "<script>alert('hello')</script>" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "<script>alert('hello')</script>" in show Training standards screen

  Scenario: Create training standard with description include space
    Given User can create training standard
      And Input description "Open education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open education" in show Training standards screen

  Scenario: Update training standard with all fields valid
    Given User can update training standard
      And Edit training standard with name "Open education" and description "Description"
      And Update to training standard with name "Open education 1" and description "Description 1"

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open education" in show Training standards screen

  Scenario: Update training standard with all fields empty
    Given User can update training standard
      And Edit training standard with name "Open education" and description "Description"
      And Update to training standard with name "" and description ""

    When In the Training standard screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Update training standard with name is blank
    Given User can update training standard
      And Edit training standard with name "Open education"
      And Update to training standard with name "" and other items vailid

    When In the Training standard screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Update training standard with name include 1 character
    Given User can update trainng standard
      And Edit training standard with name "Open education"
      And Update to training standard with name "A" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "A" in show Training standards screen

  Scenario: Update training standard with name include 1-255 characters
    Given User can update trainng standard
      And Edit training standard with name "Open education"
      And Update to training standard with name "Open education 1" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open education 1" in show Training standards screen

  Scenario: Update training standard with name include 255 characters
    Given User can update trainng standard
      And Edit training standard with name "Open education"
      And Update to training standard with name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích ch" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích ch" in show Training standards screen

  Scenario: Update training standard with name include special characters
    Given User can update training standard
      And Edit training standard with name "Open education"
      And Update to training standard with name "Open#$% education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "Open#$% education" in show Training standards screen

  Scenario: Update training standard with name include html, javascript
    Given User can update training standard
      And Edit training standard with name "Open education"
      And Update to training standard with name "<script>alert('hello')</script>" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and name "<script>alert('hello')</script>" in show Training standards screen

  Scenario: Update training standard with name include space
    Given User can update training standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "Open education 3" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open education 3" in show Training standards screen

  Scenario: Update training standard with name more than 255 characters
    Given User can update training standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open education 3" in show Training standards screen

  Scenario: Update training standard with description is blank
    Given User can update training standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "" and other items vailid

    When In the Training standard screen. User click button Save.

    Then Button Save disable and can not click

  Scenario: Update training standard with description >0 characters
    Given User can update trainng standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "Open education 1" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open education 1" in show Training standards screen

  Scenario: Update training standard with description include special characters
    Given User can update training standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "Open#$% education" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open#$% education" in show Training standards screen

  Scenario: Update training standard with description include html, javascript
    Given User can update training standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "<script>alert('hello')</script>" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "<script>alert('hello')</script>" in show Training standards screen

  Scenario: Update training standard with description include space
    Given User can update training standard
      And Edit training standard with description "Open education"
      And Update to training standard with description "Open education 3" and other items valid

    When In the Training standard screen. User click button Save.

    Then I should redirect to list Training standards screen and description "Open education 3" in show Training standards screen

  Scenario: Delete training standard
    Given User can delete training standard
      And User want to delete training standard with name "Open education"

    When In the list Training standards screen. User click to button Delete

    Then I should redirect to list Training standards screen and name "Open education" removed

  Scenario: Check filter with filter empty
    Given User can show training standard
      And Input filter ""

    When In the list Training standard screen, user insert data

    Then Display no record

  Scenario: Check filter with has result
    Given User can show training standard
      And Input filter "Open education"

    When In the list training standard screen, user insert data

    Then Display all records with data contain "Open education"

  Scenario: Check filter with data is *
    Given User can show training standard
      And Input filter "*"

    When In the list training standard screen, user insert data

    Then Display all records with data contain "*"

  Scenario: Check filter with data is /
    Given User can show training standard
      And Input filter "/"

    When In the list training standard screen, user insert data

    Then Display all records with data contain "/"

  Scenario: Check filter with data is _
    Given User can show training standard
      And Input filter "_"

    When In the list training standard screen, user insert data

    Then Display all records with data contain "_"

  Scenario: Check filter with data is 0
    Given User can show training standard
      And Input filter "0"

    When In the list training standard screen, user insert data

    Then Display all records with data contain "0"

  Scenario: Check paginate when data <10 records
    Given User can show all training standards
      And System has 3 training standards above

    When User open training standard screen

    Then Display all records in the a page


  Scenario: Check paginate when data have 10 records
    Given User can show all training standards
      And system has 3 training standards above
      And system existed training standards with name is "Intern 2, Open education 1, Open education 2, Practice, BO, HR, PA"

    When User open training standard screen

    Then Display all records in the a page

  Scenario: Check paginate when data >10 records
    Given User can show all training standards
      And system has 3 training standards above
      And system existed training standards with name is "Intern 2, Open education 1, Open education 2, Practice, BO, HR, PA, Trainer"

    When User open training standard screen
      And User click button Next

    Then The first page include 10 records
      And the second page include 1 record
